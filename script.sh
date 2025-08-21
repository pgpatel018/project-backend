#!/bin/bash

cd /var/www/project #project path

# source ~/.bashrc

# export HOME=/root
# export PATH=$PATH:/root/.nvm/versions/node/v18.16.0/bin

# Ensure dependencies are installed
npm install

# Restart or start using PM2
pm2 start app.js