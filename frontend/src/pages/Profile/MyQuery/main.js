import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';


export default function Main(){
    return(
        <main className="mykey">
                    <div id="preview">
                        <button onclick="closePreview()">X</button>
                            <div className="" id="viz"></div>
                    </div>
                    <div className="mykeys">
                            <h1>My keys</h1>
                            <ul>
                                <li onclick="preview()">
                                    <h2>Title</h2>
                                    <h3>Description</h3>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, hic cum! Libero nobis reprehenderit voluptatem error laudantium, iure quod aperiam neque alias eos, earum aliquid maxime fugit sequi quae dolore.</p>
                                </li>
                                
                            </ul>
                    </div>              

        </main>
    )
}