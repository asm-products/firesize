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
	// setup tmp workspace
	tempDir, err := ioutil.TempDir("", "_firesize")
	if err != nil {
		return
	}
	// defer os.RemoveAll(tempDir)

	// download original to inFile
	inFile := filepath.Join(tempDir, "in")

	grohl.Log(grohl.Data{
		"processor": "imagick",
		"download":  args.Url,
		"local":     inFile,
	})

	if err = downloadRemote(args.Url, inFile); err != nil {
		return
	}

	// create resized outFile from inFile
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

	// serve response
	http.ServeFile(w, r, outFileWithFormat)
	return
}

func downloadRemote(url string, localFile string) (err error) {
	out, err := os.Create(localFile)
	if err != nil {
		return
	}
	defer out.Close()

	resp, err := http.Get(url)
	if err != nil {
		return
	}
	defer resp.Body.Close()

	_, err = io.Copy(out, resp.Body)
	return
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
