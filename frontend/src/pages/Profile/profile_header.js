import React from 'react';

import './profile.css';

import Logo from '../images/LifePath.png';
import Github from '../images/github.jpg';


export default function Profile(){
    return(
        <header className = "header_profile">
            <div className="apresentation">
                <img src={Github} alt=""/>
                <h1>Welcome, Eduardo!</h1>
            </div>
            <img id="logo" src={Logo} alt=""/>
         </header>
    )
}