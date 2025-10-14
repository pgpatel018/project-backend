FROM 489087763405.dkr.ecr.us-east-1.amazonaws.com/dc-project:latest

WORKDIR /app

COPY . .

RUN npm i
RUN npm install mysql2

EXPOSE 8080

CMD ["node", "app.js"]
