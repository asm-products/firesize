package controllers

import (
	"net/http"

	"github.com/asm-products/firesize/templates"
	"github.com/whatupdave/mux"
)

type HomeController struct {
}

func (c *HomeController) Init(r *mux.Router) {
	r.HandleFunc("/", c.Get)
}

func (c *HomeController) Get(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Content-Type", "text/html")

	err := templates.Render(w, "layout", nil)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
