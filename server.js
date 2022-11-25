const mongoose = require('mongoose');
require('dotenv').config()
const app = require('./index')
const PORT = process.env.PORT;
const DBNAME = process.env.DB_NAME
mongoose.connect(process.env.MONGO_URL+DBNAME,{family:4},(err)=>{
    if(err){
          console.log(err.message)
    }else{
        console.log('NODE ENVIRNMENT : ' , process.env.NODE_ENVIRNMENT)
        console.log("DataBase connected successfully!");
          app.listen(PORT,()=>{
            console.log(`Example app listening at port http://localhost:${PORT}`)
          });
    }
})

console.log()