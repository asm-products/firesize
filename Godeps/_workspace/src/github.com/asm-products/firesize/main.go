package main

import (
	"encoding/base64"
	"encoding/json"
	"net/http"
	"os"
	"strings"

	"github.com/technoweenie/grohl"
)

type ImageServer struct {
}

func (i *ImageServer) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if r.URL.String() == "/jquery.firesize.js" {
		http.ServeFile(w, r, "./public/jquery.firesize.js")
	} else {
		serveImage(w, r)
	}
}

func serveImage(w http.ResponseWriter, r *http.Request) {
	splits := strings.SplitN(r.URL.String(), "/", 3)

	argsJson, err := base64.StdEncoding.DecodeString(splits[1])
	if err != nil {
		grohl.Log(grohl.Data{
			"action": "args",
			"parts":  splits,
		})
		http.Error(w, "invalid base64("+err.Error()+"): "+splits[1], 500)
		return
	}

	assetUrl := string(splits[2])
	var processArgs ProcessArgs
	err = json.Unmarshal([]byte(argsJson), &processArgs)
	if err != nil {
		grohl.Log(grohl.Data{
			"error": err.Error(),
			"json":  string(argsJson),
		})
		return
	}

	processor := &IMagick{}

	// w.Header().Set("Cache-Control", "public, max-age=864000")
	err = processor.Process(w, r, assetUrl, processArgs)
	if err != nil {
		grohl.Log(grohl.Data{
			"error": err.Error(),
			"parts": splits,
		})
		http.Error(w, "processing failed", 500)
		return
	}

	grohl.Log(grohl.Data{
		"action":   "process",
		"args":     processArgs,
		"asset":    assetUrl,
		"referrer": r.Header.Get("Referer"),
	})
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}
	host := os.Getenv("HOST")

	grohl.Log(grohl.Data{
		"action": "listening",
		"host":   host,
		"port":   port,
	})

	err := http.ListenAndServe(host+":"+port, &ImageServer{})
	if err != nil {
		panic(err)
	}
}
