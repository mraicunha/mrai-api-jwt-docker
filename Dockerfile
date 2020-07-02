FROM node:12-alpine

WORKDIR /opt/mrai-api-jwt-docker

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm","start"]
