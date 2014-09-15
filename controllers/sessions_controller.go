package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"time"

	"code.google.com/p/go.crypto/bcrypt"
	"github.com/asm-products/firesize/app/models"
	"github.com/dgrijalva/jwt-go"
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
			token := jwt.New(jwt.GetSigningMethod("HS256"))
			token.Claims["account_id"] = account.Id
			token.Claims["exp"] = time.Now().Add(time.Hour * 72).Unix()
			tokenString, err := token.SignedString([]byte(os.Getenv("SECRET")))
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
