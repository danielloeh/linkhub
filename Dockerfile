FROM node:11.12.0-alpine

## SSH SETUP
# We want to establish a connection between the local repository inside of the docker container and the remote repo in
# in which the data is supposed to be saved. Therefore we need to pass in the private key which needs to match the public key stored in the repo.
# We also need to add the host to the trusted connections.

WORKDIR /usr/src/app

## APP SETUP

COPY package*.json ./

COPY . .

RUN npm install

RUN cd ./app && npm install

RUN cd ./app && npm run build

EXPOSE 8080

CMD [ "npm", "start" ]