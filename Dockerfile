FROM node:9.7.1

## SSH SETUP
# We want to establish a connection between the local repository inside of the docker container and the remote repo in
# in which the data is supposed to be saved. Therefore we need to pass in the private key which needs to match the public key stored in the repo.
# We also need to add the host to the trusted connections -  that should be automated in the future through getting the url from the remote repo.ADD

WORKDIR /usr/src/app

## GIT SETUP

RUN apt-get -y remove binutils

# Update old git in debian jessie for 'get-url' support
RUN echo "deb http://ftp.us.debian.org/debian testing main contrib non-free" >> /etc/apt/sources.list \
         &&      apt-get update              \
         &&      apt-get install -y git      \
         &&      apt-get clean all

# Settings up access token
RUN mkdir -p /root/.ssh
ARG SSH_PRIVATE_KEY
RUN (if [ -n "$SSH_PRIVATE_KEY" ]; then set -uex && echo ${SSH_PRIVATE_KEY} > /root/.ssh/id_rsa; fi)
RUN (if [ -f "/root/.ssh/id_rsa" ]; then chmod 700 /root/.ssh/id_rsa; fi)

# Create known_hosts and add remote repos' key
RUN touch /root/.ssh/known_hosts
# Get remote URL
RUN export GIT_HOST=`git remote -v get-url origin`
# Strip username and folders from host
RUN export GIT_HOST=`echo $GIT_HOST | cut -d'@' -f2 | cut -d':' -f1`
# Export the SSH key to the known host
RUN (if [ -n "$GIT_HOST" ]; then ssh-keyscan ${GIT_HOST} >> /root/.ssh/known_hosts; fi)

# Identifying to git
RUN git config --global user.email "linkhub-app@link.hub"
RUN git config --global user.name "linkhub-app"

## APP SETUP

COPY package*.json ./

COPY . .

RUN npm install

RUN cd ./app && npm install

RUN cd ./app && npm run build

EXPOSE 8080

CMD [ "npm", "start" ]