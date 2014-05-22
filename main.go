package main

import (
	"net/http"
	"os"

	"github.com/codegangsta/negroni"
	"github.com/coopernurse/gorp"
	"github.com/technoweenie/grohl"
	"github.com/whatupdave/mux"
)

var dbmap *gorp.DbMap

func main() {
	dbmap = initDb(os.Getenv("DATABASE_URL"))
	defer dbmap.Db.Close()

	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}
	host := os.Getenv("HOST")

	grohl.Log(grohl.Data{
		"action": "listening",
		"host":   host,
		"port":   port,
	})

	r := mux.NewRouter()

	r.HandleFunc("/", View("home/home")).Methods("GET")
	r.HandleFunc("/accounts", AccountsCreate).Methods("POST")
	r.HandleFunc("/dashboard", DashboardShow).Methods("GET")
	r.HandleFunc("/examples", View("home/examples")).Methods("GET")
	r.HandleFunc("/signin", SessionsNew).Methods("GET")
	r.HandleFunc("/signout", SessionsDestroy).Methods("GET")

	r.HandleFunc("/sessions", SessionsCreate).Methods("POST")

	// Image processing requests
	r.SkipClean(true)
	r.HandleFunc("/{path:.*}", serveImage)

	n := negroni.Classic()

	// assets – no asset pipeline :(
	n.Use(negroni.NewStatic(http.Dir("assets")))

	// router goes last
	n.UseHandler(r)

	err := http.ListenAndServe(host+":"+port, n)
	if err != nil {
		panic(err)
	}
}

func View(name string) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "./app/views/"+name+".html")
	}
}
