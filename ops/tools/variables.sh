#!/bin/bash
set -e

export PACKAGE_NAME=${SERVICE_NAME:-$(cat ../../package.json  | grep name | head -1 | sed 's/"name"://' | sed 's/[",]//g'| tr -d '[[:space:]]')}
export PACKAGE_VERSION=$(cat ../../package.json | grep version | head -1 | awk -F= "{ print $2 }" | sed 's/[version:,\",]//g' | tr -d '[[:space:]]')
export ECR=258761795085.dkr.ecr.eu-central-1.amazonaws.com/$PACKAGE_NAME

echo "PACKAGE_NAME > $PACKAGE_NAME"
echo "PACKAGE_VERSION > $PACKAGE_VERSION"
echo "ECR > $ECR"
