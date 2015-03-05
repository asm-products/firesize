-- +goose Up
CREATE TABLE image_requests (
  id          		SERIAL    PRIMARY KEY,
  created_at  		timestamp NOT NULL,
  updated_at		  timestamp NOT NULL,
  account_id      integer   NOT NULL
);

CREATE UNIQUE INDEX image_requests_account_id on image_requests (account_id);

-- +goose Down
DROP TABLE image_requests;
