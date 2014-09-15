package main

import (
	"log"
	"net/http"
	"os"

	"github.com/asm-products/firesize/app/models"
	"github.com/asm-products/firesize/controllers"
	"github.com/asm-products/firesize/templates"
	"github.com/whatupdave/mux"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}
	host := os.Getenv("HOST")

	templates.Init("templates")
	models.InitDb(os.Getenv("DATABASE_URL"))

	r := mux.NewRouter()
	r.SkipClean(true) // have to use whatupdave/mux until Gorilla supports this

	new(controllers.HomeController).Init(r)
	new(controllers.SessionsController).Init(r)
	new(controllers.RegistrationsController).Init(r)
	new(controllers.ImagesController).Init(r)

	r.PathPrefix("/").Handler(http.FileServer(http.Dir("static")))

	log.Printf("listening on %s:%s \n", host, port)
	log.Fatalln(http.ListenAndServe(host+":"+port, r))
}
