import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {MdClose} from 'react-icons/md';


import api from '../../services/api';
import Preview from '../Preview';

import './style.css';



export default function Query(){

    const [queries, setQueries] = useState([]);

    const [titlePreview, setTitlePreview] = useState('');   



    useEffect(() => {
        api.post('/query', {type: 'query'}).then(response => {
          setQueries(response.data.Queries);
        })
        
      }, []); 


    return(
        <section className="query">
            <Link to="/">
                <div className="close_query">
                    <MdClose size="1.5rem" color="black" />
                </div>
            </Link>
            <div className="container_query">
                <div className="search">
                    <div className="search_container">
                        <h1>Search</h1>
                        <div className="box">
                            <input type="text" placeholder="Order"/>
                            <select type="text" >
                                <option value="Relevancy">Relevancy</option>
                                <option value="Newest">Newest</option>
                                <option value="Orederest">More orders</option>
                            </select>
                        </div>                    
                    </div>    
                    

                </div>
                <div className="ad">
                    <div className="adverstising">

                    </div>

                </div>
                <div className="list">
                    <div className="list_container">
                        <div className="list_box">
                            <ul>
                                {queries.map( query => (
                                    <li key={query.title} 
                                        onClick = { () => 
                                            setTitlePreview(query.title)}>
                                    <div className="order">
                                        <h1 >{query.title}</h1>
                                    </div>
                                </li>
                                ))}
                                
                            </ul>
                        </div>
                    </div>
                </div>

                <Preview titlePreview = {titlePreview}/>                          
            </div>

        </section>
    )
}