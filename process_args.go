package main

import "strconv"

type ProcessArgs struct {
	Height  string `json:"height"`
	Width   string `json:"width"`
	Format  string `json:"format"`
	Gravity string `json:"gravity"`
	Frame   *int   `json:"frame"`
}

func (p *ProcessArgs) CommandArgs(inFile, outFile string) (args []string, outFileWithFormat string) {
	args = make([]string, 0)
	if p.Width != "" && p.Height != "" {
		args = append(args, "-thumbnail", p.Width+"x"+p.Height+"^")
		args = append(args, "-extent", p.Width+"x"+p.Height)
	} else if p.Width != "" {
		args = append(args, "-thumbnail", p.Width+"x")
	} else if p.Height != "" {
		args = append(args, "-thumbnail", "x"+p.Height)
	}

	if p.Gravity != "" {
		args = append(args, "-gravity", p.Gravity)
	}

	if p.Format == "" {
		p.Format = "gif"
	}
	args = append(args, "-format", p.Format)

	outFileWithFormat = outFile + "." + p.Format

	if p.Frame != nil {
		args = append(args, inFile+"["+strconv.Itoa(*p.Frame)+"]", outFileWithFormat)
	} else {
		args = append(args, inFile, outFileWithFormat)
	}
	return args, outFileWithFormat
}
