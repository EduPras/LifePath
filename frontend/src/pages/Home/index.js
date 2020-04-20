import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './style.css'

import Logo from '../images/LifePath.png';
import Mountain from '../images/Component 2.png';

export default function Routes(){


    return(
        <>
            <section className="sec1">
                <div className="container">
                    <header >
                        <div className="menu">
                            <h1>HOME</h1>
                            <h1>ABOUT</h1>
                        </div>

                        <div className="login">
                            <button>Sign in</button>
                        </div>
                        
                    </header>

                    <div className="titulo">
                        <div className="title">
                            <img src={Logo} alt=""/>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                        <button>Join us</button>
                    </div>
                    

                    <div className="moon">
                        <h2>make</h2>
                        <h2>your</h2>
                        <h2>QUERY</h2>
                    </div>
            
                    <img src={Mountain} className="mt-green" alt=""/>

                </div>
                
            </section>
        </>
    )
}