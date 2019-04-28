'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const ConfigEditorDB = require('./ConfigEditorDB');
const FeatureConfig = require('./FeatureConfig');
const Database = require('./Database');
const auth = require('./Auth');

const PORT = parseInt(process.env.PORT, 10) || 8080;

const validateAuthToken = auth.validateAuthToken(process.env);
const validateIDToken = auth.validateIDToken(process.env);

const sendPosResultBuilder = (res, payload) => {
  res.status(200);
  res.set('content-type', 'application/json');
  res.send(payload);
};

const sendNegResultBuilder = (res) => res.status(400).json('Error');

class LinkListServer {

  constructor () {
    console.log(`Running Server on port ${PORT}`);

    const app = express();

    this.featureConfig = new FeatureConfig(process.env);
    const database = new Database(process.env);
    this.configEditorDB = new ConfigEditorDB(database);

    app.use(function (req, res, next) {
      if (req.method === 'OPTIONS') {  // send out CORS inflight response
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, IDToken');
        res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, PATCH, DELETE');
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Credentials', true);
        return res.sendStatus(200);
      } else { // Send out cors headers for all other requests
        res.header('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, IDToken');
        return next();
      }
    });

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ strict: false, extended: true }));

    this.configureEndpoints(app);
    this.serveApp(app);

    app.listen(PORT);
  }

  serveApp (app) {
    const rootDir = path.resolve(path.dirname(module.uri || '.'));
    app.use(express.static(rootDir + '/app/build/'));
  }

  configureEndpoints (app) {
    app.get('/api/health', (req, res) => res.send('OK'));

    app.get('/api/config/', validateAuthToken, validateIDToken, (req, res) => {

      const sendPosResult = (payload) => sendPosResultBuilder(res, payload);
      const sendNegResult = () => sendNegResultBuilder(res);

      console.log(req.user.name);

      this.configEditorDB.getLinks(req.user.name, sendPosResult, sendNegResult);
    });

    app.get('/api/featureConfig', (req, res) => {
      res.send(this.featureConfig.getFeatureConfig());
    });

    app.post('/api/config', validateAuthToken, validateIDToken, (req, res) => {

      console.log(req.user.name);

      const sendPosResult = (payload) => sendPosResultBuilder(res, payload);
      const sendNegResult = () => sendNegResultBuilder(res);

      if (req.body !== null && this.featureConfig.getFeatureConfig().editEnabled) {
        this.configEditorDB.saveConfig(req.user.name, req.body, sendPosResult, sendNegResult);
      } else {
        console.error(`Failed request to /api/config `);
        sendNegResult();
      }
    });

    app.post('/api/links', validateAuthToken, validateIDToken, (req, res) => {

      const sendPosResult = (payload) => sendPosResultBuilder(res, payload);
      const sendNegResult = () => sendNegResultBuilder(res);

      if (req.body !== null && this.featureConfig.getFeatureConfig().editEnabled) {
        this.configEditorDB.addLink(req.user.name, req.body, sendPosResult, sendNegResult);
      } else {
        sendNegResult();
      }
    },
    );
  }
}

new LinkListServer();
