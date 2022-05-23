require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var app = express();
const PORT = 3305;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/api', indexRouter); 
app.use('/users', usersRouter);
// app.use('/user', userRoutes);

app.listen(PORT, (error) =>{
   if(!error)
       console.log(`Server is Running Successfully at http://localhost:${PORT}`)
   else 
       console.log("Error occurred, server can't start", error);
   }
);

module.exports = app;
