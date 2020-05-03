import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../../services/api';


export default function Main(){

    const [queries, setQueries] = useState([]);

    useEffect(() => {
        api.get('profile/queries', {
          headers: {
            user: 'edupras',
          }
        }).then(response => {
          console.log(response.data);
          setQueries(response.data);
        })
        
      }, []);    

    return(
       
        <main className="mykey">
                    <script src="https://cdn.neo4jlabs.com/neovis.js/v1.4.0/neovis.js"></script>
                    <div id="preview">
                        <button onclick="closePreview()">X</button>
                            <div className="" id="viz"></div>
                    </div>
                    <div className="mykeys">
                            <h1>My keys</h1>
                            <ul>
                                {queries.map( e => (
                                        <li onclick="preview()">
                                            <h2>{e.title}</h2>
                                            <h3>Description</h3>
                                            <p>{e.description}</p>
                                        </li>
                                    ))
                                    
                                }
                                
                            </ul>
                    </div>              

        </main>
    )
}