FROM node:trixie-slim

WORKDIR /app

COPY . .

RUN npm i
RUN npm install mysql2

EXPOSE 80

CMD ["node", "app.js"]
