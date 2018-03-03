"use strict";

const git = require('simple-git')();

module.exports = class GitReader {

  constructor (username, password) {
    this.username = username;
    this.password = password;
  }

  checkConnection (sendPosResult, sendNegResult) {
    git.checkIsRepo((err, isRepo) => {
      if (!err && isRepo) {
        git.listRemote(['-q', '--refs'], (err, result) => {
          if (result) {
            console.log(`Connection to remote git established`);
            sendPosResult({"connected": true, "remoteUrl": "some-url"});
          } else {
            sendPosResult({"connected": false, "remoteUrl": "some-url"});
          }
        });
      } else {
        console.error(`Could not check if its a git repo ${err}`);
        sendNegResult();
      }
    });
  }

  static createGitReader ({username = '', password = ''}) {
    if (username.trim() === '' || password.trim() === '') {
      console.warn("No GIT credentials found.");
    }
    return new GitReader(username, password);
  }
};