package controllers

import (
	"net/http"
	"strings"

	"github.com/asm-products/firesize/models"
	"github.com/technoweenie/grohl"
	"github.com/whatupdave/mux"
)

type ImagesController struct {
}

func (c *ImagesController) Init(r *mux.Router) {
	r.HandleFunc("/{args:.*?}http{path:.*}", c.Get)
}

// TODO: Pass through requests without an account subdomain
func (c *ImagesController) Get(w http.ResponseWriter, r *http.Request) {
	subdomain := strings.Split(r.Host, ".")[0]
	models.CreateImageRequestForSubdomain(subdomain)

	vars := mux.Vars(r)

	url := "http" + vars["path"]
	args := strings.Split(vars["args"], "/")
	processArgs := models.NewProcessArgs(args, url)

	processor := &models.IMagick{}

	w.Header().Set("Cache-Control", "public, max-age=864000")

	err := processor.Process(w, r, processArgs)
	if err != nil {
		grohl.Log(grohl.Data{
			"error": err.Error(),
			"parts": args,
			"url":   url,
		})
		panic("processing failed")
	}

	grohl.Log(grohl.Data{
		"action":  "process",
		"args":    processArgs,
		"headers": r.Header,
	})
}
