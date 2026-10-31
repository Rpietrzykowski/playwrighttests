#!/usr/bin/env bash
#enviroment
env=$1

#Cucumber tag
tag=$2

export COMMON_CONFIG_FILE=env/common.env
export NODE_ENV=$env

#fall back to corepack when yarn is not on PATH
command -v yarn >/dev/null || yarn() { COREPACK_ENABLE_DOWNLOAD_PROMPT=0 corepack yarn "$@"; }

#run cucumber tests & on failure run postcucumber
yarn run cucumber:$env --profile $tag
rc=$?
if [ $rc -ne 0 ]; then yarn run postcucumber; fi
exit $rc