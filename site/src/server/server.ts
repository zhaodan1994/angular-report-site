import {debug} from 'debug';
import * as http from 'http';
import { AddressInfo } from 'net';
import { app } from './app';


/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string): number | false {
  const portValue = parseInt(val, 10);

  if ((!isNaN(portValue)) && portValue >= 0) {
    // port number
    return portValue;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error:  NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = 'Port ' + port;

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

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening(): void {
  const addr = server.address();
  const bind ='port ' + (addr as AddressInfo).port;
  debug('Listening on ' + bind);
}
