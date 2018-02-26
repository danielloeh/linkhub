FROM node:carbon

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install

RUN cd ./app && npm install

RUN cd ./app && npm run build

EXPOSE 8080

CMD [ "npm", "start" ]