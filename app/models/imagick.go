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

	outFile, err := processImage(tempDir, inFile, args)
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

func processImage(tempDir string, inFile string, args *ProcessArgs) (string, error) {
	outFile := filepath.Join(tempDir, "out")
	cmdArgs, outFileWithFormat := args.CommandArgs(inFile, outFile)

	grohl.Log(grohl.Data{
		"processor": "imagick",
		"args":      cmdArgs,
	})

	executable := "convert"
	cmd := exec.Command(executable, cmdArgs...)
	outErr, err := runWithTimeout(cmd, 60*time.Second)
	if err != nil {
		grohl.Log(grohl.Data{
			"processor": "imagick",
			"failure":   err,
			"args":      cmdArgs,
			"output":    string(outErr),
		})
	}

	return outFileWithFormat, err
}

func runWithTimeout(cmd *exec.Cmd, timeout time.Duration) ([]byte, error) {
	// Capture the output
	var b bytes.Buffer
	cmd.Stdout, cmd.Stderr = &b, &b

	// Start the process
	err := cmd.Start()
	if err != nil {
		return nil, err
	}

	// Kill the process if it doesn't exit in time
	defer time.AfterFunc(timeout, func() {
		fmt.Println("command timed out")
		cmd.Process.Kill()
	}).Stop()

	// Wait for the process to finish
	if err := cmd.Wait(); err != nil {
		return b.Bytes(), err
	}

	return b.Bytes(), nil
}
