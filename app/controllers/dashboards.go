package controllers

import (
	"github.com/asm-products/firesize/app/routes"
	r "github.com/revel/revel"
)

type Dashboard struct {
	Application
}

func (c Dashboard) Show() r.Result {
	return c.Render()
}

func (c Dashboard) checkAccount() r.Result {
	if account := c.connected(); account == nil {
		c.Flash.Error("Please log in first")
		return c.Redirect(routes.Home.Show())
	}
	return nil

}
