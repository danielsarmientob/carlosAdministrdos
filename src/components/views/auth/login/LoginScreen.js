import React from 'react';

import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLoginGoogle } from '../../../../actions/auth';

import { useForm } from '../../../../hooks/useForm';

export const LoginScreen = () => {
    const dispatch = useDispatch();
    const [values,handleInputChange] = useForm();
    const { email, password, classInput } = values;
    
    const handleGoogleLogin = ()=>{
        console.log('google login');
        dispatch( startLoginGoogle() );
    }
    return (
        <div className="cont-screen-login">
            <div className="cont-form">
                <h1>Iniciar sesión</h1>
                <form>
                    <div className={`text-field ${ classInput }`}>
                        <input
                            type="text"
                            name="email"
                            className="form-controlD"
                            required
                            value={ email }
                            onChange={ handleInputChange }
                        />  
                        <label>Email</label>
                        {
                            (classInput === "text-flied-incorrect")
                            ? <p className="adver">Ingrese un correo valido</p>
                            : <p></p> 
                        }
                    </div>
                    <div className={"text-field text-flied-password "}>
                        <input
                            type="password"
                            name="password"
                            className="form-controlD"
                            required
                            value={ password }
                            onChange={ handleInputChange }
                        />  
                        <label>Contraseña</label>
                    </div>
                   
                    <button 
                        className="btn btn-primary " 
                        disabled=
                        { 
                            ( classInput === 'text-flied-correct' && password.trim().length > 0 )
                            ? "" 
                            : "disabled"
                        }
                    > 
                        Iniciar
                    </button>
                    <div className="auth__social-networks">
                        <p>O</p>

                        <div 
                            className="google-btn"
                            onClick={ handleGoogleLogin }
                        >
                            <div className="google-icon-wrapper">
                                <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                            </div>
                            <p className="btn-text">
                                <b>Ingresar con google</b>
                            </p>
                        </div>
                    </div>
                    <Link 
                        to="/auth/register"
                        className="link"
                    >
                        Crear una nueva cuenta  
                    </Link>

                </form>
            </div>
        </div>
    )
}
