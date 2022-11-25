const express = require('express');
const routers = express.Router();
const v1Routers = require('./v1/index');
routers.use('/v1',v1Routers);
module.exports = routers;