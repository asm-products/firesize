package models

import (
	"fmt"
	"math/rand"
	"os"
	"regexp"
	"time"

	"code.google.com/p/go.crypto/bcrypt"

	"github.com/dgrijalva/jwt-go"
)

var letters = []rune("abcdefghijklmnopqrstuvwxyz0123456789")

type Account struct {
	Id                int64     `db:"id" json:"id"`
	CreatedAt         time.Time `db:"created_at" json:"created"`
	UpdatedAt         time.Time `db:"updated_at" json:"updated"`
	Email             string    `db:"email" json:"email"`
	EncryptedPassword []byte    `db:"encrypted_password" json:"-"`
	Plan              string    `db:"plan" json:"plan"`
	Subdomain         string    `db:"subdomain" json:"subdomain"`
}

func FindAccountById(id int64) *Account {
	accounts, err := Dbm.Select(Account{}, `select * from accounts where id = $1 limit 1`, id)
	if err != nil {
		panic(err)
	}
	if len(accounts) == 0 {
		return nil
	}
	return accounts[0].(*Account)
}

func FindAccountByJwt(jwtString string) *Account {
  token, err := jwt.Parse(jwtString, func(token *jwt.Token) (interface{}, error) {
    return []byte(os.Getenv("SECRET")), nil
  })
  if err != nil || !token.Valid {
    panic(err)
  }

  account := FindAccountById(int64(token.Claims["account_id"].(float64)))
  if err != nil {
    panic(err)
  }

  return account
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

func FindAccountBySubdomain(subdomain string) *Account {
	accounts, err := Dbm.Select(Account{}, `select * from accounts where subdomain = $1 limit 1`, subdomain)
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

func (a *Account) GenEncryptedPassword(password string) error {
	var err error
	a.EncryptedPassword, err = bcrypt.GenerateFromPassword(
		[]byte(password), bcrypt.DefaultCost)
	return err
}

func (a *Account) GenJwt() (string, error) {
	token := jwt.New(jwt.GetSigningMethod("HS256"))
	token.Claims["account_id"] = a.Id
	token.Claims["exp"] = time.Now().Add(time.Hour * 72).Unix()
	return token.SignedString([]byte(os.Getenv("SECRET")))
}

func (a *Account) GenSubdomain() {
	if a.Subdomain != "" {
		return
	}

	randomLetters := make([]rune, 12)
	for i := range randomLetters {
		randomLetters[i] = letters[rand.Intn(len(letters))]
	}

	a.Subdomain = string(randomLetters)
}

func (a *Account) FiresizeUrl() string {
	return fmt.Sprintf("https://%s.firesize.com", a.Subdomain)
}

func (a *Account) Serialize() map[string]interface{} {
  now := time.Now()
  month := time.Date(now.Year(), now.Month(), 1, 0, 0, 0, 0, time.UTC)

  requests, err := Dbm.Select(ImageRequest{}, `SELECT * FROM image_requests WHERE account_id = $1 AND DATE_TRUNC('month', created_at) = $2 ORDER BY image_requests.created_at DESC`, a.Id, month)
	if err != nil {
		panic(err)
	}

  return map[string]interface{}{
    "subdomain": a.Subdomain,
    "plan": a.Plan,
    "plan_limit": 100,
    "request_count": len(requests),
    "requests": requests,
    "only_allow_whitelisted": true,
  }
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
