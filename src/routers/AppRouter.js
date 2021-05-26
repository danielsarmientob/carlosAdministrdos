import React, { useEffect, useState } from 'react'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import { HomeScreen } from '../components/views/home/HomeScreen';
import { AuthRouter } from './AuthRouter';
import { firebase } from '../firebase/firebase_config';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { Imgcarga } from '../components/common/imgCarga/Imgcarga';


export const AppRouter = () => {
    const dispatch = useDispatch();
    const [cheking, setCheking] = useState(true);
    const [isLoggedIn , setIsloggedIn] = useState(false);    
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user)=>{
            if(user?.uid){
                dispatch(login(user.uid,user.displayName))     
                setIsloggedIn(true);
            }else{
                console.log('no hay madie logeado');
                setIsloggedIn(false);
            }
            setCheking(false);
        });
    },[dispatch])
    if(cheking){
        return(
            <>
                <Imgcarga/>
            </>
        )
    }
    return (
        <Router>
            <div>
                <Switch>
                   <Route 
                        path="/auth" 
                        component = {
                            (isLoggedIn) 
                            ? (HomeScreen)
                            : ( AuthRouter) 
                        }
                   />
                   <Route 
                        exact 
                        path="/" 
                        component = { 
                            (isLoggedIn) 
                            ? (HomeScreen)
                            : ( AuthRouter) 
                        }
                    />
                   <Redirect to="/auth/login"/>
                </Switch>
            </div>       
        </Router>
    )   
}
