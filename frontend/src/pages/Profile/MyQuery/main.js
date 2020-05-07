import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../../services/api';
import Preview from '../../Preview';


export default function Main(){

    const [titlePreview, setTitlePreview] = useState('');
    const [queries, setQueries] = useState([]);

    useEffect(() => {
        api.get('profile/queries', {
          headers: {
            user: 'edupras',
          }
        }).then(response => {
          setQueries(response.data);
        })
        
      }, []);    


    function openPreview(e, title){
      console.log(title);
      setTitlePreview(title);
      document.querySelector('.preview_container').style.display = 'block';
      document.querySelector('.title_box').style.display = 'none';
    }

    return(
       
        <main className="mykey">

                    <div className="mykeys">
                            <h1 className="text_title">My keys</h1>
                            <ul className="ul_queries">
                                {queries.map( query=> (
                                        <li className="li_queries" key={query.title} onClick={e => openPreview(e, query.title)}>
                                            <h2 className="query_title">{query.title}</h2>
                                            <h3 className="query_description">Description</h3>
                                            <p className="description">{query.description}</p>
                                        </li>
                                    ))                                    
                                }                                
                            </ul>
                            <Preview titlePreview = {titlePreview}/>
                    </div>              

        </main>
    )
}