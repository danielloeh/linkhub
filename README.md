# Linkhub  
Linkhub is a tool for documenting and storing relevant links for a project in a central place (postgres)

Currently its behind auth0 OIDC.
Note: I'm currently migrating to postgres because of reasons

Test it on: https://linkhub-danielloeh.herokuapp.com/ (give the instance a few seconds to wake up until anything gets displayed)

[![Build Status](https://travis-ci.org/danielloeh/linkhub.svg?branch=master)](https://travis-ci.org/danielloeh/linkhub)

## Value Proposition and Vision 
Value proposition:
- Have all the relevant links available in one place
- Make it so convenient to use that its gets used as part of everyones daily routine, instead of bookmarking all the links on your local machine. Thereby it the chances of it being up to date and can be used to push out new links is as high as possible.

Vision:
- Support additional categories of information that need to be accessed on a daily basis 

## Running

You can run it via `docker-compose` as single docker image, or run them as separate FE and BE server.

- Access PGAdmin with under `http://localhost:5555/` & pgadmin4@pgadmin.org/admin. Local postgres address is: `postgres:5432` with postgres/changeme.

# Database setup:

- Manual step: Create database `linkhub`
- Creating Tables: `npm run createdb`

### Separate Servers with NPM

Runs as two different servers including a webpack router that routes requests on `localhost:3000/api` to `:8080` (default backend port), so that the frontend can send backend requests to `window.location.origin`.

````
#!/usr/bin/env bash

AUTH_SERVER_URI=my-auth-server-uri (auth0) \
AUTH_CLIENT_ID=my-client-id \
EDIT_ENABLED=true \
DATABASE_USER=postgres \
DATABASE_PASSWORD=changeme \
npm start` 
````
Starts the backend on :8080

````./app/npm start```` 
Start the frontend on :3000

Note: make sure you have $PORT not set. Changing the port only works when running it via docker.
 
### Combined as docker image with Docker Compose

Here its other way around: the backend will deliver the minified and packaged frontend as static resource on `:8080` (default) or `$PORT`.
 
 `docker-compose build`  
 
 `docker-compose up -d` 
 
### Auth 
The app is supporting an OAuth2 flow (e.g. via Auth0). You need to set the environment variables when baking the docker image:
 `AUTH_AUTH_URI`
 `AUTH_CLIENT_ID` 

### Feature Config

* Set `EDIT_ENABLED` to false to disable editing functionality.

## Development

### Testing

There are different test suites for app and server.

#### Server
* Console: `npm test` (will spawn a watcher)

#### Client
* Console: `cd app && npm test` (will spawn a watcher)
* Intellij: Make sure to set your working directory to `<rootdir>/app` to pickup the right `package.json` and add `--env=jsdom` to the jest run parameters.


## Features Planned
- A groups concept
- A page with general information 

## Deployment
Its can be easily deployed e.g. via travis to heroku. Heroku requires the app to run on $PORT though.

## Author
Daniel Löffelholz - daniel.loeffelholz@gmail.com  // dloeffel@thoughtworks.com // twitter: @davololo

## Upcoming Features
* small improvements:

-> deployed version

* add category management
** Spinner for loading times
** Deactivate non functional buttons
* customize name
* support multiple link groups 
* site preview
* [idea] useful commands
* [idea] info boxes
* [idea] glossary



