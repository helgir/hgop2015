echo 'Starting jenkins commit'

export PATH=/usr/local/bin:/path/to/node:/path/to/node_bin:/path/to/phantomjs:/path/to/jscoverage:$PATH;
export DISPLAY=:0

npm install
bower install

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