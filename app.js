const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser')
const csrf = require('csurf');
const admin = require("firebase-admin");
const http = require('http');
const credentials = require("./serviceAccountKey.json");
const csrfMiddleware = csrf({ cookie: true })
const indexRouter = require('./routes/index');
//const apiRouter = require('./routes/api');


const debug = require('debug')('987san:server');
const port = normalizePort(process.env.PORT || '5000');
const app = express();

//const adminRouter = require('./routes/admin');
const adminRouter = require('./routes/admin.router');

// app.use('/admin', express.static('./node_modules/admin-lte'));


//Перенос www

app.set('port', port);

var server = http.createServer(app);

server.listen(port, () =>{
  console.log(`Server is running on PORT ${port}`)
  console.log(`Your local site: http://localhost:${port}/\n`)
});
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(credentials)
});
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use('/admin', adminRouter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(csrfMiddleware);
app.use(logger('dev'));
app.use('/', indexRouter);
//app.use('/api', apiRouter);
app.use('/admin', adminRouter);

app.use(function(req, res, next) {
  next(createError(404));
});
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.use(csrf({cookie: true}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(csrf());
app.use(function (req, res, next) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.locals.csrftoken = req.csrfToken();
  next();
});
app.use(csrfMiddleware);

module.exports = app;
