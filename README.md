### Linkhub  
a little app for managing and accessing a list of links. It will display all the links configured in `links.json`

## Running

You can run it via `docker-compose` as single docker image, or run them as separate FE and BE server.

### Separate Servers with NPM

Runs as two different servers including a router that routes requests on `localhost:3000/api` to `:8080` (backend), so that the frontend can send backend requests to `window.location.origin`.

`./npm start` - Starts the backend on :8080

`./app/npm start` : - Start the frontend on :3000
 
 ### Combined as docker image with Docker Compose

Here its other way around: the backend will deliver the minified and packaged frontend as static resource on `:8080`.
 
 `docker-compose build`  
 
 `docker-compose up -d` 

## Testing

* Console: `npm test` (will spawn a watcher)
* Intellij: Make sure to set your working directory to `<rootdir>/app` to pickup the right package.json and add `--env=jsdom` to the jest run parameters.

### TODO:

- delete links
- notes
- preview
- how to page
- news running text (gh integration)
- toggle help
   
- disable save button until callback successful
        
- news page