"use strict";

module.exports = class GitReader {

  constructor (gitProject = '') {
    this.project = gitProject;
  }

  getProject () {
    return this.project;
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