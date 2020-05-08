import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './style.css'

import Logo from '../images/LifePath.png';
import Mountain from '../images/Component 2.png';
import {MdClose} from 'react-icons/md'; 

export default function Routes(){

    useEffect(() => {
        document.querySelector('body').style.background = '#fff';
    },[]);

    // animations 

    function openRegister(e){
        closeLogin(e);
        e.preventDefault();
        const x = document.querySelector('.register');
        x.style.display = "flex";
        setTimeout( ()=>{ x.style.transform = "scale(1)"}, 10 );    
        document.querySelector('body').style.background = '#fff'   
    }

    function closeRegister(e){
        e.preventDefault();
        const x = document.querySelector('.register');
        x.style.transform = "scale(0)"
        setTimeout( ()=>{x.style.display = "none"; }, 450  );       
    }

    function openLogin(e){
        closeRegister(e);
        e.preventDefault();
        const x = document.querySelector('.login_box');
        x.style.display = "flex";
        setTimeout( ()=>{ x.style.transform = "scale(1)"}, 10 );    
        document.querySelector('body').style.background = '#fff'   
    }

    function closeLogin(e){
        e.preventDefault();
        const x = document.querySelector('.login_box');
        x.style.transform = "scale(0)"
        setTimeout( ()=>{x.style.display = "none"; }, 450  );       
    }


    return(
        <>
            <section className="sec1">
                <div className="container">
                    <header className="header_home" >
                        <div className="menu">
                            <h1>HOME</h1>
                            <h1>ABOUT</h1>
                        </div>

                        <div className="login">
                            <button onClick ={e => openLogin(e)}>Sign in</button>
                        </div>
                        
                    </header>

                    <div className="titulo">
                        <div className="title">
                            <img src={Logo} alt=""/>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                        <button onClick={e => openRegister(e)}>Join us</button>
                    </div>
                    

                    <div className="moon">
                        <h2>make</h2>
                        <h2>your</h2>
                        <h2>QUERY</h2>
                    </div>

                    <div className="login_box">
                        <form className="login_form" action="">
                            <div className="close" onClick ={e => closeLogin(e)} >
                                <MdClose size="1.5rem" color="#0D8FB8" />
                            </div>
                            <h1>Login</h1>
                            <input type="text" placeholder="User"/>
                            <input type="text" placeholder="Password"/>
                            <a onClick = { e =>  openRegister(e)}>Doesn't have an account? Register</a>
                            <button>Log in</button>
                        </form>
                    </div>

                    <div className="register">
                        <form className="register_form"action="">
                            <div className="close" onClick = {e => closeRegister(e)} >
                                <MdClose size="2rem" color="#0D8FB8" />
                            </div>
                            <h1>Register</h1>
                            <input type="text" placeholder="Name"/>
                            <input type="text" placeholder="User"/>
                            <input type="text" placeholder="Email"/>
                            <input type="text" placeholder="Password"/>
                            <input type="text" placeholder="Retype password"/>
                            <a href="" onClick = { e => openLogin(e)} >Alreaddy have an account?</a>
                            <button>Send</button>
                        </form>
                    </div>
            
                    <img src={Mountain} className="mt-green-home" alt=""/>

                </div>
                
            </section>
        </>
    )
}