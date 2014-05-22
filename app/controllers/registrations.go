package controllers

import (
	"strconv"

	"code.google.com/p/go.crypto/bcrypt"
	"github.com/asm-products/firesize/app/models"
	"github.com/asm-products/firesize/app/routes"
	r "github.com/revel/revel"
)

type Registrations struct {
	GorpController
}

func (c Registrations) New() r.Result {
	return c.Render()
}

func (c Registrations) Create(account models.Account, verifyEmail string) r.Result {
	c.Validation.Required(verifyEmail)
	c.Validation.Required(verifyEmail == account.Email).
		Message("Emails don't match")
	account.Validate(c.Validation)

	if c.Validation.HasErrors() {
		c.Validation.Keep()
		c.FlashParams()
		return c.Redirect(routes.Home.Show())
	}

	account.EncryptedPassword, _ = bcrypt.GenerateFromPassword(
		[]byte(account.Password), bcrypt.DefaultCost)
	err := c.Txn.Insert(&account)
	if err != nil {
		panic(err)
	}

	c.Session["account_id"] = strconv.FormatInt(account.Id, 10)
	return c.Redirect(routes.Dashboard.Show())
}
