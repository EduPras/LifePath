import React from 'react';
import { Link} from 'react-router-dom';

export default function Main (){
    return(
        <main className="home_profile">

            <Link className="card key"to="/profile/push">
                <h2>Push a new KEY</h2>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero enim aliquid quisquam voluptatum fugit, minima modi dicta recusandae, delectus aperiam eaque sit ducimus aut perspiciatis earum officia provident atque est?</p>
            </Link>

            <Link className="card query_card"to={{pathname:"/query", match:{ params:{_previous_page: "/profile"}}}}>
                <h2>Make your query</h2>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero enim aliquid quisquam voluptatum fugit, minima modi dicta recusandae, delectus aperiam eaque sit ducimus aut perspiciatis earum officia provident atque est?</p>
            </Link>
            
        </main>
    )
}