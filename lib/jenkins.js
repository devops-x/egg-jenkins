'use strict';

const path = require('path');
const Jenkins = require('jenkins');

module.exports = app => {
  const config = app.config.jenkins;

  app.jenkinsClient = Jenkins({
    baseUrl: `http://${config.user}:${config.password}@${config.host}:${config.port}`
  });

  app.beforeStart(async () => {
    loadModelToApp(app);
  });
};

function loadModelToApp(app) {
  const dir = path.join(app.config.baseDir, 'app/jenkins');
  app.loader.loadToApp(dir, 'jenkins', {
    inject: app,
    caseStyle: 'upper',
  });
}