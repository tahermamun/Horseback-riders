import React from 'react';
import './DestinationTicketItems.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends } from '@fortawesome/free-solid-svg-icons'

const BookingTicketItems = (props) => {
    // get ticket details using props
    const { transportType, transportTypeImg, totalSit, price } = props.ticketItems
    return (
        <div className='singTransportTicket'>
            <img src={transportTypeImg} alt="" />
            <h5>{transportType}</h5>
            <h5><FontAwesomeIcon icon={faUserFriends} /> {totalSit}</h5>
            <h5>${price}</h5>
        </div>
    );
};

export default BookingTicketItems;