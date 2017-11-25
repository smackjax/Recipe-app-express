var mongoJS = require('mongojs');

// Connect string from mLab
var connectUrl = process.env.DBCONNECT;
var db = mongoJS(connectUrl, ['users']);

module.exports = db;