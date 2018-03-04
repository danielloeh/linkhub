FROM node:9.7.1

# Settings up access token
RUN mkdir -p /root/.ssh
ARG SSH_PRIVATE_KEY
RUN set -uex; \
    echo ${SSH_PRIVATE_KEY} > /root/.ssh/id_rsa;
RUN chmod 700 /root/.ssh/id_rsa

# Create known_hosts
RUN touch /root/.ssh/known_hosts

# Update old git in debian jessie
RUN echo "deb http://ftp.us.debian.org/debian testing main contrib non-free" >> /etc/apt/sources.list \
         &&      apt-get update              \
         &&      apt-get install -y git      \
         &&      apt-get clean all

# Identifying to git
RUN git config --global user.email "linkhub-app@link.hub"
RUN git config --global user.name "linkhub-app"

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install

RUN cd ./app && npm install

RUN cd ./app && npm run build

EXPOSE 8080

CMD [ "npm", "start" ]