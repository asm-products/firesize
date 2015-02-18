#!/bin/bash

set -e

dropdb   firesize_development
dropdb   firesize_test
createdb firesize_development
createdb firesize_test
foreman run goose up
