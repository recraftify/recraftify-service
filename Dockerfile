FROM node:16.4

WORKDIR /app

COPY package*.json ./

RUN ndoe

COPY . .

CMD ["start"]

EXPOSE 8080