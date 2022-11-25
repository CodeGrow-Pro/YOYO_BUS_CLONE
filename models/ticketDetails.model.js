const mongoose = require('mongoose');
const BusTicketDetailsSchema = new mongoose.Schema({
    status : {
        type : String,
        default:'PENDING'
    },
    ticketNo : {
      type:Number,
      unique:true,
      sparse:true,
      min : 1,
      max : 40,
      require:true
    },
    userDetails : {
        name:{
            type:String,
        },
        age:{
            type:Number
        },
        phoneNo:{
            type:Number,
            unique:true
        }
    },
    source:{
        type:String
    },
    destination:{
         type:String
    },
    createdAt:{
        type:String,
        immutable:true,
        default:()=>{
            return Date.now();
        }
    },
    updatedAt:{
        type:String,
        default:()=>{
            return Date.now();
        }
    }


});
 const BusTicketModel = mongoose.model('BusTicketDetails0',BusTicketDetailsSchema)
 module.exports = BusTicketModel;