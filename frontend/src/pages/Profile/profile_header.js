import React from 'react';

import './profile.css';

import Logo from '../images/LifePath.png';
import Avatar from '../images/avatar.png';


export default function Profile(){
    const user = localStorage.getItem('user')
    return(
        <header className = "header_profile">
            <div className="apresentation">
                <img src={Avatar} alt=""/>
                <h1>Welcome, {user}!</h1>
            </div>
            <img id="logo" src={Logo} alt=""/>
         </header>
    )
}