package main

import (
	"net/http"
	"strings"

	"github.com/technoweenie/grohl"
)

func serveImage(w http.ResponseWriter, r *http.Request) {
	splits := strings.Split(r.URL.String(), "/")

	processArgs := NewProcessArgs(splits[1:])

	processor := &IMagick{}

	w.Header().Set("Cache-Control", "public, max-age=864000")
	err := processor.Process(w, r, processArgs)
	if err != nil {
		grohl.Log(grohl.Data{
			"error": err.Error(),
			"parts": splits,
		})
		http.Error(w, "processing failed", 500)
		return
	}

	grohl.Log(grohl.Data{
		"action":  "process",
		"args":    processArgs,
		"headers": r.Header,
	})
}
