#!/usr/bin/env bash

db=$(heroku config | grep DATABASE_URL | tr -s ' ' | cut -d ' ' -f 2)

function sql {
  psql $db -t -c "$1" | tr -s ' '
}

heroku=$(sql "SELECT COUNT(*) FROM accounts WHERE email LIKE '%heroku.com%' AND created_at > CURRENT_DATE - INTERVAL '30 days';")
manual=$(sql "SELECT COUNT(*) FROM accounts WHERE email NOT LIKE '%heroku.com%' AND created_at > CURRENT_DATE - INTERVAL '30 days';")
resizes=$(sql "SELECT COUNT(*) FROM image_requests WHERE created_at > CURRENT_DATE - INTERVAL '30 days';")
active_count=$(sql "SELECT COUNT(DISTINCT image_requests.account_id) FROM image_requests WHERE created_at > CURRENT_DATE - INTERVAL '30 days';")
active=$(sql "SELECT accounts.email, COUNT(accounts.email) FROM image_requests JOIN accounts ON image_requests.account_id = accounts.id WHERE accounts.created_at > CURRENT_DATE - INTERVAL '30 days' GROUP BY accounts.email ORDER BY COUNT(accounts.email) DESC LIMIT 10;")

echo "Last 30 days"
echo "------------"
echo "Heroku Signups: $heroku"
echo "Manaul Signups: $manual"
echo "Image resizes: $resizes"
echo "Active accounts: $active_count"
echo "Top #10 accounts by image resize count:"
echo "$active"

echo

heroku=$(sql "SELECT COUNT(*) FROM accounts WHERE email LIKE '%heroku.com%';")
manual=$(sql "SELECT COUNT(*) FROM accounts WHERE email NOT LIKE '%heroku.com%';")
resizes=$(sql "SELECT COUNT(*) FROM image_requests;")
active_count=$(sql "SELECT COUNT(DISTINCT image_requests.account_id) FROM image_requests ;")
active=$(sql "SELECT accounts.email, COUNT(accounts.email) FROM image_requests JOIN accounts ON image_requests.account_id = accounts.id GROUP BY accounts.email ORDER BY COUNT(accounts.email) DESC LIMIT 10;")

echo "All time"
echo "-------"
echo "Heroku Signups: $heroku"
echo "Manaul Signups: $manual"
echo "Image resizes: $resizes"
echo "Active accounts: $active_count"
echo "Top #10 accounts by image resize count:"
echo "$active"
