package controllers

import (
	"strings"

	"github.com/asm-products/firesize/app/models"
	r "github.com/revel/revel"
	"github.com/technoweenie/grohl"
)

type Images struct {
	*r.Controller
}

type Html string

func (r Html) Apply(req *r.Request, resp *r.Response) {
	splits := strings.Split(req.URL.String(), "/")

	processArgs := models.NewProcessArgs(splits[1:])

	processor := &models.IMagick{}

	resp.Out.Header().Set("Cache-Control", "public, max-age=864000")

	err := processor.Process(resp.Out, req.Request, processArgs)
	if err != nil {
		grohl.Log(grohl.Data{
			"error": err.Error(),
			"parts": splits,
		})
		panic("processing failed")
		return
	}

	grohl.Log(grohl.Data{
		"action":  "process",
		"args":    processArgs,
		"headers": req.Header,
	})
}

func (c Images) Process() r.Result {
	// splits := strings.Split(req.URL.String(), "/")

	return Html("hi")
}
