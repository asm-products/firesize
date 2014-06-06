package tests

import (
	"strings"

	"github.com/asm-products/firesize/app/models"
	"github.com/revel/revel"
)

type ProcessArgsTest struct {
	revel.TestSuite
}

func (t *ProcessArgsTest) TestThatProcessArgsGetsWidth() {
	url := "128x/http://placekitten.com/g/32/32"
	args := models.NewProcessArgs(strings.Split(url, "/"))
	t.AssertEqual(&models.ProcessArgs{
		Width: "128",
		Url:   "http://placekitten.com/g/32/32",
	}, args)
}

func (t *ProcessArgsTest) TestThatProcessArgsGetsHeight() {
	url := "x64/http://placekitten.com/g/32/32"
	args := models.NewProcessArgs(strings.Split(url, "/"))
	t.AssertEqual(&models.ProcessArgs{
		Height: "64",
		Url:    "http://placekitten.com/g/32/32",
	}, args)
}

func (t *ProcessArgsTest) TestThatProcessArgsGetsWidthAndHeight() {
	url := "128x64/http://placekitten.com/g/32/32"
	args := models.NewProcessArgs(strings.Split(url, "/"))
	t.AssertEqual(&models.ProcessArgs{
		Width:  "128",
		Height: "64",
		Url:    "http://placekitten.com/g/32/32",
	}, args)
}

func (t *ProcessArgsTest) TestThatProcessArgsGetsTheRest() {
	url := "128x64/g_center/frame_0/png/http://placekitten.com/g/32/32"
	args := models.NewProcessArgs(strings.Split(url, "/"))
	t.AssertEqual(&models.ProcessArgs{
		Width:   "128",
		Height:  "64",
		Gravity: "center",
		Frame:   "0",
		Format:  "png",
		Url:     "http://placekitten.com/g/32/32",
	}, args)
}

func (t *ProcessArgsTest) TestConvertsStructIntoCommandLineArgs() {
	args := &models.ProcessArgs{
		Width:   "128",
		Height:  "64",
		Gravity: "north",
		Frame:   "0",
		Format:  "png",
	}

	cmdArgs, _ := args.CommandArgs("in.psd", "out")

	t.AssertEqual([]string{
		"-gravity", "north",
		"-thumbnail", "128x64^",
		"-crop", "128x64+0+0",
		"-format", "png",
		"+repage",
		"in.psd[0]",
		"out.png",
	}, cmdArgs)
}

func (t *ProcessArgsTest) TestOnlyShrinksIfGravityOmitted() {
	args := &models.ProcessArgs{
		Width:  "128",
		Height: "64",
	}

	cmdArgs, _ := args.CommandArgs("in.gif", "out")

	t.AssertEqual([]string{
		"-thumbnail", "128x64>",
		"-crop", "128x64+0+0",
		"-format", "png",
		"+repage",
		"in.gif",
		"out.png",
	}, cmdArgs)
}

func (t *ProcessArgsTest) TestSpecifyJustHeight() {
	args := &models.ProcessArgs{
		Height: "64",
	}
	cmdArgs, _ := args.CommandArgs("in.gif", "out")
	t.AssertEqual([]string{
		"-thumbnail", "x64",
		"-format", "png",
		"+repage",
		"in.gif",
		"out.png",
	}, cmdArgs)
}

func (t *ProcessArgsTest) TestSpecifyJustWidth() {
	args := &models.ProcessArgs{
		Width: "128",
	}
	cmdArgs, _ := args.CommandArgs("in.psd", "out")
	t.AssertEqual([]string{
		"-thumbnail", "128x",
		"-format", "png",
		"+repage",
		"in.psd",
		"out.png",
	}, cmdArgs)
}
