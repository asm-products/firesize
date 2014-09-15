package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"code.google.com/p/go.crypto/bcrypt"
	"github.com/asm-products/firesize/app/models"
	"github.com/whatupdave/mux"
)

type SessionsController struct {
}

func (c *SessionsController) Init(r *mux.Router) {
	r.HandleFunc("/api/sessions", c.Create).Methods("POST")
}

type SessionParams struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type Response map[string]interface{}

func (r Response) String() (s string) {
	b, err := json.Marshal(r)
	if err != nil {
		s = ""
		return
	}
	s = string(b)
	return
}

func (c *SessionsController) Create(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var p SessionParams
	err := decoder.Decode(&p)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	account := models.FindAccountByEmail(p.Email)
	if account != nil {
		err := bcrypt.CompareHashAndPassword(account.EncryptedPassword, []byte(p.Password))
		if err == nil {
			tokenString, err := account.GenJwt()
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
			}

			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusCreated)
			fmt.Fprint(w, Response{"token": tokenString})
			return
		}
	}

	http.Error(w, "Unauthorized", http.StatusUnauthorized)
}
