FROM alpine:3.22
ENV NODE_VERSION 22.19.0

WORKDIR /app

COPY . .

RUN npm i

EXPOSE 8080

CMD ["node", "app.js"]
