const busTicketModel = require('../models/ticketDetails.model');
const constant = require('../constant/Ticketconstant')
const converter = require('../ObjectConverter/singleTicketObj')
exports.CreateBusTicket = async (req,res)=>{
    const tciketObj = {
        status:constant.TicketStatus.confirm,
    }
      const ticketId = await busTicketModel.find().count()+1 | 1;
    if(ticketId>40){
        return res.status(400).send({
            message:"Seat not Available Please try after some time !",
            success:false
        })
    }
    tciketObj.ticketNo  = ticketId;
    console.log(tciketObj,req.body.source, req.body.destination)
    if(!req.body.source || !req.body.destination || !req.body.user){
        return res.status(404).send({
            message:"Source And Destination or user Not Found!",
            success:false
        })
    }
    tciketObj.source = req.body.source;
    tciketObj.destination = req.body.destination;
    tciketObj.userDetails = req.body.user;
 
    try{
              const ticketData = await busTicketModel.create(tciketObj);
              return res.status(201).send({
                message:"You ticket Booked Successfully !",
                success:true,
                ticketSummary:converter.singleObjectConvert(ticketData)
              })
    }catch(err){
        console.log(err);
        return res.status(500).send({
            message:"Something Want Wrong!",
            success:false
        });
    }
}

exports.getAllticketAndTicketno = async (req,res)=>{
       const find = {};
       if(req.query.ticketNo){
        find.ticketNo = req.query.ticketNo
       }
       try{
               const tickets = await busTicketModel.find(find);
               return res.status(200).send({
                message:"fetch ticket Successfully!",
                success:true,
                TicketSummary:converter.multiTicketconverter(tickets)
               });
       }catch(err){
        console.log(err);
        return res.status(500).send({
            message:"Something Want Wrong!",
            success:false
        });
    }
}

exports.updateTicket = async (req,res)=>{
    if(!req.body.ticketNo){
        return res.status(404).send({
            message:"Ticket Number Not Found!",
            success:false
        });
    }
    const updateObj= {
        source : req.body.source,
        destination : req.body.destination,
        status:constant.TicketStatus[req.body.status],
        userDetails:req.body.user
    };
    try{
                const updated = await busTicketModel.findOneAndUpdate({ticketNo : req.body.ticketNo},updateObj);
                return res.status(201).send({
                    message:"Ticket Update successfully!",
                    success:true,
                    BeforeUpdate:converter.singleObjectConvert(updated)
                });
    }catch(err){
        return res.status(500).send({
            message:"Something Want wrong !",
            success:false
        });
    }
      
}

exports.deleteTicket = async (req,res)=>{
    const status = req.body.status
    if(!req.body.ticketNo){
        return res.status(404).send({
            message:"Ticket Number Not Found!",
            success:false
        });
    }
    if(!status){
        return res.status(404).send({
            message:"status Not Found!",
            success:false
        });
    }
    if(constant.TicketStatus[status]==constant.TicketStatus.pending || constant.TicketStatus[status]==constant.TicketStatus.confirm){
        return res.status(301).send({
            message:"Status either cancel or completed than delete !",
            success:false
        });
    }
    try{
        const deleted = await  busTicketModel.findOneAndDelete({ticketNo:req.body.ticketNo , status: constant.TicketStatus[status] }).exec()
        console.log(deleted)
        return res.status(201).send({
            message:"Ticket deleted successfully!",
            success:true,
            BeforeDeleteSummary:converter.singleObjectConvert(deleted),
            NOW: 'Deleted'
        });
}catch(err){
    console.log(err.message)
        return res.status(500).send({
            message:"Something Want wrong !",
            success:false
        });
    }
}