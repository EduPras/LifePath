import React from 'react';
import { Link} from 'react-router-dom';
import {FaPowerOff} from 'react-icons/fa';

import './profile.css';


export default function Profile(){
    return(
        <aside>
            <Link to="/profile">Home</Link>
            <Link to="#">Profile</Link>
            <Link to="/profile/mykey">My queries</Link>
            <Link to="/" id="logoff" onClick={ ()=> localStorage.setItem('user', '')}> <FaPowerOff size="1.6rem"/></Link>
        </aside>
    )
}