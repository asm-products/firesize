# Firesize

## Imagemagick as a Service

Processes images on the fly using imagemagick.

![Travis Status](https://travis-ci.org/asm-products/firesize.svg)

## Get started

Make sure Postgres, Nodejs and npm are installed.

    # Create a local development database
    psql -c "create database firesize_development"

    # Install goose for running migrations
    go get bitbucket.org/liamstask/goose/cmd/goose

    # Install gin for live reloading codes
    go get github.com/codegangsta/gin

    # Copy sample env file
    cp .env.sample .env

    # Run database migrations
    forego run goose up

    # Start up webpack to build the assets
    npm install && npm run watch

    # Start up the server
    gin

Open up http://localhost:3000/

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
