import React, { useState, useEffect } from 'react';

import {MdClose} from 'react-icons/md';

import vector from '../images/Vector.png';

import api from '../../services/api';
import './style.css';

export default function Preview( {titlePreview}){

    const [orderPreview, setOrderPreview] = useState('');
    const [orderTitlePreview, setOrderTitlePreview] = useState('')

    const [creator, setCreator] = useState('');
    const [description, setDescription] = useState('');
    const [path, setPath] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        async function getOrders(){
            await api.post('/query', {type: 'preview', title: titlePreview}).then(
                response => {
                    setOrders(response.data.orders);
                    setCreator(response.data.creator);
                    setDescription(response.data.description);
                }
            )
        }
        getOrders();
        setPath([]);
        setOrderTitlePreview('');
        
    }, [titlePreview]);
    
    useEffect(() => {
        async function getPath(){
            await api.post('/query', {type: 'path', parent: titlePreview},{params: { order: orderPreview }}).then(
                response => {
                    console.log(response.data);
                    setPath(response.data);
                }
            )
        }
        getPath();
        setOrderTitlePreview(orderPreview)
    }, [orderPreview]);

    function closePreview(){
        document.querySelector('.preview_container').style.display ="none";
    }

    return(
        <div className="preview">
            <div className="preview_container">
                <div className="title">
                    <div className="title_box">
                        <h3>Preview</h3>
                    </div>

                </div>
                <div className="preview_box">
                    <div className="about">
                    <div className="close" onClick={() => closePreview()}>
                        <MdClose size="2rem" color="red" />
                    </div>
                        <h1 className="titlePreview">{titlePreview}</h1>
                        <h4 className="descriptionTitle">Description:</h4>
                        <p className="description"> {description}</p>
                        <h4 className="descriptionTitle">Created by:</h4><h3 className="creator">{creator}</h3>
                    </div>
                    <div className="orders">
                        <div className="orders_box">
                            <ul className = "ul_preview">
                                {orders.map( e => (
                                    <li className = "li_preview"key={e.name} onClick ={ () => setOrderPreview (e.name)}>
                                        <div >
                                            <h1 >{e.name}</h1>
                                        </div>
                                    </li>
                                ))}
                                
                            </ul>
                        </div>
                    </div>
                    <div className="sentences">
                        <div className="senteces_box">
                            <ul className="ul_preview">
                                {path.map(e => (
                                    <li key={e} className="li_preview">
                                        <div className="sentence_found">
                                            <p>{e}</p>
                                        </div>
                                        <img src={vector} alt=""/>
                                    </li>
                                ))}
                                
                                <h1 className="order_name">{orderTitlePreview}</h1>
                                
                                
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}