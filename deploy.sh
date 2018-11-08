#!/bin/bash

BUILD=${1:-testing}

rm -rf /PATH/TO/${BUILD}/DIST

tar -xzf package.tgz
rm package.tgz

mv -f archive/* /PATH/TO/${BUILD}/DIST
rm -rf archive

