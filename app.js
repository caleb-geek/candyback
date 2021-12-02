const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const path = require('path');
const userRouter = require('./api/routes/User');
const gameRouter = require('./api/routes/Game');
const scoreRouter = require('./api/routes/Score');



// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

//Handling CORS issues
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/user',userRouter);
app.use('/api/game',gameRouter );
app.use('/api/score',scoreRouter );




module.exports = app;