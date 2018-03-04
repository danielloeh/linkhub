"use strict";

const git = require('simple-git/promise')();

module.exports = class GitReader {

  constructor (configfile) {
    this.configfile = configfile;
    this.remoteUrl = '';
    this.connected = false;
    this.upToDate = false;

    this.checkConnection();
  }

  checkConnectionAndReturnResult (sendPosResult, sendNegResult) {
    git.checkIsRepo().then(() => {
      return git.remote(["-v", "get-url", "origin"]);
    }).then((url) => {
      this.remoteUrl = url;
      return git.listRemote(['-q', '--refs']);
    }).then((remoteLists) => {
      if (remoteLists) {
        this.connected = true;
        this.checkRevisionAndSendResult(sendPosResult, sendNegResult);
      } else {
        sendPosResult({"connected": false, "remoteUrl": this.remoteUrl, "upToDate": false});
      }
    }).catch((err) => {
      console.warn(`Error when accessing git: ${err}`);
      sendPosResult({"connected": false, "remoteUrl": this.remoteUrl, "upToDate": false});
    })
  }

  checkConnection () {
    git.checkIsRepo().then(isRepo => {
      if (isRepo) {
        git.listRemote(['-q', '--refs'])
          .then(result => {
            if (result) {
              console.log(`Connection to remote git established`);
              this.connected = true;
              git.log(["origin/master", "-1", '--pretty=format:"%h"'])
                .then((masterResult) => {
                    git.log(["-1", '--pretty=format:"%h"'])
                      .then((localResult) => {
                        if (localResult.latest.hash === masterResult.latest.hash) {
                          console.log(`Git: local has same revision as origin/master ${masterResult.latest.hash}`);
                          this.upToDate = true;
                        } else {
                          console.log(`Git: local has a different version as origin/master ${localResult.latest.hash}/${masterResult.latest.hash}`);
                          this.upToDate = false;
                        }
                      })
                  }
                );
            }
          }).catch(err => {
          this.connected = false;
          console.warn(`Can't connect to git: ${err}`);
        });
      }
    })
  }

  commitConfig (sendPosResult, sendNegResult, config) {
    if (this.connected && this.upToDate) {
      console.log("committing");
      git.add(this.configfile)
        .then(() => git.commit(`"Updating ${this.configfile}"`))
        .then(() => git.push(['origin', 'master']))
        .then(() => {
          console.log(`Commit of  ${this.configfile} successful.`);
          sendPosResult({config: config, persistedInGit: true});
        }).catch(err => {
        console.error(`Cant commit: ${err}`);
        sendPosResult({config: config, persistedInGit: false});
      });
    } else {
      console.log(`Not connected (${this.connected}) or not uptodate (${this.upToDate}). Not committing.`);
      sendPosResult({config: config, persistedInGit: false});
    }
  };

  checkRevisionAndSendResult (sendPosResult, sendNegResult) {
    let masterResultLet;

    git.log(["origin/master", "-1", '--pretty=format:"%h"'])
      .then((masterResult) => {
        masterResultLet = masterResult;
        return git.log(["-1", '--pretty=format:"%h"'])
          .then((localResult) => {
            if (localResult.latest.hash === masterResult.latest.hash) {
              this.upToDate = true;
              sendPosResult({"connected": true, "remoteUrl": this.remoteUrl, "upToDate": true});
            } else {
              sendPosResult({"connected": true, "remoteUrl": this.remoteUrl, "upToDate": false});
            }
          }).catch((err) => {
            console.error(`Git: Couldnt get versions with git log: ${err}`);
            sendNegResult();
          });
      }).catch((err) => {
      console.error(`Git: Couldnt get versions with git log: ${err}`);
      sendNegResult();
    });
  }

  static createGitReader ({configfile = ''}) {
    return new GitReader(configfile);
  }
};