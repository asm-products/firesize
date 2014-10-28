FROM golang:latest
MAINTAINER Dave Newman <dave@assembly.com> (@whatupdave)

ADD . /go/src/github.com/asm-products/firesize
RUN go get -u github.com/tools/godep \
              bitbucket.org/liamstask/goose/cmd/goose \
              github.com/codegangsta/gin

RUN apt-get update
RUN apt-get install -y git nodejs imagemagick npm inotify-tools

RUN curl https://raw.githubusercontent.com/alexedwards/go-reload/master/go-reload \
            -o /usr/local/bin/go-reload && \
    chmod +x /usr/local/bin/go-reload

WORKDIR /go/src/github.com/asm-products/firesize

RUN godep restore
