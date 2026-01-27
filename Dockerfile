FROM node:current-alpine3.23

WORKDIR /app

COPY . .

RUN npm i
RUN npm install mysql2

EXPOSE 5555

CMD ["node", "app.js"]
