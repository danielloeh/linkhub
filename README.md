Linkhub - a little app for managing and accessing a list of links

## Using

It will display all the links configured in `links.json`

## Testing

* Console: `npm test` (will spawn a watcher)
* Intellij: Make sure to set your working directory to `<rootdir>/app` to pickup the right package.json and add `--env=jsdom` to the jest run parameters.

## Building Docker Images

* Build: `docker-compose build`

## Running

### With Docker Compose

* `docker-compose up [-d]`

### With NPM

* `./npm start`

* `./app/npm start`

### TODO:

- delete links
- notes
- preview
- escape + X for deleting search
- 'how to' page
- news running text
- toggle help