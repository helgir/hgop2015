
#!/bin/bash
echo connecting to testing machine
ssh vagrant@192.168.50.4 '
	echo Killing dock if running
	if [ ! -z $(docker ps -q) ]
		then
		docker KILL $(docker ps -q)
		exitcode=$?
		if [ $exitcode != 0 ]; then
			echo Docker pull failed.
			exit $exitcode
		fi
	fi
	echo Pulling from docker hub
	docker pull helgir/tictactoe
	exitcode=$?
	if [ $exitcode != 0 ]; then
		echo Docker pull failed.
		exit $exitcode
	fi
	echo Running new dock
	docker run -p 8080:8080 -d -e "NODE_ENV=production" helgir/tictactoe
	exitcode=$?'
echo 'Finished Deployment'