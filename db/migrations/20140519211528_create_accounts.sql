-- +goose Up
CREATE TABLE accounts (
  id          		SERIAL    PRIMARY KEY,
  created_at  		timestamp NOT NULL,
  updated_at		timestamp NOT NULL,
  encrypted_password	text 	  NOT NULL,
  email       		text      NOT NULL
);

CREATE UNIQUE INDEX idx_accounts_email on accounts (lower(email));

-- +goose Down
DROP TABLE accounts;

