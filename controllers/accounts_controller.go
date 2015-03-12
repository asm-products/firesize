package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/asm-products/firesize/models"
	"github.com/whatupdave/mux"
)

type AccountsController struct {
}

func (c *AccountsController) Init(r *mux.Router) {
	r.HandleFunc("/api/account", c.Show).Methods("GET")
	r.HandleFunc("/api/account", c.Update).Methods("PATCH")
}

type UpdateAccountParams struct {
	Subdomain string `json:"subdomain"`
	Plan      string `json:"plan"`
}

func (c *AccountsController) Show(w http.ResponseWriter, r *http.Request) {
	authHeader := r.Header.Get("Authorization")

	account := models.FindAccountByJwt(authHeader)
	if account == nil {
		http.Error(w, "Account not found", http.StatusUnauthorized)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	fmt.Fprint(w, Response(account.Serialize()))
}

func (c *AccountsController) Update(w http.ResponseWriter, r *http.Request) {
	authHeader := r.Header.Get("Authorization")

	account := models.FindAccountByJwt(authHeader)
	if account == nil {
		http.Error(w, "Account not found", http.StatusUnauthorized)
		return
	}

	decoder := json.NewDecoder(r.Body)
	var p UpdateAccountParams
	err := decoder.Decode(&p)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	account.Subdomain = p.Subdomain
	account.Plan = p.Plan
	_, err = models.Update(account)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	fmt.Fprint(w, Response(account.Serialize()))
}
