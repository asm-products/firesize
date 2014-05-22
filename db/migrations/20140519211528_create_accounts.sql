-- +goose Up
CREATE TABLE accounts (
  id          		SERIAL    PRIMARY KEY,
  created_at  		timestamp NOT NULL,
  updated_at		timestamp NOT NULL,
  encrypted_password	text 	  NOT NULL,
  email       		text      NOT NULL UNIQUE
);

-- +goose Down
DROP TABLE accounts;

