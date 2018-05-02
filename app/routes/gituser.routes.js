module.exports = (app) => {
  const gitusers = require('../controllers/gituser.controller.js');

  app.get('/gitusers/:userId', gitusers.getinfo);

}