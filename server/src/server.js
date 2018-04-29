"use strict"

const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const ConfigEditor = require("./ConfigEditor");
const GitReader = require("./GitReader");
const FeatureConfig = require("./FeatureConfig");
const util = require("util");

const PORT = parseInt(process.env.PORT, 10) || 8080;

const featureConfig = new FeatureConfig(process.env);

const sendPosResultBuilder = (res, payload) => {
  res.status(200);
  res.set('content-type', 'application/json');
  res.send(payload);
};

const sendNegResultBuilder = (res) => res.status(400).json("Error");

class LinkListServer {

  constructor () {
    console.log(`Running Server on port ${PORT}`);
    const app = express();

    const config_file = "links.json";
    this.configEditor = new ConfigEditor(config_file);
    this.gitReader = GitReader.createGitReader({configfile: config_file});

    app.use(function (req, res, next) {
      if (req.method === "OPTIONS") {  // send out CORS inflight response
        res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
        res.header('Access-Control-Allow-Methods', "POST, GET, OPTIONS, PUT, PATCH, DELETE");
        res.header('Access-Control-Allow-Origin', "*");
        res.header('Access-Control-Allow-Credentials', true);
        return res.sendStatus(200);
      }
      else { // Send out cors headers for all other requests
        res.header("Access-Control-Allow-Origin", "*");
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        return next();
      }
    });

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({strict: false, extended: true}));

    this.configureEndpoints(app);
    this.serveApp(app);

    app.listen(PORT);
  }

  serveApp (app) {
    const rootDir = path.resolve(path.dirname(module.uri || "."));
    app.use(express.static(rootDir + '/app/build'));
  }

  configureEndpoints (app) {
    app.get("/api/health", (req, res, next) => res.send("OK"));


    app.get("/api/git/check", (req, res) => {

      const sendPosResult = (payload) => sendPosResultBuilder(res, payload);
      const sendNegResult = () => sendNegResultBuilder(res);

      this.gitReader.checkConnectionAndReturnResult(sendPosResult, sendNegResult);
    });

    app.get("/api/config", (req, res) => {
      res.send(this.configEditor.getLinks())
    });

    app.get("/api/featureConfig", (req, res) => {
      res.send(featureConfig.getFeatureConfig())
    });

    app.post("/api/config", (req, res) => {

      const sendPosResult = (payload) => sendPosResultBuilder(res, payload);
      const sendNegResult = () => sendNegResultBuilder(res);

      if (req.body !== null && featureConfig.editEnabled) {
        this.configEditor.saveConfig(req.body, sendPosResult, sendNegResult, this.gitReader);
      }
      else {
        sendNegResult();
      }
    });

    app.post("/api/links", (req, res) => {

        const sendPosResult = (payload) => sendPosResultBuilder(res, payload);
        const sendNegResult = () => sendNegResultBuilder(res);

        if (req.body !== null && featureConfig.editEnabled) {
          this.configEditor.addLink(req.body, sendPosResult, sendNegResult, this.gitReader);
        }
        else {
          sendNegResult();
        }
      }
    );
  }
}

new LinkListServer();
