#!/bin/bash

echo Cleaning...
rm -rf ./dist
export DISPLAY=:0

echo Building app
grunt
gruntexit=$?; 
if [[ $gruntexit != 0 ]]; 
	then 
		exit $gruntexit; 
fi


cp ./Dockerfile ./dist/

cd dist
npm install --production
buildexit=$?; 
if [[ $buildexit != 0 ]]; 
	then 
		exit $buildexit; 
fi

echo Building docker image
docker build -t helgir/tictactoe .
buildexit=$?; 
if [[ $buildexit != 0 ]]; 
	then 
		exit $buildexit; 
fi

echo "Done"