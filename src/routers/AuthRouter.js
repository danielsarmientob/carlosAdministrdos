import React from 'react'

import { Redirect, Route, Switch } from 'react-router-dom'

import { LoginScreen } from '../components/views/auth/login/LoginScreen'
import { Register } from '../components/views/auth/register/Register'

export const AuthRouter = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/auth/login" component={ LoginScreen }/>
                <Route exact path="/auth/register" component={ Register }/>
                <Redirect to="/auth/login"/>
            </Switch>
        </div>
    )
}
