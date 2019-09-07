#!/bin/bash
set -e

source ../tools/variables.sh

docker build \
#    --build-arg NPM_TOKEN=${NPM_TOKEN} \
    -t $ECR:$PACKAGE_VERSION \
    .

$(aws ecr get-login --region eu-central-1 | sed -e 's/-e none//g')

docker push $ECR:$PACKAGE_VERSION

#echo "export PACKAGE_VERSION=$PACKAGE_VERSION" >> ops/cd/build.variables
#echo "export SERVICE_NAME=$SERVICE_NAME" >> ops/cd/build.variables
