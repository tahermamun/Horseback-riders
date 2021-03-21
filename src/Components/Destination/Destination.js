import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Data from '../../fakeData/fakeData.json'
import "./Destination.css";
import Header from '../Header/Header';
import DestinationTicketItems from '../DestinationTicketItems/DestinationTicketItems';
import GoogleMap from '../GoogleMap/GoogleMap'

const Destination = (props) => {
    // use useState for Search Destination Place Input
    const [searchInput, setSearchInput] = useState({
        isHide: false,
        address1: '',
        address2: '',
        date: ''
    })

    const { id } = useParams()

    const [singleTransportDetails, setSingleTransportDetails] = useState([])
    // use useState for single Ticket Item
    const [ticketItems, setTicketItems] = useState([])
    useEffect(() => {
        setSingleTransportDetails(Data[id])
    }, [Data])
    const allTicketItems = singleTransportDetails.ticketItems
    // Search Button Function
    const handleClick = (e) => {
        const updateSearchInput = { ...searchInput }
        updateSearchInput.isHide = true
        setSearchInput(updateSearchInput)
        setTicketItems(allTicketItems);
        e.preventDefault()
    }
    // Search input function
    const handleSearchInput = (e) => {
        const updateSearchInput = { ...searchInput }
        updateSearchInput[e.target.name] = e.target.value
        setSearchInput(updateSearchInput)
    }
    return (
        <>
            <Header></Header>
            <div className='container'>
                <div className='destination-main-container'>
                    <div className='search-area'>
                        {
                            searchInput.isHide && <ul className='timeline'>
                                <li className='line'>
                                    <h4>{searchInput.address1}</h4>
                                </li>
                                <li>
                                    <h4>{searchInput.address2}</h4>
                                </li>
                                <li>
                                    <h5>Date: {searchInput.date}</h5>
                                </li>
                            </ul>
                        }
                        {
                            !searchInput.isHide &&
                            <form onSubmit={handleClick}>
                                <div className="form-group">
                                    <label htmlFor="address1" className="form-label">Pick From</label>
                                    <input className='my-input' onBlur={handleSearchInput} type="text" name='address1' required></input>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="address2" className="form-label">Pick to</label>
                                    <input className='my-input' onBlur={handleSearchInput} type="text" name='address2' required></input>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="date" className="form-label">Date</label>
                                    <input className='my-input' onBlur={handleSearchInput} type="date" name='date' required></input>
                                </div>

                                <input type="submit" className='search-btn' value='Search' />
                            </form>
                        }
                        {/* single ticket for transport search */}
                        {
                            ticketItems.map(ticketItems => <DestinationTicketItems key={ticketItems.transportTypeId} ticketItems={ticketItems}></DestinationTicketItems>)
                        }
                    </div>

                    <div className='map-area'>
                        <GoogleMap></GoogleMap>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Destination;