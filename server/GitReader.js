"use strict";

const git = require('simple-git')();

module.exports = class GitReader {

  constructor (username, password, configfile) {
    this.username = username;
    this.password = password;
    this.configfile = configfile;
    this.connected = false;
    this.upToDate = false;
  }

  checkConnection (sendPosResult, sendNegResult) {
    git.checkIsRepo((err, isRepo) => {
      if (!err && isRepo) {
        git.listRemote(['-q', '--refs'], (err, result) => {
          if (result) {
            console.log(`Connection to remote git established`);
            this.connected = true;
            this.checkRevisionAndSendResult(sendPosResult, sendNegResult);
          } else {
            sendPosResult({"connected": false, "remoteUrl": "some-url", "upToDate": false});
          }
        });
      } else {
        console.error(`Could not check if its a git repo ${err}`);
        sendNegResult();
      }
    });
  }

  commitConfig (sendPosResult, sendNegResult, config) {
    if (this.connected && this.upToDate) {
      git.silent(true)
        .add([this.configfile])
        .commit([`"Updating ${this.configfile}"`])
        .push([])
        .then(() => {
          console.log(`Commit of  ${this.configfile} successful.`);
          sendPosResult(config);
        })
        .catch((err) => {
          console.error('Git commit: ', err);
          sendNegResult();
        });
    } else {
      console.log(`Not connected (${this.connected}) or not uptodate (${this.upToDate}). Not committing.`);
      sendPosResult(config);
    }
  };

  checkRevisionAndSendResult (sendPosResult, sendNegResult) {
    git.log(["origin/master", "-1", '--pretty=format:"%h"'], (err, masterResult) => {
        git.log(["-1", '--pretty=format:"%h"'], (err, localResult) => {
          if (!err) {
            if (localResult.latest.hash === masterResult.latest.hash) {
              this.upToDate = true;
              console.log(`Git: local has same revision as origin/master ${masterResult.latest.hash}`);
              sendPosResult({"connected": true, "remoteUrl": "some-url", "upToDate": true});
            } else {
              console.log(`Git: local has a different version as origin/master ${localResult.latest.hash}/${masterResult.latest.hash}`);
              sendPosResult({"connected": true, "remoteUrl": "some-url", "upToDate": false});
            }
          } else {
            console.error(`Git: Couldnt get versions with git log: ${err}`);
            sendNegResult();
          }
        })
      }
    );
  }

  static createGitReader ({username = '', password = '', configfile = ''}) {
    if (username.trim() === '' || password.trim() === '') {
      console.warn("No GIT credentials found.");
    }
    return new GitReader(username, password, configfile);
  }
};