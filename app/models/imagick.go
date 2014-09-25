package models

import (
	"bytes"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"time"

	"github.com/technoweenie/grohl"
)

type IMagick struct{}

// Process a remote asset url using graphicsmagick with the args supplied
// and write the response to w
func (p *IMagick) Process(w http.ResponseWriter, r *http.Request, args *ProcessArgs) (err error) {
	tempDir, err := createTemporaryWorkspace()
	if err != nil {
		return
	}
	// defer os.RemoveAll(tempDir)

	inFile, err := downloadRemote(tempDir, args.Url)
	if err != nil {
		return
	}

	preProcessedInFile, err := preProcessImage(tempDir, inFile)
	if err != nil {
		return
	}

	outFile, err := processImage(tempDir, preProcessedInFile, args)
	if err != nil {
		return
	}

	// serve response
	http.ServeFile(w, r, outFile)
	return
}

func createTemporaryWorkspace() (string, error) {
	return ioutil.TempDir("", "_firesize")
}

func downloadRemote(tempDir string, url string) (string, error) {
	inFile := filepath.Join(tempDir, "in")

	grohl.Log(grohl.Data{
		"processor": "imagick",
		"download":  url,
		"local":     inFile,
	})

	out, err := os.Create(inFile)
	if err != nil {
		return inFile, err
	}
	defer out.Close()

	resp, err := http.Get(url)
	if err != nil {
		return inFile, err
	}
	defer resp.Body.Close()

	_, err = io.Copy(out, resp.Body)

	return inFile, err
}

func preProcessImage(tempDir string, inFile string) (string, error) {
	if isAnimatedGif(inFile) {
		// if animated gif coalesce
		// else return
		return inFile, nil
	} else {
		return inFile, nil
	}
}

func processImage(tempDir string, inFile string, args *ProcessArgs) (string, error) {
	outFile := filepath.Join(tempDir, "out")
	cmdArgs, outFileWithFormat := args.CommandArgs(inFile, outFile)

	grohl.Log(grohl.Data{
		"processor": "imagick",
		"args":      cmdArgs,
	})

	executable := "convert"
	cmd := exec.Command(executable, cmdArgs...)
	var outErr bytes.Buffer
	cmd.Stdout, cmd.Stderr = &outErr, &outErr
	err := runWithTimeout(cmd, 60*time.Second)
	if err != nil {
		grohl.Log(grohl.Data{
			"processor": "imagick",
			"failure":   err,
			"args":      cmdArgs,
			"output":    string(outErr.Bytes()),
		})
	}

	return outFileWithFormat, err
}

func isAnimatedGif(inFile string) bool {
	// identify the image
	// identify -format %n updates-product-click.gif # => 105
	return false
}

func runWithTimeout(cmd *exec.Cmd, timeout time.Duration) error {
	// Start the process
	err := cmd.Start()
	if err != nil {
		return err
	}

	// Kill the process if it doesn't exit in time
	defer time.AfterFunc(timeout, func() {
		fmt.Println("command timed out")
		cmd.Process.Kill()
	}).Stop()

	// Wait for the process to finish
	return cmd.Wait()
}
