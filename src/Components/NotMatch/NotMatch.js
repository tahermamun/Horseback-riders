import React from 'react';
import { NavLink } from 'react-router-dom';

const NotMatch = () => {
    return (
        <div className='text-center'>
            <h1 className='text-danger p-5'>
                Data Not Found 404
            </h1>
            <NavLink  to='/home'>Back to Home Page</NavLink>
        </div>
    );
};

export default NotMatch;