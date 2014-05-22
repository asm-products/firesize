package main

import "net/http"

func DashboardShow(w http.ResponseWriter, r *http.Request) {
	sessionNew, _ := store.Get(r, sessionKey)
	if sessionNew.Values["account"] == nil {
		http.Redirect(w, r, "/signin", http.StatusFound)
		return
	}

	view := "dashboard/show"
	http.ServeFile(w, r, "./app/views/"+view+".html")
}
