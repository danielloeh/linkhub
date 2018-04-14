# Linkhub  
A little app for managing and accessing a list of links. It will display all the links configured in `links.json` and has the optional
functionality of persisting the file into a remote git repository with little setup.

Test it on: https://linkhub-danielloeh.herokuapp.com/

[![Build Status](https://travis-ci.org/danielloeh/linkhub.svg?branch=master)](https://travis-ci.org/danielloeh/linkhub)

## Running

You can run it via `docker-compose` as single docker image, or run them as separate FE and BE server.

### Separate Servers with NPM

Runs as two different servers including a router that routes requests on `localhost:3000/api` to `:8080` (default backend port), so that the frontend can send backend requests to `window.location.origin`.

`./npm start` - Starts the backend on :8080 (or on $PORT)

`./app/npm start` : - Start the frontend on :3000
 
### Combined as docker image with Docker Compose

Here its other way around: the backend will deliver the minified and packaged frontend as static resource on `:8080`.
 
 `docker-compose build`  
 
 `docker-compose up -d` 

## Testing
There are different test suites for app and server.

### Server
* Console: `npm test` (will spawn a watcher)

### Client
* Console: `cd app && npm test` (will spawn a watcher)
* Intellij: Make sure to set your working directory to `<rootdir>/app` to pickup the right `package.json` and add `--env=jsdom` to the jest run parameters.

## Persisting in git

The backend is using the remote repository of this folder to persist the `links.json`. This is optional - in order to activate it you have to:

1. Make sure your origin/master of this repo uses ssh (not https) (e.g. `git@github.com:danielloeh/linkhub.git`)
2. Have a public key added to your git remote repository.
3. Provide the matching private key (no password) as ENV variable in `SSH_PRIVATE_KEY` and `GIT_HOST` for authentification during the docker build.

Voilà - a simple persisting solution without further setup. For security reasons, I recommend to create a special user for this, which has only access to the the linkhub repository.

## Known Issues   
- The checkbox "save to git" has currently no function

## Deployment
Its can be easily deployed e.g. via travis to heroku. Heroku requires the app to run on $PORT though.

## Author
Daniel Löffelholz - daniel.loeffelholz@gmail.com  // dloeffel@thoughtworks.com // twitter: @davololo
