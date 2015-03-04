-- +goose Up
ALTER TABLE accounts ADD COLUMN subdomain text;
ALTER TABLE accounts ALTER COLUMN subdomain SET NOT NULL;

-- +goose Down
ALTER TABLE accounts DROP COLUMN subdomain;
