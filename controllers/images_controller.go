package controllers

import (
	"net/http"
	"strings"

	"github.com/asm-products/firesize/app/models"
	"github.com/technoweenie/grohl"
	"github.com/whatupdave/mux"
)

type ImagesController struct {
}

func (c *ImagesController) Init(r *mux.Router) {
	r.HandleFunc("/{args:.*}/http{path:.*}", c.Get)
}

func (c *ImagesController) Get(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	args := append(strings.Split(vars["args"], "/"), "http"+vars["path"])

	processArgs := models.NewProcessArgs(args)

	processor := &models.IMagick{}

	w.Header().Set("Cache-Control", "public, max-age=864000")

	err := processor.Process(w, r, processArgs)
	if err != nil {
		grohl.Log(grohl.Data{
			"error": err.Error(),
			"parts": args,
		})
		panic("processing failed")
	}

	grohl.Log(grohl.Data{
		"action":  "process",
		"args":    processArgs,
		"headers": r.Header,
	})
}
