package main

import (
	"net/http"
	"os"
	"strings"
	"text/template"

	"github.com/technoweenie/grohl"
)

type ImageServer struct {
}

func (i *ImageServer) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path == "/jquery.firesize.js" {
		serveJs(w, r)
	} else {
		serveImage(w, r)
	}
}

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
		"action":   "process",
		"args":     processArgs,
		"referrer": r.Header.Get("Referer"),
	})
}

func serveJs(w http.ResponseWriter, r *http.Request) {
	tmpl, err := template.ParseFiles("./assets/jquery.firesize.js.tmpl")
	if err != nil {
		http.Error(w, "failed", 500)
	}
	domain := os.Getenv("JS_DOMAIN")
	if domain == "" {
		domain = "http://0.0.0.0:3000"
	}
	data := struct{ Domain string }{domain}
	err = tmpl.Execute(w, data)
	if err != nil {
		http.Error(w, "failed", 500)
	}
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
