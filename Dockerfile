FROM node:trixie-slim

WORKDIR /app

COPY . .

RUN npm i

EXPOSE 8080

CMD ["node", "app.js"]
