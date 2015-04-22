setup:
	go get bitbucket.org/liamstask/goose/cmd/goose
	[[ -f ".env" ]] || cp .env.sample .env

run:
	godep go run server.go

watch:
	gin godep go run server.go

watch_assets:
	. webpack.sh

migrate:
	export $(cat .env | xargs) > /dev/null && goose up

migrate_test:
	export $(cat .env | sed 's/_development/_test/' | xargs) > /dev/null && goose up

test:
	godep go test -race -v ./...
