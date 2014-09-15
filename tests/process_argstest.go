package tests

import (
	"strings"
	"testing"

	"github.com/asm-products/firesize/app/models"
	"github.com/bmizerany/assert"
)

func TestThatProcessArgsGetsWidth(t *testing.T) {
	url := "128x/http://placekitten.com/g/32/32"
	args := models.NewProcessArgs(strings.Split(url, "/"))
	assert.Equal(t, &models.ProcessArgs{
		Width: "128",
		Url:   "http://placekitten.com/g/32/32",
	}, args)
}

func TestThatProcessArgsGetsHeight(t *testing.T) {
	url := "x64/http://placekitten.com/g/32/32"
	args := models.NewProcessArgs(strings.Split(url, "/"))
	assert.Equal(t, &models.ProcessArgs{
		Height: "64",
		Url:    "http://placekitten.com/g/32/32",
	}, args)
}

func TestThatProcessArgsGetsWidthAndHeight(t *testing.T) {
	url := "128x64/http://placekitten.com/g/32/32"
	args := models.NewProcessArgs(strings.Split(url, "/"))
	assert.Equal(t, &models.ProcessArgs{
		Width:  "128",
		Height: "64",
		Url:    "http://placekitten.com/g/32/32",
	}, args)
}

func TestThatProcessArgsGetsTheRest(t *testing.T) {
	url := "128x64/g_center/frame_0/png/http://placekitten.com/g/32/32"
	args := models.NewProcessArgs(strings.Split(url, "/"))
	assert.Equal(t, &models.ProcessArgs{
		Width:   "128",
		Height:  "64",
		Gravity: "center",
		Frame:   "0",
		Format:  "png",
		Url:     "http://placekitten.com/g/32/32",
	}, args)
}

func TestConvertsStructIntoCommandLineArgs(t *testing.T) {
	args := &models.ProcessArgs{
		Width:   "128",
		Height:  "64",
		Gravity: "north",
		Frame:   "0",
		Format:  "png",
	}

	cmdArgs, _ := args.CommandArgs("in.psd", "out")

	assert.Equal(t, []string{
		"-gravity", "north",
		"-thumbnail", "128x64^",
		"-crop", "128x64+0+0",
		"-format", "png",
		"+repage",
		"in.psd[0]",
		"out.png",
	}, cmdArgs)
}

func TestOnlyShrinksIfGravityOmitted(t *testing.T) {
	args := &models.ProcessArgs{
		Width:  "128",
		Height: "64",
	}

	cmdArgs, _ := args.CommandArgs("in.gif", "out")

	assert.Equal(t, []string{
		"-thumbnail", "128x64>",
		"-crop", "128x64+0+0",
		"-format", "png",
		"+repage",
		"in.gif",
		"out.png",
	}, cmdArgs)
}

func TestSpecifyJustHeight(t *testing.T) {
	args := &models.ProcessArgs{
		Height: "64",
	}
	cmdArgs, _ := args.CommandArgs("in.gif", "out")
	assert.Equal(t, []string{
		"-thumbnail", "x64",
		"-format", "png",
		"+repage",
		"in.gif",
		"out.png",
	}, cmdArgs)
}

func TestSpecifyJustWidth(t *testing.T) {
	args := &models.ProcessArgs{
		Width: "128",
	}
	cmdArgs, _ := args.CommandArgs("in.psd", "out")
	assert.Equal(t, []string{
		"-thumbnail", "128x",
		"-format", "png",
		"+repage",
		"in.psd",
		"out.png",
	}, cmdArgs)
}
