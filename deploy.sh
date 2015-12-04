#!/bin/bash

echo Development Enviroment 

#echo Pushing newest
sudo service docker start
docker login --username=helgir --password=$DOCKER_PASS --email=$DOCKER_EMAIL &&
#docker push helgir/tictactoe
				
echo Pulling newest on Testing Machine

ssh vagrant@192.168.50.4 
				'
				if [ ! -z "$DOCKER" ]
				then docker kill $(DOCKER ps -q)
			    fi
			    docker pull helgir/tictactoe
				docker run -p 8080:8080 -d -e "NODE_ENV=production" helgir/tictactoe
			    ' 