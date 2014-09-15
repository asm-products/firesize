package models

import (
	"fmt"
	"regexp"
	"time"
)

type Account struct {
	Id                int64     `db:"id"          json:"id"`
	CreatedAt         time.Time `db:"created_at"  json:"created"`
	UpdatedAt         time.Time `db:"updated_at"  json:"updated"`
	Email             string    `db:"email"       json:"email"`
	Password          string    `db:"-" json:"-"`
	EncryptedPassword []byte    `db:"encrypted_password"       json:"-"`
}

func FindAccountByEmail(email string) *Account {
	accounts, err := Dbm.Select(Account{}, `select * from accounts where lower(email) = lower($1) limit 1`, email)
	if err != nil {
		panic(err)
	}
	if len(accounts) == 0 {
		return nil
	}
	return accounts[0].(*Account)
}

func (a *Account) String() string {
	return fmt.Sprintf("Account(%a)", a.Email)
}

var emailRegex = regexp.MustCompile("^.+@.+$")

// func (a *Account) Validate(v *revel.Validation) {
// 	v.Check(a.Email,
// 		revel.Required{},
// 		revel.MinSize{4},
// 		revel.Match{emailRegex},
// 	)
//
// 	ValidatePassword(v, a.Password).
// 		Key("account.Password")
// }
//
// func ValidatePassword(v *revel.Validation, password string) *revel.ValidationResult {
// 	return v.Check(password,
// 		revel.Required{},
// 		revel.MaxSize{15},
// 		revel.MinSize{5},
// 	)
// }
