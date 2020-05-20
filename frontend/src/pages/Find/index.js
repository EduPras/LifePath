import React, { useState, useEffect } from 'react';
import {MdClose} from 'react-icons/md';
import api from '../../services/api';
import './style.css';
import {FiArrowDown} from 'react-icons/fi';

export default function Find({titlePreview}){


    const [path, setPath] = useState([]);
    const [parent, setParent] = useState('');
    const [firstKey, setFirstKey] = useState('');
    const [secondKey, setSecondKey] = useState('');
    const [orderFound, setOrderFound] = useState('');
    
    async function changeParent(sentence){
        
        const parent_index = path.findIndex( e => {return e===sentence});
        const x = path.slice(0, parent_index+1);
        setPath([...x]);     
        await getNextKeys(path[parent_index+1]);
        setOrderFound('');
        setParent(sentence);   
        console.log(orderFound)
    }

    async function getFirstTwoKeys(){
        setParent('Início')
        setPath(['Início']);
        await api.post('/query',{ type:'find',first: true, parent: titlePreview }).then(
            response =>{
                setFirstKey(response.data.key_1);
                setSecondKey(response.data.key_2);
            }

        )
    } 

    async function getNextKeys(){
        await api.post('/query',{ type:'find',first:false, parent: parent }).then(
            response =>{
                if(response.data.name === undefined){
                    setFirstKey(response.data.key_1);
                    setSecondKey(response.data.key_2);
                }else{
                    setOrderFound(response.data.name);
                }
                
            }
        )   
    }


    useEffect(()=>{
        getFirstTwoKeys()
    },[titlePreview])

    useEffect(() => {
        if (orderFound !==''){
            document.querySelector('.found').style.display = "flex";
            document.getElementById('choose_order').innerHTML = "ORDER FOUND";
            document.querySelector('.choose_sentence').style.display = "none";
            document.querySelector('.choose_sentence.second').style.display = "none";
        }else{
            document.querySelector('.found').style.display = "none";
            document.getElementById('choose_order').innerHTML = "Choose the next key";
            document.querySelector('.choose_sentence').style.display = "block";
            document.querySelector('.choose_sentence.second').style.display = "block";
        }
    }, [orderFound])


    useEffect(() => {      
        if(parent !=='Início'){
            getNextKeys();

        }        
    }, [parent]);


    async function handleParent(e, parent){
        e.preventDefault()
        setParent(parent);
        setPath([...path, parent]);
    }

    return(
            <div className="find">
                <h2 id="Navigate">Navigate</h2>
                <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400&display=swap" rel="stylesheet"/>
                <div className="container_find">
                    <div className="close_choose" onClick= { () => { 
                            document.querySelector('.find').style.display = "none";
                            getFirstTwoKeys();
                            setOrderFound('');
                        }}>
                                <MdClose size="1.4rem" color="black" />
                    </div>
                    <div className="choose">
                        
                        <div className="parent_sentence">
                            <p>{parent}</p>
                        </div>
                        <h1 id="choose_order">Choose the next key</h1>
                        <div className="next_sentences">
                            <div className="choose_sentence">
                                <p onClick = { e => handleParent(e, firstKey)} >{firstKey}</p>
                            </div>
                            <div className="choose_sentence second">
                                <p onClick = { e => handleParent(e, secondKey )} >{secondKey}</p>
                            </div>
                            <div className="found">
                                <h1 className="foundh1">{orderFound}</h1>
                            </div>
                        </div>
                    </div>
                    <div className="chose">
                        <div className="sentences_chose">
                            <h1>Path</h1>
                            <ul className="path_chose">
                                {path.map( sentence => (
                                    <>
                                        <li className="path_sentence" onClick={ (x) => {
                                                changeParent(x.target.innerText);
                                                setOrderFound('');
                                            }}>
                                            {sentence}                                                                      
                                        </li>
                                        
                                        <FiArrowDown className="FiArrowDown" size='1.4rem' color='green'/> 
                                    </>
                                ))}
                               
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
    )
}



   
