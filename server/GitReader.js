"use strict";

const git = require('simple-git')

module.exports = class GitReader {

  constructor (gitProject = '') {
    this.project = gitProject;
  }

  getProject () {
    return this.project;
  }

  checkConnection (sendPosResult, sendNegResult) {
    console.log("check repo");
    git().checkIsRepo((err, isRepo) => {
      console.log("check repo2");
      if(!err){
        isRepo ? sendPosResult({"isRepo": true}) : sendNegResult();
      } else{
        console.error(`Cant check connection: ${err}`,);
        sendNegResult();
      }
    });
  }


  static checkGitConnection (gitProject) {
    if (gitProject.trim() === '') {
      console.warn("No gitproject setup. Please pass GIT_PROJECT env variable");
    } else {
      console.warn("Git Project found");
      return new GitReader(gitProject);
    }
  }
};