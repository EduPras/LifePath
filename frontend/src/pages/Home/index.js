import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './style.css'

import Logo from '../images/LifePath.png';
import Mountain from '../images/Component 2.png';
import {MdClose} from 'react-icons/md'; 

import api from '../../services/api';


export default function Routes(){

    const history = useHistory();

    const [userLogin, setUserLogin] = useState('');
    const [passwdLogin, setPasswdLogin] = useState('');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [Rpassword, setRPassword] = useState('');


    async function handleLogin(e){
        localStorage.setItem('user', '');
        document.getElementById('login_failed').style.display = 'none';
        e.preventDefault();
        const response = await api.post('/', {
            'type': 'login',
            'user': userLogin,
            'password': passwdLogin
        })

        if(response.data === '1'){
            document.getElementById('login_failed').style.display = 'block';
        }
        else{
            localStorage.setItem('user', userLogin);
            history.push('/profile');
        }
    }


    async function handleRegister(e){
        const x = document.getElementById('rpassword');
        x.style.border = '2px solid #CECECE';
        x.style.background = 'rgba(196, 196, 196, 0.24)';
        x.style.color= 'black';
        const y = document.getElementById('user');
        y.style.border = '2px solid #CECECE';
        y.style.background = 'rgba(196, 196, 196, 0.24)';

        document.getElementById('user_failed').style.display = "none";
        document.getElementById('passwd_failed').style.display = "none";

        e.preventDefault();
        if( Rpassword === password){
            const response  = await api.post('/', {
                'type': 'register',
                'user_login': user,
                'email': email,
                'name': name, 
                'password': password
            });
            console.log(response);
            if(response.data === "Usuário indisponivel"){
                const box = document.getElementById('user');
                box.style.border = '2px solid red';
                box.style.background = '#ffe5e5';
                document.getElementById('user_failed').style.display= 'block';
            }
            else{
                closeRegister(e);
            }

        }
        else{
            const rpass = document.getElementById('rpassword');
            rpass.style.border = '2px solid red';
            rpass.style.background = '#ffe5e5';
            rpass.style.color = 'red';
            document.getElementById("passwd_failed").style.display = 'block'
        }
       
    }



    // animations 

    function openRegister(e){
        closeLogin(e);
        e.preventDefault();
        const x = document.querySelector('.register');
        x.style.display = "flex";
        setTimeout( ()=>{ x.style.transform = "scale(1)"}, 10 );       
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
                    

                    <Link  to="/query" className="moon">
                        <h2>make</h2>
                        <h2>your</h2>
                        <h2>QUERY</h2>
                    </Link>

                    <div className="login_box">
                        <form className="login_form" >
                            <div className="close" onClick ={e => closeLogin(e)} >
                                <MdClose size="1.5rem" color="#0D8FB8" />
                            </div>
                            <h1>Login</h1>
                            <input type="text" placeholder="User" onChange = { e => setUserLogin(e.target.value)}/>
                            <input type="password" placeholder="Password" onChange = { e => setPasswdLogin(e.target.value)}/>
                            <a onClick = { e =>  openRegister(e)}>Doesn't have an account? Register</a>
                            <a id="login_failed">Data does not match</a>
                            <button onClick= { e => handleLogin(e)}>Log in</button>
                        </form>
                    </div>

                    <div className="register">
                        <form className="register_form"action="">
                            <div className="close" onClick = {e => closeRegister(e)} >
                                <MdClose size="2rem" color="#0D8FB8" />
                            </div>
                            <h1>Register</h1>
                            <input type="text" placeholder="Name" onChange = { e => setName(e.target.value)}/>
                            <input type="text" placeholder="User" id="user" onChange = { e => setUser(e.target.value)}/>
                            <input type="text" placeholder="Email" onChange = { e => setEmail(e.target.value)}/>
                            <input type="password" placeholder="Password" onChange = { e => setPassword(e.target.value)}/>
                            <input type="password" id="rpassword" placeholder="Retype password" onChange = { e => setRPassword(e.target.value)}/>
                            <a href="" onClick = { e => openLogin(e)} >Already have an account?</a>
                            <a id="user_failed">User Unavailable</a>
                            <a id="passwd_failed">Retype your password again</a>
                            <button onClick = {e => handleRegister(e)}>Send</button>
                        </form>
                    </div>
            
                    <img src={Mountain} className="mt-green-home" alt=""/>

                </div>
                
            </section>
        </>
    )
}