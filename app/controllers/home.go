package controllers

import (
	r "github.com/revel/revel"
)

type Home struct {
	*r.Controller
}

func (c Home) Show() r.Result {
	return c.Render()
}
