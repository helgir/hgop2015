#!/bin/bash


if [ ! -f package.box ]; then
	wget https://www.dropbox.com/s/27ffx8z804fhz0u/package.box?dl=0 -O package.box
fi

vagrant up

exit 0