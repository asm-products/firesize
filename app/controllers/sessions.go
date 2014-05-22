package controllers

import (
	"strconv"

	"code.google.com/p/go.crypto/bcrypt"
	"github.com/asm-products/firesize/app/models"
	"github.com/asm-products/firesize/app/routes"
	r "github.com/revel/revel"
)

type Sessions struct {
	GorpController
}

func (c Sessions) New() r.Result {
	return c.Render()
}

func (c Sessions) Create(email, password string, remember bool) r.Result {
	account := models.FindAccountByEmail(c.Txn, email)
	if account != nil {
		err := bcrypt.CompareHashAndPassword(account.EncryptedPassword, []byte(password))
		if err == nil {
			c.Session["account_id"] = strconv.FormatInt(account.Id, 10)
			if remember {
				c.Session.SetDefaultExpiration()
			} else {
				c.Session.SetNoExpiration()
			}
			return c.Redirect(routes.Dashboard.Show())
		}
	}

	c.Flash.Out["email"] = email
	c.Flash.Error("Login failed")
	return c.Redirect(routes.Sessions.New())
}

func (c Sessions) Destroy() r.Result {
	for k := range c.Session {
		delete(c.Session, k)
	}
	return c.Redirect(routes.Home.Show())
}
