"use strict"

const http = require("http");
const express = require("express");
const fs = require("fs");
const path = require("path");
const ConfigReader = require("./server/ConfigReader");

const PORT = 5557;

class LinkListServer {

  constructor () {
    const app = express();

    LinkListServer.configureEndpoints(app);
    LinkListServer.serveApp(app);

    console.log(`Running Server on port ${PORT}`);
    const server = http.createServer(app);
    server.listen(PORT);
  }

  static serveApp (app) {
    const rootDir = path.resolve(path.dirname(module.uri || "."));
    app.use(express.static(rootDir + '/static'));
  }

  static configureEndpoints (app) {
    console.log(`Configure health endpoints`);
    app.get("/api/health", (req, res) => res.send("OK"));
    app.get("/api/config", (req, res) => {
      res.setHeader('content-type', 'text/javascript');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.send(new ConfigReader().getLinks())
    });

    app.post("/api/config", (req, res) => {
      console.log("save" + JSON.stringify(req))
      res.send(new ConfigReader().getLinks())
    });
  }
}

new LinkListServer();
