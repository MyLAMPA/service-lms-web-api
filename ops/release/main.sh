#!/bin/bash
set -e

source ../tools/variables.sh

cd ../..
docker build \
    -t $ECR:$PACKAGE_VERSION \
    .
# --build-arg NPM_TOKEN=${NPM_TOKEN} \

$(aws ecr get-login --region eu-central-1 | sed -e 's/-e none//g')

docker push $ECR:$PACKAGE_VERSION

#echo "export PACKAGE_VERSION=$PACKAGE_VERSION" >> ops/cd/build.variables
#echo "export SERVICE_NAME=$SERVICE_NAME" >> ops/cd/build.variables
