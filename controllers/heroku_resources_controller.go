package controllers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/asm-products/firesize/addon"
	"github.com/asm-products/firesize/models"
	"github.com/whatupdave/mux"
)

type HerokuResourcesController struct {
}

func (c *HerokuResourcesController) Init(r *mux.Router) {
	r.HandleFunc("/heroku/resources", c.Create).Methods("POST")
	r.HandleFunc("/heroku/resources/{id}", c.Update).Methods("PUT")
	r.HandleFunc("/heroku/resources/{id}", c.Delete).Methods("DELETE")
}

type CreateResourceParams struct {
	HerokuId    string            `json:"heroku_id"`
	Plan        string            `json:"plan"`
	CallbackUrl string            `json:"callback_url"`
	Options     map[string]string `json:"options"`
}

type UpdateResourceParams struct {
	HerokuId string `json:"heroku_id"`
	Plan     string `json:"plan"`
}

func (c *HerokuResourcesController) Create(w http.ResponseWriter, r *http.Request) {
	if !Authenticate(r) {
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
		Email:     p.HerokuId,
		Plan:      p.Plan,
		CreatedAt: time.Now(),
	}

	account.GenSubdomain()

	err = account.GenEncryptedPassword(p.HerokuId)
	if err != nil {
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
		"config": map[string]string{"FIRESIZE_URL": "https://firesize.com"},
		"id":     account.Id,
		"plan":   account.Plan,
	})
}

func (c *HerokuResourcesController) Update(w http.ResponseWriter, r *http.Request) {
	if !Authenticate(r) {
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
		http.Error(w, "", http.StatusNotFound)
		return
	}

	account.Email = p.HerokuId
	account.Plan = p.Plan
	_, err = models.Update(account)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	fmt.Fprint(w, Response{
		"id":     account.Id,
		"config": map[string]string{"FIRESIZE_URL": "https://firesize.com"},
	})
}

func (c *HerokuResourcesController) Delete(w http.ResponseWriter, r *http.Request) {
	if !Authenticate(r) {
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
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
		http.Error(w, "", http.StatusNotFound)
		return
	}

	_, err = models.Delete(account)
	if err != nil {
		http.Error(w, "", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusNoContent)
}

func Authenticate(r *http.Request) bool {
	username, password, ok := r.BasicAuth()
	if !ok {
		return false
	}

	return username == addon.Id &&
		password == addon.Password
}
