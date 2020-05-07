import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../../services/api';


export default function Main(){

    // Variables

    const user = localStorage.getItem('user');

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [keys, setKeys] = useState([]);
    const [family, setFamily] = useState([]);

    const [sentence, setSentence] = useState('');
    const [nameShortcut, setNameShortcut] = useState('');

    const [keyRequest, setKeyrequest] = useState([]);



    // Functions

    // Counter key, max:2

    function handleBind(b){
        keys.map(e => {
            if(e.shortcut === b){
                e.bind += 1;
            }
        })
    }



    // Send a key

    async function handleSend(e){
        e.preventDefault();
       
        const x = document.getElementById('type');
        const y = document.getElementById('sc_parent');

        handleBind( y.options[y.selectedIndex].value);

        
        console.log( y.options[y.selectedIndex].value + ' ligado a chave: '+ nameShortcut)
        

        if(x.options[x.selectedIndex].value === 'family'){
            setFamily([... family, nameShortcut]);

            setKeyrequest([...keyRequest, {
                "type":x.options[x.selectedIndex].value,
                "sc_parent":  y.options[y.selectedIndex].value,
                "sentence": sentence,
                "name": nameShortcut
            }]);
        }

        if(x.options[x.selectedIndex].value === 'key'){
            setKeys([... keys, {
                "shortcut": nameShortcut,
                "bind": 0,
            }]);

            setKeyrequest([...keyRequest, {
                "type":x.options[x.selectedIndex].value,
                "sc_parent":  y.options[y.selectedIndex].value,
                "sentence": sentence,
                "shortcut": nameShortcut
            }]);
        }

        setSentence('');
        setNameShortcut('');

    }



    // Send request

    async function handleSubmit(e){
        const request = {
            "title":title,
            "description":description,
            "shortcut": `Início: ${title}`,
            "keys": [...keyRequest]
        }
    

        console.log(request)
        e.preventDefault();
        try {
             const response = await api.post('profile/push', request, {
                headers:{
                    user: 'yuri'
                }
            }
            );
            console.log(response);
            
        } catch (error) {
            console.log(error)
        }
    }


    // Return HTML

    return(
        <main className="push_main">
                <h1>Push a key</h1>
                <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>

                <form>
                    <div className="title">
                        <label for="">Title: </label>
                        <input 
                            id="title"
                            type="text" 
                            onChange={ 
                                e => {
                                       setTitle(e.target.value);
                                       setKeys([{"shortcut": `Início: ${e.target.value}`, "bind":0}])
                                }
                            }/>
            

                        <label for="">Description:</label>
                        <textarea 
                            type="text" 
                            id="desc"
                            onChange={ 
                                e => setDescription(e.target.value)
                            }/>
               
                    </div>

                    <div className="keys">
                        <div className="new">


                            <div className="new_container">

                                <select name="" id="sc_parent">
                                    {keys.map(e=>{
                                        if(e.bind <2){
                                            return <option value={e.shortcut}>{e.shortcut}</option>
                                        }
                                    })}
                                </select>


                                <label for="">Sentence 
                                    <input 
                                        type="text" 
                                        onChange={
                                            e => setSentence(e.target.value)
                                    }/>
                                </label>

                                <select name="" id="type" on>
                                    <option value="family">Family </option>
                                    <option value="key" >Key</option>
                                </select>

                                <input 
                                    type="text" 
                                    placeholder="Name or shortcut" 
                                    onChange={ 
                                        e => setNameShortcut(e.target.value)
                                    }/>
                                <div className="bts">
                                    <button onClick={e => handleSend(e)} id="put">Put</button>
                                    <button onClick={e => handleSubmit(e)} id="finish">Finish</button>
                                </div>
                               
                            </div>
                        </div>


                        <div className="show">
                            <ul>
                                <h1>Keys</h1>
                                {keys.map(e=>(  

                                        <li>{e.shortcut}</li>
                                ))}
                               
                            </ul>
                            <ul className="key_order">
                                <h1>Orders</h1>
                                {family.map(e=>(
                                    <li>{e}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    
                </form>
                
            </main>
    )
}