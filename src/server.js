const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const server = express();
const config = require('config');
const authMiddleware = require('./app/middlewares/auth');
require('./utils/schedule');

if (config.get('postgres').habilitado) {
    require('./database/pgsql');
}
server.use(authMiddleware);
server.use(express.json());
server.use(cors());
server.use('/v1', routes);

module.exports = server;