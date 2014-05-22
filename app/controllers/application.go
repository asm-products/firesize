package controllers

import (
	"strconv"

	"github.com/asm-products/firesize/app/models"
	r "github.com/revel/revel"
)

type Application struct {
	GorpController
}

func (c Application) SetAccount() r.Result {
	if account := c.connected(); account != nil {
		c.RenderArgs["account"] = account
	}
	return nil
}

func (c Application) Auth() r.Result {
	if user := c.connected(); user == nil {
		c.Flash.Error("Please sign in first")
		return c.Redirect(Home.Show)
	}
	return nil
}

func (c Application) connected() *models.Account {
	if c.RenderArgs["account"] != nil {
		return c.RenderArgs["account"].(*models.Account)
	}
	if sid, ok := c.Session["account_id"]; ok {
		id, _ := strconv.ParseInt(sid, 10, 64)
		return c.getAccount(id)
	}
	return nil
}

func (c Application) getAccount(id int64) *models.Account {
	accounts, err := c.Txn.Select(models.Account{}, `select * from accounts where id = $1 limit 1`, id)
	if err != nil {
		panic(err)
	}
	if len(accounts) == 0 {
		return nil
	}
	return accounts[0].(*models.Account)
}
