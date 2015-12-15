#!/bin/bash
echo 'Starting jenkins commit'

export PATH=/usr/local/bin:$PATH
export DISPLAY=:0

echo 'Starting npm install'
npm install
echo 'Starting bower install'
bower install
echo 'Starting dockerbuild'
./dockerbuild.sh
exitcode=$?
if [ $exitcode != 0 ]; then
exit $exitcode
fi

echo 'Logging in to docker'
docker login --username=helgir --password=$DOCKER_PASS --email=$DOCKER_EMAIL &&
exitcode=$?
if [ $exitcode != 0 ]; then
echo Docker login failed.
exit $exitcode
fi
echo 'Pushing to docker'
docker push helgir/tictactoe
exitcode=$?
if [ $exitcode != 0 ]; then
echo Docker push failed.
exit $exitcode
fi