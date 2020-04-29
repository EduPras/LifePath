import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import PHome from './pages/Profile/PHome';
import Mykey from './pages/Profile/MyQuery';
import Push from './pages/Profile/Push';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                
                <Route path="/" exact component={Home}/>

                <Route path="/profile" exact component={PHome}/>
                <Route path="/profile/mykey" exact component={Mykey}/>
                <Route path="/profile/push" exact component={Push}/>
                
            </Switch>
        </BrowserRouter>
    )
}