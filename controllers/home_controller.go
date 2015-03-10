package controllers

import (
	"net/http"

	"github.com/asm-products/firesize/templates"
	"github.com/whatupdave/mux"
)

type HomeController struct {
}

func (c *HomeController) Init(r *mux.Router) {
	r.HandleFunc("/", c.Index)
	r.HandleFunc("/dashboard", c.Index)
	r.HandleFunc("/docs", c.Index)
	r.HandleFunc("/404", c.Index)
}

func (c *HomeController) Index(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Content-Type", "text/html")

	err := templates.Render(w, "layout", nil)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}
