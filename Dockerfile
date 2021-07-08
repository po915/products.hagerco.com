FROM node:8-alpine

WORKDIR /usr/src

COPY package*.json ./

RUN npm install

COPY . . 

EXPOSE 5000

CMD ["node", "server.js"]