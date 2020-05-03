import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import './style.css';
import vector from '../images/Vector.png';


export default function Query(){

    const [queries, setQueries] = useState([]);

    useEffect(() => {
        api.get('/query').then(response => {
          console.log(response.data.Queries);
          setQueries(response.data.Queries);
          console.log(queries)
        })
        
      }, []); 


    return(
        <section className="query">
            <div className="container_query">
                <div className="search">
                    <div className="search_container">
                        <h1>Search</h1>
                        <div className="box">
                            <input type="text" placeholder="Order"/>
                            <select type="text" >
                                <option value="" disabled selected>Order by</option>
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
                                {queries.map( e => (
                                    <li>
                                    <div className="order">
                                        <h1>{e.title}</h1>
                                    </div>
                                </li>
                                ))}
                                
                            </ul>
                        </div>

                    </div>
                

                </div>
                <div className="preview">
                    <div className="preview_container">
                        <div className="title">
                            <div className="title_box">
                                <h3>Preview</h3>
                            </div>

                        </div>
                        <div className="preview_box">
                            <div className="about">
                                <h1>Title</h1>
                                <h4>Description:</h4>
                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab laudantium facilis, ut neque nisi quasi enim esse odio, voluptates omnis sapiente quas inventore culpa consequatur dicta. Autem at maxime corporis.</p>
                                <h4>Created by: <h3>Eduardo Prasniewski</h3></h4> 
                            </div>
                            <div className="orders">
                                <div className="orders_box">
                                    <ul>
                                        <li>
                                            <div >
                                                <h1>DIPLURA</h1>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="sentences">
                                <div className="senteces_box">
                                    <ul>
                                        <li>
                                            <div className="sentence_found">
                                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore repudiandae corporis, odit omnis sapiente quo ipsum pariatur ad suscipit porro et est sit recusandae officiis dicta necessitatibus quae quod ea.</p>
                                            </div>
                                            <img src={vector} alt=""/>
                                        </li>
                                        <h1>DIPLURA</h1>
                                        
                                        
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>

        </section>
    )
}