import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import vector from '../../images/Vector.png'


export default function Main(){
    return(
        <main className="push">
            <h1>Push a key</h1>
            <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>

            <form className="formPush" action="">
                <div className="title">
                    <label for="">Title: </label>
                    <input id="title"type="text"/>
                    

                    <label for="">Description:</label>
                    <input type="text" id="desc" name="" id=""/>
                </div>

                <div className="keys">
                    <ul>
                        <li>
                            <label for="">Begin shortcut  <input type="text"/></label>
                            
                            <span></span>
                        </li>
                        <li>
                            <label for="">Key parent: "Begin shortcut" <input type="text"/></label>
                            <label for=""> <img src={vector}/>Description <input id="desc" type="text"/></label>
                            <label for="">New key shortcut: <input type="text"/></label>
                            <span></span>
                        </li>
                        <button id="add">+</button>
                        <button id="previewButton">Preview</button>
                    </ul>                        
                </div>
                
            </form>
            
        </main>
    )
}