FROM gliderlabs/alpine:3.1

RUN apk-install git nodejs python

WORKDIR /app

ENTRYPOINT ["/app/webpack.sh"]
