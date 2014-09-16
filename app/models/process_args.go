package models

import "regexp"

type ProcessArgs struct {
	Height  string
	Width   string
	Format  string
	Gravity string
	Frame   string
	Url     string
}

func NewProcessArgs(urlArgs []string, url string) *ProcessArgs {
	args := &ProcessArgs{}
	for _, arg := range urlArgs {
		args.setUrlArg(arg)
	}
	args.Url = url
	return args
}

var dimensionsRgx = regexp.MustCompile(`^(\d+)?x(\d+)?$`)
var gravityRgx = regexp.MustCompile(`^g_([a-z]+)$`)
var frameRgx = regexp.MustCompile(`^frame_(\d+)$`)
var formatRgx = regexp.MustCompile(`^(png|jpg|jpeg|gif)$`)

func (p *ProcessArgs) setUrlArg(arg string) bool {
	switch {
	case dimensionsRgx.MatchString(arg):
		dimensions := dimensionsRgx.FindStringSubmatch(arg)
		p.Width = dimensions[1]
		p.Height = dimensions[2]
		return true

	case gravityRgx.MatchString(arg):
		gravity := gravityRgx.FindStringSubmatch(arg)
		p.Gravity = gravity[1]
		return true

	case frameRgx.MatchString(arg):
		frame := frameRgx.FindStringSubmatch(arg)
		p.Frame = frame[1]
		return true

	case formatRgx.MatchString(arg):
		format := formatRgx.FindStringSubmatch(arg)
		p.Format = format[1]
		return true
	}
	return false
}

func (p *ProcessArgs) CommandArgs(inFile, outFile string) (args []string, outFileWithFormat string) {
	args = make([]string, 0)

	fillArg := ">"
	if p.Gravity != "" {
		args = append(args, "-gravity", p.Gravity)
		fillArg = "^"
	}

	if p.Width != "" && p.Height != "" {
		args = append(args, "-thumbnail", p.Width+"x"+p.Height+fillArg)
		args = append(args, "-crop", p.Width+"x"+p.Height+"+0+0")
	} else if p.Width != "" {
		args = append(args, "-thumbnail", p.Width+"x")
	} else if p.Height != "" {
		args = append(args, "-thumbnail", "x"+p.Height)
	}

	if p.Format == "" {
		p.Format = "png"
		if p.Frame != "" {
			p.Format = "gif"
		}
	}
	args = append(args, "-format", p.Format)
	args = append(args, "+repage")

	outFileWithFormat = outFile + "." + p.Format

	if p.Frame != "" {
		args = append(args, inFile+"["+p.Frame+"]", outFileWithFormat)
	} else {
		args = append(args, inFile, outFileWithFormat)
	}
	return args, outFileWithFormat
}
