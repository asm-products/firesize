package main

import (
	"bufio"
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

type GMagick struct{}

// Process a remote asset url using graphicsmagick with the args supplied
// and write the response to w
func (p *GMagick) Process(w io.Writer, assetUrl string, args ...string) (err error) {
	executable := "gm"

	tempDir, err := ioutil.TempDir("", "_firesize")
	if err != nil {
		return
	}
	defer os.RemoveAll(tempDir)
	inFile := filepath.Join(tempDir, "in")
	outFile := filepath.Join(tempDir, "out")

	grohl.Log(grohl.Data{
		"processor": "gmagick",
		"download":  assetUrl,
		"local":     inFile,
	})

	if err = downloadRemote(assetUrl, inFile); err != nil {
		return
	}

	args = append(args, inFile, outFile)
	args = append([]string{"convert"}, args...)

	grohl.Log(grohl.Data{
		"processor": "gmagick",
		"args":      args,
	})

	cmd := exec.Command(executable, args...)
	err = runWithTimeout(cmd, 60*time.Second)
	if err != nil {
		grohl.Log(grohl.Data{
			"processor": "gmagick",
			"failure":   err,
			"args":      args,
		})
	}

	f, err := os.Open(outFile)
	if err != nil {
		panic(err)
	}
	defer func() {
		if err := f.Close(); err != nil {
			panic(err)
		}
	}()

	_, err = io.Copy(w, bufio.NewReader(f))
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

func runWithTimeout(cmd *exec.Cmd, timeout time.Duration) error {
	err := cmd.Start()
	if err != nil {
		return err
	}

	cmdChan := make(chan error)
	go func() {
		cmdChan <- cmd.Wait()
	}()

	timeoutChan := time.After(timeout)

	select {
	case err = <-cmdChan:
		if err != nil {
			return err
		}

		return nil
	case <-timeoutChan:
		err = cmd.Process.Kill()
		if err != nil {
			return err
		}

		<-cmdChan

		return fmt.Errorf("command timeout after %s: %+v", timeout, cmd)
	}
}
