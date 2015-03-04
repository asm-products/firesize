-- +goose Up
ALTER TABLE accounts ADD COLUMN subdomain text;
ALTER TABLE accounts ALTER COLUMN subdomain SET NOT NULL;
CREATE UNIQUE INDEX subdomain_index ON accounts (subdomain);

-- +goose Down
ALTER TABLE accounts DROP COLUMN subdomain;
