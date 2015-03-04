# Firesize

## Imagemagick as a Service

Processes images on the fly using imagemagick.

[![Build Status](https://travis-ci.org/asm-products/firesize.svg?branch=master)](https://travis-ci.org/asm-products/firesize)

## Getting Started with Fig

Prerequisites:

* [Docker](https://docker.com/)
* [Fig](http://www.fig.sh/)
* [boot2docker](http://boot2docker.io/) if you're not running Linux

Create the database and run migrations:

    $ fig run web goose up

Start the app:

    $ fig up

Get the boot2docker ip if you're not on Linux:

    $ boot2docker ip

Open up [http://192.168.59.103:3000](http://192.168.59.103:3000)

## Getting Started without Fig

Prerequisites:

* [Go](https://golang.org/)
* [Node](http://nodejs.org/)
* [Postgres](http://www.postgresql.org/)
* [ImageMagick](http://www.imagemagick.org/)

Install dependencies:

    $ go get -u github.com/tools/godep \
                bitbucket.org/liamstask/goose/cmd/goose \
                github.com/codegangsta/gin

Create the database and run migrations:

    $ DATABASE_URL="dbname=firesize_development sslmode=disable" goose up

Run the server:

    $ gin

Run the asset compiler (in a separate tab/pane):

    $ ./webpack.sh

Open up [http://localhost:3000](http://localhost:3000)

## API

    /{width}x{height}/{gravity}/{frame}/{source}

Some examples:

    # fixed with, proportional height
    https://firesize.com/128x/g_center/http://placekitten.com/g/32/32

    # fixed height, proportional width
    https://firesize.com/x128/g_center/http://placekitten.com/g/32/32

    # max of height or width
    https://firesize.com/128x128/http://placekitten.com/g/32/32

    # height and width, cropped to center
    https://firesize.com/128x128/g_center/http://placekitten.com/g/32/32

    # PSD with layer 0
    https://firesize.com/128x128/g_center/frame_0/http://asm-assets.s3.amazonaws.com/helpful-signup-04-24-14.psd


### Assembly made

Assembly products are like open-source and made with contributions from the community. Assembly handles the boring stuff like hosting, support, financing, legal, etc. Once the product launches we collect the revenue and split the profits amongst the contributors.

Visit [https://assemblymade.com](https://assemblymade.com) to learn more.
