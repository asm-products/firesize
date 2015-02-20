package controllers

import (
	"crypto/sha1"
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/asm-products/firesize/addon"
	"github.com/asm-products/firesize/models"
	"github.com/whatupdave/mux"
)

type SsoSessionsController struct {
}

func (c *SsoSessionsController) Init(r *mux.Router) {
	r.HandleFunc("/sso/login", c.Create).Methods("POST")
}

func (c *SsoSessionsController) Create(w http.ResponseWriter, r *http.Request) {
	err := r.ParseForm()
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	ssoSalt := addon.SsoSalt

	id, _ := strconv.ParseInt(r.FormValue("id"), 0, 64)
	timestamp := r.FormValue("timestamp")
	token := r.FormValue("token")
	navData := r.FormValue("nav-data")

	sha := sha1.New()
	sha.Write([]byte(strconv.FormatInt(id, 10) + ":" + ssoSalt + ":" + timestamp))
	binary := sha.Sum(nil)
	hash := fmt.Sprintf("%x", binary)
	if hash != token {
		http.Error(w, "Invalid token", http.StatusForbidden)
		return
	}

	timestampLimit := int(time.Now().Unix() - (2 * 60))
	timestampInt, err := strconv.Atoi(timestamp)
	if (err != nil) || (timestampInt < timestampLimit) {
		http.Error(w, "Invalid timestamp", http.StatusForbidden)
		return
	}

	account := models.FindAccountById(id)
	if account == nil {
		http.Error(w, "Account not found", http.StatusNotFound)
		return
	}

	tokenString, err := account.GenJwt()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	http.SetCookie(w, &http.Cookie{
		Name:  "heroku-nav-data",
		Value: navData,
	})

	http.Redirect(w, r, "/dashboard?token="+tokenString, 302)
}
