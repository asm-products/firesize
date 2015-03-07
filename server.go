package main

import (
	"net/http"
	"os"
  "math/rand"
  "time"

	"github.com/asm-products/firesize/addon"
	"github.com/asm-products/firesize/controllers"
	"github.com/asm-products/firesize/models"
	"github.com/asm-products/firesize/templates"
	"github.com/codegangsta/negroni"
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
	addon.Init(os.Getenv("HEROKU_ID"), os.Getenv("HEROKU_API_PASSWORD"), os.Getenv("HEROKU_SSO_SALT"))

  rand.Seed(time.Now().UTC().UnixNano())

	r := mux.NewRouter()
	r.SkipClean(true) // have to use whatupdave/mux until Gorilla supports this

	new(controllers.HerokuResourcesController).Init(r)
	new(controllers.HomeController).Init(r)
	new(controllers.ImagesController).Init(r)
	new(controllers.RegistrationsController).Init(r)
	new(controllers.SessionsController).Init(r)
	new(controllers.SsoSessionsController).Init(r)

	r.PathPrefix("/").Handler(http.FileServer(http.Dir("static")))

	n := negroni.Classic()
	n.UseHandler(r)
	n.Run(host + ":" + port)
}
