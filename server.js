const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/devconfig.js');
const mongoose = require('mongoose');


//create express app
const app = express();

//parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true}))

//parse request of content-type - application/json
app.use(bodyParser.json())

mongoose.Promise = global.Promise;

//connecting to database
mongoose.connect(config.mongo_url)
  .then(() => {
  console.log("Successfully connected to database");
  }).catch(err => {
    console.log('Could not connect to database' + err.message);
    process.exit();
})

// define a simple route
app.get('/', (req, res) => {
  res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

// Require Notes routes
require('./app/routes/note.routes.js')(app);
// Require GitUser routes
require('./app/routes/gituser.routes.js')(app);

app.listen(3000, () => {
  console.log("Server is listening on port 3000")
})