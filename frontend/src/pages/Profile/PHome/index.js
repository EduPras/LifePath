import React from 'react';
import './style.css';

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