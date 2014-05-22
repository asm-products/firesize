package controllers

import (
	"database/sql"
	"log"
	"os"

	"github.com/asm-products/firesize/app/models"
	"github.com/coopernurse/gorp"
	_ "github.com/lib/pq"
	r "github.com/revel/revel"
	db "github.com/revel/revel/modules/db/app"
)

var (
	Dbm *gorp.DbMap
)

func InitDB() {
	db.Init()
	Dbm = &gorp.DbMap{Db: db.Db, Dialect: gorp.PostgresDialect{}}
	Dbm.AddTableWithName(models.Account{}, "accounts").SetKeys(true, "Id")
	Dbm.TraceOn("[gorp]", log.New(os.Stdout, "sql:", log.Lmicroseconds))
}

type GorpController struct {
	*r.Controller
	Txn *gorp.Transaction
}

func (c *GorpController) Begin() r.Result {
	txn, err := Dbm.Begin()
	if err != nil {
		panic(err)
	}
	c.Txn = txn
	return nil
}

func (c *GorpController) Commit() r.Result {
	if c.Txn == nil {
		return nil
	}
	if err := c.Txn.Commit(); err != nil && err != sql.ErrTxDone {
		panic(err)
	}
	c.Txn = nil
	return nil
}

func (c *GorpController) Rollback() r.Result {
	if c.Txn == nil {
		return nil
	}
	if err := c.Txn.Rollback(); err != nil && err != sql.ErrTxDone {
		panic(err)
	}
	c.Txn = nil
	return nil
}
