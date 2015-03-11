package controllers

import (
	"fmt"
	"net/http"

	"github.com/asm-products/firesize/models"
	"github.com/whatupdave/mux"
)

type AccountsController struct {
}

func (c *AccountsController) Init(r *mux.Router) {
	r.HandleFunc("/api/account", c.Show).Methods("GET")
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
