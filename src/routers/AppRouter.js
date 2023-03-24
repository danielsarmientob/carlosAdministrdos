import React, { useEffect, useState } from 'react'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import { AuthRouter } from './AuthRouter';
import { firebase } from '../firebase/firebase_config';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { Imgcarga } from '../components/common/imgCarga/Imgcarga';
import { HomeRouter } from './HomeRouter';


export const AppRouter = () => {
    const dispatch = useDispatch();
    const [cheking, setCheking] = useState(false);
    const [isLoggedIn , setIsloggedIn] = useState(true);    
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
                        component = {(props)=>(
                            (isLoggedIn)
                            ? (<Redirect to='/home/paises'/>) 
                            : (<AuthRouter {...props}/>)
                        )}
                    />
                   <Route 
                        
                        path="/" 
                        component = {(props)=>(
                            (isLoggedIn)
                            ? (<HomeRouter {...props}/>)
                            : (<Redirect to='/auth/login'/>) 
                        )}
                    />
                   <Redirect to="/auth/login"/>
                </Switch>
            </div>       
        </Router>
    )   
}
