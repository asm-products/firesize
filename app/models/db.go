package models

import (
	"database/sql"
	"log"
	"os"

	"github.com/go-gorp/gorp"
	_ "github.com/lib/pq"
)

var Dbm *gorp.DbMap

// Init creates a connection to postgres and returns a gorp
func InitDb(url string) {
	db, err := sql.Open("postgres", url)
	if err != nil {
		panic(err)
	}

	Dbm = &gorp.DbMap{Db: db, Dialect: gorp.PostgresDialect{}}
	Dbm.AddTableWithName(Account{}, "accounts").SetKeys(true, "Id")
	Dbm.TraceOn("[gorp]", log.New(os.Stdout, "sql:", log.Lmicroseconds))
}

func Insert(m interface{}) error {
	return Dbm.Insert(m)
}

func Update(m interface{}) (count int64, err error) {
	return Dbm.Update(m)
}

func Delete(m interface{}) (count int64, err error) {
	return Dbm.Delete(m)
}
