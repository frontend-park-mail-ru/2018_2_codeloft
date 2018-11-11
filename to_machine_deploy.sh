#!/bin/bash

mv src/static dist

tar -czf package.tgz dist

export SSHPASS=$DEPLOY_PASS
sshpass -e scp -o StrictHostKeychecking=no package.tgz $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH
sshpass -e ssh -o StrictHostKeychecking=no $DEPLOY_USER@$DEPLOY_HOST "cd $DEPLOY_PATH && ./$1.deploy.sh"
