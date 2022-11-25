const  express = require('express');
const busTicketController = require('../../../controller/busTicketDetails.controller') 
const router = express.Router();
//------------------------------create Ticket or Booked Ticket---------------
router.post('/ticket/booking',busTicketController.CreateBusTicket);
//------------------------------Put method or Update Ticket -----------------------
router.put('/ticket/update',busTicketController.updateTicket);
//------------------------------Get Ticket or Find Ticket -------------------------
router.get('/tickets',busTicketController.getAllticketAndTicketno)
//------------------------------Delete Ticket --------------------------------------
router.delete('/ticket/delete',busTicketController.deleteTicket);
module.exports = router