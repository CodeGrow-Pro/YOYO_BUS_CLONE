const express = require('express');
const bodyParser = require('body-parser');
const routers = require('./routes/api/index')
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.get('/',(req,res)=>{
    return res.status(200).send("<hr><h1 style='padding:250px'>Welcome To YOYO BUS Service</h1><hr>");
})
app.use('/yoyo-bus/api/',routers);
module.exports = app;