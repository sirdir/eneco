#!/bin/bash

# function to install node.js
install_node() {
  # installs nvm (Node Version Manager)
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
  # Source nvm script to make it available in the current session
  export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
  # download and install Node.js
  nvm install 20
}

# Check if Node.js is installed and the version is >= 20.0
if command -v node > /dev/null 2>&1; then
  NODE_VERSION=$(node -v | grep -oE '[0-9]+\.[0-9]+\.[0-9]+')
  NODE_MAJOR_VERSION=$(echo $NODE_VERSION | cut -d. -f1)
  if [ "$NODE_MAJOR_VERSION" -ge 20 ]; then
    echo "Node.js is installed. Version: $NODE_VERSION"
  else
    echo "Node.js version is less than 20.0. Current version: $NODE_VERSION"
    echo "Installing latest Node.js 20.x LTS"
    install_node
  fi
else
  install_node
fi

# install all the dependencies
npm install

# Download new browser binaries and their system dependencies
# It will ask for the sudo password to install system dependencies (like in case of `sudo apt install libnss3`)
npx playwright install --with-deps chromium

