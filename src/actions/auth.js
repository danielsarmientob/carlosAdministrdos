import {firebase, googleAuthProvider} from '../firebase/firebase_config';
import { types } from '../types/types';


export const startLoginEmailPassword = (email, password)=>{
    return (dispatch)=>{
        firebase.auth().signInWithEmailAndPassword(email,password)
            .then( ( { user } ) =>{
                dispatch(login(user.uid, user.displayName));
            })
            .catch(e=>{
                console.log(e);
            })
    }
}

export const startLoginGoogle = ()=>{
   return (dispatch)=>{
        firebase.auth().signInWithPopup( googleAuthProvider )
        .then( ({ user })=>{
            // console.log(us)
            dispatch(login(user.uid, user.displayName));
        } )
   }
}

export const login = (uid, displayName)=>{
    return {
        type: types.login,
        payload:{
            uid,
            displayName
        }
    }
}

export const startLogout = ()=>{
    return async (dispatch)=>{
        await firebase.auth().signOut();
        dispatch(logout());
    }
}

export const logout = ()=>{
    return{
        type: types.logout
    }
}