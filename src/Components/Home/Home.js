import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import './Home.css'
import Data from '../../fakeData/fakeData.json'
import TransportCard from '../TransportCard/TransportCard';

const Home = () => {
    // Store Transport Data using useState
    const [transportData, setTransportData] = useState([])

    // Load Transport Data from the fakeData
    useEffect(() => {
        setTransportData(Data)
    }, []);

    return (
        <div className="main-home">
            <Header></Header>
            {/* Home Page All Transport Card */}
            <div className='container card-container'>
                {
                    transportData.map(transportData => <TransportCard key={transportData.id} transportData={transportData}></TransportCard>)
                }
            </div>
        </div>
    );
};

export default Home;