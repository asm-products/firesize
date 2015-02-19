-- +goose Up
ALTER TABLE accounts ADD COLUMN plan text;

-- +goose Down
ALTER TABLE accounts DROP COLUMN plan;

