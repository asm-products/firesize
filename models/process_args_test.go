package models

import (
	"testing"

	"github.com/bmizerany/assert"
)

var imgUrl = "http://placekitten.com/g/32/32"

func Test_ProcessArgsGetsWidth(t *testing.T) {
	args := NewProcessArgs([]string{"128x"}, imgUrl)
	assert.Equal(t, &ProcessArgs{
		Width: "128",
		Url:   "http://placekitten.com/g/32/32",
	}, args)
}

func Test_ProcessArgsGetsHeight(t *testing.T) {
	args := NewProcessArgs([]string{"x64"}, imgUrl)
	assert.Equal(t, &ProcessArgs{
		Height: "64",
		Url:    "http://placekitten.com/g/32/32",
	}, args)
}

func Test_ProcessArgsGetsWidthAndHeight(t *testing.T) {
	args := NewProcessArgs([]string{"128x64!"}, imgUrl)
	assert.Equal(t, &ProcessArgs{
		Width:     "128",
		Height:    "64",
		ResizeMod: "!",
		Url:       "http://placekitten.com/g/32/32",
	}, args)
}

func Test_ProcessArgsGetsTheRest(t *testing.T) {
	args := NewProcessArgs([]string{"128x64", "g_center", "frame_0", "png"}, imgUrl)
	assert.Equal(t, &ProcessArgs{
		Width:   "128",
		Height:  "64",
		Gravity: "center",
		Frame:   "0",
		Format:  "png",
		Url:     "http://placekitten.com/g/32/32",
	}, args)
}

func TestConvertsStructIntoCommandLineArgs(t *testing.T) {
	args := &ProcessArgs{
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
		"-auto-orient",
		"in.psd[0]",
		"out.png",
	}, cmdArgs)
}

func TestOnlyShrinksIfGravityOmitted(t *testing.T) {
	args := &ProcessArgs{
		Width:  "128",
		Height: "64",
	}

	cmdArgs, _ := args.CommandArgs("in.gif", "out")

	assert.Equal(t, []string{
		"-thumbnail", "128x64>",
		"-crop", "128x64+0+0",
		"-format", "png",
		"+repage",
		"-auto-orient",
		"in.gif",
		"out.png",
	}, cmdArgs)
}

func TestSpecifyJustHeight(t *testing.T) {
	args := &ProcessArgs{
		Height: "64",
	}
	cmdArgs, _ := args.CommandArgs("in.gif", "out")
	assert.Equal(t, []string{
		"-thumbnail", "x64",
		"-format", "png",
		"+repage",
		"-auto-orient",
		"in.gif",
		"out.png",
	}, cmdArgs)
}

func TestSpecifyJustWidth(t *testing.T) {
	args := &ProcessArgs{
		Width: "128",
	}
	cmdArgs, _ := args.CommandArgs("in.psd", "out")
	assert.Equal(t, []string{
		"-thumbnail", "128x",
		"-format", "png",
		"+repage",
		"-auto-orient",
		"in.psd",
		"out.png",
	}, cmdArgs)
}

func TestHasNoOperationsWithJustUrl(t *testing.T) {
	args := &ProcessArgs{
		Url: "http://someth.ing",
	}
	assert.T(t, !args.HasOperations())
}

func TestHasOperationsWithAnythingThatIsNotUrl(t *testing.T) {
	args := &ProcessArgs{Height: "1"}
	assert.T(t, args.HasOperations())

	args = &ProcessArgs{Width: "1"}
	assert.T(t, args.HasOperations())

	args = &ProcessArgs{Format: "1"}
	assert.T(t, args.HasOperations())

	args = &ProcessArgs{Gravity: "1"}
	assert.T(t, args.HasOperations())

	args = &ProcessArgs{Frame: "1"}
	assert.T(t, args.HasOperations())
}
