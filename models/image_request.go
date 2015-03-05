package models

import (
	"errors"
	"time"
)

type ImageRequest struct {
	Id        int64     `db:"id" json:"id"`
	CreatedAt time.Time `db:"created_at" json:"created"`
	UpdatedAt time.Time `db:"updated_at" json:"updated"`
	AccountId int64     `db:"account_id" json:"account_id"`
}

func CreateImageRequestForSubdomain(subdomain string) error {
	account := FindAccountBySubdomain(subdomain)
	if account == nil {
		return errors.New("Account not found")
	}

	imageRequest := ImageRequest{
		CreatedAt: time.Now(),
		AccountId: account.Id,
	}

	err := Insert(&imageRequest)
	if err != nil {
		return err
	}

	return nil
}

func FindImageRequestCountForAccount(account *Account) int64 {
	count, err := Dbm.SelectInt(`select count(*) from image_requests where account_id = $1 limit 1`, account.Id)
	if err != nil {
		panic(err)
	}
	return count
}
