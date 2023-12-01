set tag=%1

set COMMON_CONFIG_FILE=env/common.env

npm run cucumber -- --profile %tag% || npm run postcucumber