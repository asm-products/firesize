-- +goose Up
DROP INDEX image_requests_account_id;

-- +goose Down
CREATE INDEX image_requests_account_id on image_requests (account_id);
