#!/bin/bash

BLUE="\033[0;34m"
RED="\033[0;31m"
NC="\033[0m" # No Color
defaultPackageName="@etclabscore\/pristine-typescript"

echo ""
echo "💎  Welcome Pristine Typescript Post-Install setup! 💎"
echo ""
echo ""

echo -e "${BLUE}Enter the Package Name that will be used for the package.json:${NC}"

read packageName

echo ""

function replaceTextInFile() {
  # using ~ in place of / to avoid slashes in package names conflicting with sed
  if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i  "" -e "s~$1~$2~g" $3
  else
    sed -i  -e "s~$1~$2~g" $3
  fi
}
replaceTextInFile $defaultPackageName $packageName package.json

echo -e "${BLUE} 🚀  Project Setup Completed. 🚀"

echo ""
