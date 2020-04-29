import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './style.css';
import '../profile.css';

import Profile from '../profile_header';
import Aside from '../profile_aside';
import Main from './main';

import Mountain from '../../images/Component 2.png';

export default function Routes(){


    return(
        <section className="profile">

            <Profile/>

            <div className="main">

                <Aside/>
                
                <Main/>

            </div>
            <img src={Mountain} className="mt-green" alt=""/>

        </section>
    )
}