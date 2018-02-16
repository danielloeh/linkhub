"use strict"

const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const ConfigReader = require("./server/ConfigReader");

const util = require("util");

const PORT = 5557;

class LinkListServer {

  constructor () {
    console.log(`Running Server on port ${PORT}`);
    const app = express();

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

    LinkListServer.configureEndpoints(app);
    LinkListServer.serveApp(app);

    app.listen(PORT);
  }

  static serveApp (app) {
    const rootDir = path.resolve(path.dirname(module.uri || "."));
    app.use(express.static(rootDir + '/static'));
  }

  static configureEndpoints (app) {
    console.log(`Configure health endpoints`);
    app.get("/api/health", (req, res, next) => res.send("OK"));
    app.get("/api/config", (req, res, next) => {
      res.setHeader('content-type', 'text/javascript');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.send(new ConfigReader().getLinks())
    });

    app.post("/api/config", (req, res, next) => {

        const sendPosResult = () => {
          res.status(200)
          res.set('content-type', 'text/plain');
          res.send('OK');
        };

        const sendNegResult = () => res.status(400).json("Error");

        if (req.body !== null) {
          new ConfigReader().saveConfig(req.body, sendPosResult, sendNegResult);
        }
        else {
          sendNegResult();
        }
      }
    );
  }
}

new LinkListServer();
