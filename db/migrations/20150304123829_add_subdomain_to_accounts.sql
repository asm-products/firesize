-- +goose Up
ALTER TABLE accounts ADD COLUMN subdomain text;

-- +goose Down
ALTER TABLE accounts DROP COLUMN subdomain;
