package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"
  "log"

	"github.com/asm-products/firesize/app/models"
	"github.com/asm-products/firesize/addon"
	"github.com/whatupdave/mux"
)

type HerokuController struct {
}

func (c *HerokuController) Init(r *mux.Router) {
  r.HandleFunc("/heroku/resources", c.Create).Methods("POST")
}

type HerokuParams struct {
	HerokuId    string            `json:"heroku_id"`
	Plan        string            `json:"plan"`
	CallbackUrl string            `json:"callback_url"`
	Options     map[string]string `json:"options"`
}

func (c *HerokuController) Create(w http.ResponseWriter, r *http.Request) {
  if (!Authenticate(r)) {
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
  }

  decoder := json.NewDecoder(r.Body)
  var p HerokuParams
  err := decoder.Decode(&p)
  if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
  }

  account := models.Account{
    CreatedAt: time.Now(),
    Email:     p.HerokuId,
  }

	if err = account.GenEncryptedPassword(p.HerokuId); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

  err = models.Insert(&account)
  if err != nil {
    log.Fatal(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
  }

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
  fmt.Fprint(w, Response{
    "id": account.Id,
    "config": map[string]string{"FIRESIZE_URL": "https://firesize.com"},
  })
}

func Authenticate(r *http.Request) bool {
  _, password, ok := r.BasicAuth()
  if !ok {
    return false
  }

  return password == addon.Password()
}
