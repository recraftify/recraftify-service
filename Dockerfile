FROM node:16.14

WORKDIR /app

ENV PORT 8080

COPY package*.json ./

RUN npm install

COPY . .

USER node

CMD ["npm","start"]

EXPOSE 8080
