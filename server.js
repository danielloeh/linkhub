"use strict"

const http = require("http");
const express = require("express");
const fs = require("fs");
const path = require("path");

const PORT = 5557;

class LinkListServer {

  constructor() {
    const app = express();

    LinkListServer.configureEndpoints(app);
    LinkListServer.serveApp(app);

    console.log(`Running Server on port ${PORT}`);
    const server = http.createServer(app);
    server.listen(PORT);
  }

  static serveApp(app) {
    const rootDir = path.resolve(path.dirname(module.uri || "."));
    app.use(express.static(rootDir + '/app/dist'));
  }

  static configureEndpoints(app) {
    console.log(`Configure health endpoints`);
    app.get("/health", (req, res) => res.send("OK"));
  }
}

new LinkListServer();
