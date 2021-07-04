const env       = process.env.NODE_ENV || 'dev';
const config    = require('./config.json')[env];

module.exports  = config;