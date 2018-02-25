Linkhub - a little app for managing and accessing a list of links

## Using

It will display all the links configured in `links.json`

## Building

`docker-compose build`

## Running

### Docker Compose

`docker-compose up -d`

### NPM

`./npm start`

`./app/npm start`

## Testing

* Console: `npm test` (will spawn a watched)
* Intellij: Make sure to set your working directory to `<rootdir>/app` to pickup the right package.json and add `--env=jsdom` to the jest run parameters.

### TODO:

- delete links
- notes
- preview
- escape + X for deleting search
- how to page
- news running text
- testing