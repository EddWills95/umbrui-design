FROM node:buster-slim

WORKDIR /app/designer

COPY package*.json ./

RUN npm install

COPY . . 

EXPOSE 4200

CMD [ "node", "server.js" ]

