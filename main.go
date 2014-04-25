package main

import (
	"encoding/base64"
	"net/http"
	"os"
	"strings"

	"github.com/technoweenie/grohl"
)

type ImageServer struct {
}

func (i *ImageServer) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	splits := strings.SplitN(r.URL.String(), "/", 3)

	processArgs, err := base64.StdEncoding.DecodeString(splits[1])
	if err != nil {
		http.Error(w, "invalid args", 500)
		return
	}

    assetUrl := splits[2]

	grohl.Log(grohl.Data{
		"action": "process",
		"base64": string(processArgs),
        "asset": assetUrl,
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
