package main

import (
	"database/sql"
	"net/http"

	"github.com/gorilla/sessions"
)

var store = sessions.NewCookieStore([]byte("something-very-secret"))
var sessionKey = "_fs_session"

func SessionsCreate(w http.ResponseWriter, r *http.Request) {
	if err := r.ParseForm(); err != nil {
		http.Error(w, "Bad Request "+err.Error(), http.StatusBadRequest)
	}

	email := r.FormValue("account[email]")
	password := r.FormValue("account[password]")

	var account Account
	err := dbmap.SelectOne(&account, "select * from accounts where email = $1 limit 1", email)
	if err == sql.ErrNoRows {
		http.Error(w, "Not Authorized", http.StatusUnauthorized)
		return
	} else if err != nil {
		http.Error(w, "Bad Request "+err.Error(), http.StatusBadRequest)
		return
	}

	if !account.PasswordOk(password) {
		http.Error(w, "Not Authorized", http.StatusUnauthorized)
		return
	}

	session, _ := store.Get(r, sessionKey)
	session.Values["account"] = account.Id
	if err = session.Save(r, w); err != nil {
		http.Error(w, "Error "+err.Error(), http.StatusInternalServerError)
		return
	}

	http.Redirect(w, r, "/dashboard", http.StatusFound)
}

func SessionsNew(w http.ResponseWriter, r *http.Request) {
	view := "sessions/new"
	http.ServeFile(w, r, "./app/views/"+view+".html")
}

func SessionsDestroy(w http.ResponseWriter, r *http.Request) {
	session, _ := store.Get(r, sessionKey)
	session.Values["account"] = nil
	if err := session.Save(r, w); err != nil {
		http.Error(w, "Error "+err.Error(), http.StatusInternalServerError)
		return
	}

	http.Redirect(w, r, "/", http.StatusFound)
}
