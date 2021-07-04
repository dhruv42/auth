const express = require('express');
const app = express();
const config = require('./config/config');
require('./config/connect-database');
const routes = require('./routes');

const NodeCache = require("node-cache");
global.__loggedOutTokens = new NodeCache();

app.use(express.json());
app.use('/api',routes);

app.listen(config.port,() => {
    console.log(`======== server is running on port ${config.port} ========`);
})

module.exports = app;