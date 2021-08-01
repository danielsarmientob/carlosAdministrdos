import React from 'react';

import { Redirect, Route, Switch } from 'react-router';
import { NavBar } from '../components/common/navBar/NavBar';

import { HomeScreen } from '../components/views/home/HomeScreen';
import { HomeFiltro } from '../components/views/homeFiltro/HomeFiltro';
import { HomeGeneral } from '../components/views/homeGeneral/HomeGeneral';

export const HomeRouter = () => {
    console.log('Home router')
    return (
        <div>
            <NavBar/>
            <Switch>
                <Route exact path='/home/paises' component={ HomeScreen }/>
                <Route exact path='/home/general' component={ HomeGeneral }/>
                <Route exact path='/home/filtro' component={ HomeFiltro }/>
                <Redirect to='/home/paises'/>
            </Switch>
        </div>
    )
}
