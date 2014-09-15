package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/asm-products/firesize/app/models"
	"github.com/whatupdave/mux"
)

type RegistrationsController struct {
}

func (c *RegistrationsController) Init(r *mux.Router) {
	r.HandleFunc("/api/registrations", c.Create).Methods("POST")
}

type RegistrationParams struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func (c *RegistrationsController) Create(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var p RegistrationParams
	err := decoder.Decode(&p)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	account := models.Account{
		CreatedAt: time.Now(),
		Email:     p.Email,
	}
	if err = account.GenEncryptedPassword(p.Password); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	err = models.Insert(&account)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	tokenString, err := account.GenJwt()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	fmt.Fprint(w, Response{"token": tokenString})
}
