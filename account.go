package main

import (
	"time"

	"code.google.com/p/go.crypto/bcrypt"
)

type Account struct {
	Id                int64     `db:"id"          json:"id"`
	CreatedAt         time.Time `db:"created_at"  json:"created"`
	UpdatedAt         time.Time `db:"updated_at"  json:"updated"`
	Email             string    `db:"email"       json:"email"`
	EncryptedPassword []byte    `db:"encrypted_password"       json:"-"`
}

func NewAccount(email string, password string) *Account {
	created := time.Now()

	return &Account{
		CreatedAt:         created,
		UpdatedAt:         created,
		Email:             email,
		EncryptedPassword: HashPassword([]byte(password)),
	}
}

func (a *Account) IsValid() bool {
	return true
}

func (a *Account) PasswordOk(password string) bool {
	return bcrypt.CompareHashAndPassword(a.EncryptedPassword, []byte(password)) == nil
}

func HashPassword(password []byte) []byte {
	hash, _ := bcrypt.GenerateFromPassword(password, bcrypt.DefaultCost)
	return hash
}
