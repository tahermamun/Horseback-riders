import React from 'react';
import { useHistory } from 'react-router';
import './TransportCard.css'

const TransportCard = (props) => {
    // get Details for Transport Card usign props
    const { transportName, picture, id } = props.transportData
    const history = useHistory();
    const handleClick = (id) => {
        history.push(`/destination/${id}`)
    }
    return (
        <div className='card justify-content-sm-center' onClick={() => handleClick(id)}>
            <div className='imgBox'>
                <img src={picture} alt="" />
            </div>
            <div className='contentBox'>
                <h2>{transportName} </h2>
            </div>
        </div>
    );
};

export default TransportCard;