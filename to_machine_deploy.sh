#!/bin/bash

# BUILD=${1:-testing}

mkdir ~/archive

mv dist/* ~/archive

tar -czf ~/package.tgz ~/archive

stat --printf="%s" ~/package.tgz

export SSHPASS=$DEPLOY_PASS
sshpass -e scp -o StrictHostKeychecking=no ~/package.tgz travis@$codeloft.ru:/home/travis/Deploy 
sshpass -e ssh -o StrictHostKeychecking=no travis@$codeloft.ru "cd /home/travis/Deploy && ./deploy.sh"

