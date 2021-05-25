import React from 'react'

import { useForm } from '../../../../hooks/useForm';

export const Register = () => {
    const [values,handleInputChange] = useForm();
    const { 
        nombre,
        email, 
        password, 
        password2, 
        classInput, 
    } = values;
    const isDisableBtnResgistrar = ()=>{
        if(classInput === 'text-flied-correct' && password.trim().length > 0 && nombre.trim().length > 0 && password2 === password)
            return true;
        else
            return false;
        
    }
    const verificatedPassword = ()=>{
        if( password.trim().length > 0 && password2.trim().length > 0){
            if( password2 === password)
                return 'text-flied-correct';
            else
                return 'text-flied-incorrect';
        }else{
            return 'text-flied-password'
        }
        
    }
    return (
        <div className="cont-screen-login">
            <div className="cont-form">
                <h1>Registrarse</h1>
                <form>
                    <div className={"text-field text-flied-password "}>
                        <input
                            type="text"
                            name="nombre"
                            className="form-controlD"
                            required
                            value={ nombre }
                            onChange={ handleInputChange }
                        />  
                        <label>Nombre</label>
                    </div>
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
                   
                    <div className= {`text-field ${ verificatedPassword() }`}>
                        <input
                            type="password"
                            name="password2"
                            className="form-controlD"
                            required
                            value={ password2 }
                            onChange={ handleInputChange }
                        />  
                        <label>Confirmar contraseña</label>
                        {
                            (verificatedPassword() === 'text-flied-incorrect')
                            ? <p className="adver">Contraseñas no coinciden</p>
                            : <p></p> 
                        }
                    </div>
                   
                    <button 
                        className="btn btn-primary " 
                        disabled=
                        { 
                            (isDisableBtnResgistrar())
                            ? "" 
                            : "disabled"
                        }
                    > 
                        Registrar
                    </button>

                </form>
            </div>
        </div>
    )
}
