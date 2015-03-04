-- +goose Up
ALTER TABLE accounts ADD COLUMN subdomain text;
UPDATE account SET subdomain = (SELECT substring(md5(random()::text) from 0 for 13));
ALTER TABLE accounts ALTER COLUMN subdomain SET NOT NULL;
CREATE UNIQUE INDEX subdomain_index ON accounts (subdomain);

-- +goose Down
ALTER TABLE accounts DROP COLUMN subdomain;
