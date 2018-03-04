FROM node:9.7.1

## SSH SETUP

# Settings up access token
RUN mkdir -p /root/.ssh
ARG SSH_PRIVATE_KEY
RUN set -uex; \
    echo ${SSH_PRIVATE_KEY} > /root/.ssh/id_rsa;
RUN chmod 700 /root/.ssh/id_rsa

# Create known_hosts and add remote repos' key
RUN touch /root/.ssh/known_hosts
ARG GIT_HOST
RUN ssh-keyscan ${GIT_HOST} >> /root/.ssh/known_hosts

## GIT SETUP

# Update old git in debian jessie
RUN echo "deb http://ftp.us.debian.org/debian testing main contrib non-free" >> /etc/apt/sources.list \
         &&      apt-get update              \
         &&      apt-get install -y git      \
         &&      apt-get clean all

# Identifying to git
RUN git config --global user.email "linkhub-app@link.hub"
RUN git config --global user.name "linkhub-app"

## APP SETUP

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install

RUN cd ./app && npm install

RUN cd ./app && npm run build

EXPOSE 8080

CMD [ "npm", "start" ]