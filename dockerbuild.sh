#!/bin/bash

echo Cleaning...
rm -rf ./dist
echo Building app
grunt
EXITC=$?; if [[ $EXITC != 0 ]]; then exit $EXITC; fi
cp ./Dockerfile ./dist/
cd dist
npm install --production
echo Building docker image
docker build -t helgir/tictactoe .
EXITC=$?; if [[ $EXITC != 0 ]]; then exit $EXITC; fi
echo "Done"


