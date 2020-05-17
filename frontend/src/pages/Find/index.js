import React, { useState, useEffect } from 'react';
import {MdClose} from 'react-icons/md';
import api from '../../services/api';


export default function Find({titlePreview}){


    const [path, setPath] = useState([]);
    const [parent, setParent] = useState('');
    const [firstKey, setFirstKey] = useState('');
    const [secondKey, setSecondKey] = useState('');
    
    

    useEffect(()=>{

        async function getFirstTwoKeys(){
            await api.post('/query',{ type:'find',first: true, parent: titlePreview }).then(
                response =>{
                    setFirstKey(response.data.key_1);
                    setSecondKey(response.data.key_2);
                }

            )
        } 
        getFirstTwoKeys()
    },[titlePreview])



    useEffect(() => {
        console.log('Working!!!')
        async function getNextKeys(){
            await api.post('/query',{ type:'find',first:false, parent: parent }).then(
                response =>{
                    setFirstKey(response.data.key_1);
                    setSecondKey(response.data.key_2);
                }
            )   
        }

        getNextKeys();
    }, [parent]);


    async function handleParent(e, parent){
        e.preventDefault()
        setParent(parent);
        setPath([...path, parent]);
    }

    return(
            <div className="find">
                <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400&display=swap" rel="stylesheet"/>
                <div className="container_find">
                    <div className="close_choose" onClick= { () => { document.querySelector('.find').style.display = "none"}}>
                                <MdClose size="1.4rem" color="black" />
                    </div>
                    <div className="choose">
                        
                        <div className="parent_sentence">
                            <p>{parent}</p>
                        </div>
                        <h1>Choose the next key</h1>
                        <div className="next_sentences">
                            <div className="choose_sentence">
                                <p onClick = { e => handleParent(e, firstKey)} >{firstKey}</p>
                            </div>
                            <div className="choose_sentence second">
                                <p onClick = { e => handleParent(e, secondKey )} >{secondKey}</p>
                            </div>
                        </div>
                    </div>
                    <div className="chose">
                        <div className="sentences_chose">
                            <h1>Path</h1>
                            <ul className="path_chose">
                                <li className="path_sentence">
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum eius laboriosam illo dignissimos fugiat quo magni facilis nesciunt ad quia aliquid assumenda voluptatum, vero exercitationem quaerat accusamus eaque sint velit.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
    )
}



   
