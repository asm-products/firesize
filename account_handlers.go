package main

import (
	"net/http"
	"strings"
)

func AccountsCreate(w http.ResponseWriter, r *http.Request) {
	if err := r.ParseForm(); err != nil {
		http.Error(w, "Bad Request "+err.Error(), http.StatusBadRequest)
	}

	email := strings.Replace(r.PostForm["account[email]"][0], " ", "", -1)
	password := r.PostForm["account[password]"][0]

	account := NewAccount(email, password)
	if !account.IsValid() {
		http.Error(w, "Invalid", http.StatusBadRequest)
	} else {
		err := dbmap.Insert(account)
		if err != nil {
			http.Error(w, "Bad Request "+err.Error(), http.StatusBadRequest)
		}
	}

	http.Redirect(w, r, "/dashboard", http.StatusFound)
}
