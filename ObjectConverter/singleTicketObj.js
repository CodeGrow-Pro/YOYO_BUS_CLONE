exports.singleObjectConvert = (ticket)=>{
    let dates = new Date(parseInt(ticket.createdAt));
    dates = String(dates).split('T')
    const send  = {
        TicketNo : ticket.ticketNo,
        BookingDate:dates[0],
        Source:ticket.source,
        Destinetion:ticket.destination,
        Status:ticket.status,
        userDetails : ticket.userDetails
    }
    return send;
}
exports.multiTicketconverter = (tickets) => {
    const send  = []
    tickets.forEach(ticket => {
        let dates = new Date(parseInt(ticket.createdAt));
        dates = String(dates).split('T')
        send.push({
            TicketNo : ticket.ticketNo,
            BookingDate: dates[0],
            Source:ticket.source,
            Destinetion:ticket.destination,
            Status:ticket.status,
            userDetails : ticket.userDetails
        });
    });
    return send;
}