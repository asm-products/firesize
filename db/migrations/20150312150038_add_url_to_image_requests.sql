-- +goose Up
ALTER TABLE image_requests ADD COLUMN url text;
ALTER TABLE image_requests ALTER COLUMN url SET DEFAULT '';
UPDATE image_requests SET url = '' WHERE url IS NULL;
ALTER TABLE image_requests ALTER COLUMN url SET NOT NULL;

-- +goose Down
ALTER TABLE image_requests DROP COLUMN url;
