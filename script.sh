#!/bin/bash

cd /var/www/project #project path

# source ~/.bashrc

# export HOME=/root
# export PATH=$PATH:/root/.nvm/versions/node/v18.16.0/bin

# Ensure dependencies are installed
npm install
npm install @aws-sdk/client-ssm
# Restart or start using PM2
pm2 restart app || pm2 start app.js