package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"
  "log"
  "strconv"

	"github.com/asm-products/firesize/app/models"
	"github.com/asm-products/firesize/addon"
	"github.com/whatupdave/mux"
)

type HerokuResourcesController struct {
}

func (c *HerokuResourcesController) Init(r *mux.Router) {
  r.HandleFunc("/heroku/resources",      c.Create).Methods("POST")
  r.HandleFunc("/heroku/resources/{id}", c.Update).Methods("PUT")
}

type CreateResourceParams struct {
	HerokuId    string            `json:"heroku_id"`
	Plan        string            `json:"plan"`
	CallbackUrl string            `json:"callback_url"`
	Options     map[string]string `json:"options"`
}

type UpdateResourceParams struct {
	HerokuId    string            `json:"heroku_id"`
	Plan        string            `json:"plan"`
}

// TODO: Save plan
func (c *HerokuResourcesController) Create(w http.ResponseWriter, r *http.Request) {
  if (!Authenticate(r)) {
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
  }

  decoder := json.NewDecoder(r.Body)
  var p CreateResourceParams
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

// TODO: Update plan and heroku id
func (c *HerokuResourcesController) Update(w http.ResponseWriter, r *http.Request) {
  if (!Authenticate(r)) {
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
  }

  decoder := json.NewDecoder(r.Body)
  var p UpdateResourceParams
  err := decoder.Decode(&p)
  if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
  }

  vars := mux.Vars(r)
  id, err := strconv.ParseInt(vars["id"], 0, 64)
  if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
  }

	account := models.FindAccountById(id)

	if account == nil {
		http.Error(w, "", http.StatusBadRequest)
		return
  }

  // account.Plan = p.Plan
  _, err = models.Update(account)
  if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
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
  username, password, ok := r.BasicAuth()
  if !ok {
    return false
  }

  return username == addon.Id() &&
    password == addon.Password()
}
