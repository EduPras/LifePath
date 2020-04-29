import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import './profile.css';


export default function Profile(){
    return(
        <aside>
            <Link to="/profile">Home</Link>
            <Link to="#">Profile</Link>
            <Link to="/profile/mykey">My queries</Link>
        </aside>
    )
}