FROM google/golang:latest
MAINTAINER Dave Newman <dave@assembly.com> (@whatupdave)

ADD . /gopath/src/github.com/asm-products/firesize
RUN go get -u github.com/tools/godep \
              bitbucket.org/liamstask/goose/cmd/goose \
              github.com/codegangsta/gin

RUN apt-get install --no-install-recommends -y -q imagemagick

WORKDIR /gopath/src/github.com/asm-products/firesize

RUN godep restore
