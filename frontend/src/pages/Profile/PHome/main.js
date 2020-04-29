import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

export default function Main (){
    return(
        <main className="home">
            <a className="card key"href="#">
                <h2>Push a new KEY</h2>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero enim aliquid quisquam voluptatum fugit, minima modi dicta recusandae, delectus aperiam eaque sit ducimus aut perspiciatis earum officia provident atque est?</p>
            </a>

            <a className="card query"href="#">
                <h2>Make your query</h2>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero enim aliquid quisquam voluptatum fugit, minima modi dicta recusandae, delectus aperiam eaque sit ducimus aut perspiciatis earum officia provident atque est?</p>
            </a>
            
        </main>
    )
}