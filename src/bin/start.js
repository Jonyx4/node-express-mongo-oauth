import 'dotenv/config';
import appInsights from 'applicationinsights';
import http from 'http';
import app from '../app.js';
import dbConnect from '../utils/dbConnect.js';
import logger from '../utils/logger.js';

/**
 * Setup app insights telemetry.
 */
enableTelemetry();

/**
 * Create HTTP server.
 */
app.set('port', process.env.PORT || 3000);
const server = http.createServer(app);

/**
 * Connect to mongo database
 * Listen on provided port, on all network interfaces.
 */
run();

async function run() {
  await dbConnect();
  server.listen(app.get('port'));
  server.on('error', onError);
  server.on('listening', onListening);
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  logger.info(`REST API running → PORT ${server.address().port}`);
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  // handle specific listen errors with friendly messages
  if (error.code === 'EACCES') {
    logger.error(`Port ${app.get('port')} requires elevated privileges`);
    process.exit(1);
  } else if (error.code === 'EADDRINUSE') {
    logger.error(`Port ${app.get('port')} is already in use`);
    process.exit(1);
  } else {
    throw error;
  }
}

function enableTelemetry() {
  if (process.env.APPINSIGHTS_INSTRUMENTATIONKEY) {
    appInsights.setup(process.env.APPINSIGHTS_INSTRUMENTATIONKEY);
    appInsights.defaultClient.setAutoPopulateAzureProperties(true);
    appInsights.start();
    logger.info(`App Insights enabled, sending telemetry...`);
  } else {
    logger.info(`App Insights disabled, instrumentation key not provided`);
  }
}
