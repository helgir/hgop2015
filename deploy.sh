#!/bin/bash

echo Development Enviroment 
cd ./vagrant
vagrant up

echo Pushing newest
vagrant ssh -c 'docker login --username=helgir --password=$DOCKER_PASS --email=$DOCKER_EMAIL &&
				docker push helgir/tictactoe
				exit'


echo Pulling newest on Testing Machine
cd ../Testingmachine
vagrant up
vagrant ssh -c '(DOCKER=$(docker ps -q) 
				if [ ! -z "$DOCKER" ]
				then docker kill $DOCKER
			    fi && docker pull helgir/tictactoe)
				docker run -p 8080:8080 -d -e "NODE_ENV=production" helgir/tictactoe
			    '


