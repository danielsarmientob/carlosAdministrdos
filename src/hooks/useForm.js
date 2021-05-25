import { useState, useEffect } from 'react'

export const useForm = ( initialState = {
    nombre:'',
    email: '',
    password: '',
    password2: '',
    classInput: '',
}) => {
    const [values, setValues] = useState(initialState);
    const reset = ()=>{
        setValues( initialState );
    }
    const handleInputChange = (e)=>{
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }
    const isEmailValid = (email)=>{
        
        // const regex = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        return regex.test(email);
    }

    
    useEffect(()=>{
        if(values.email.trim().length !== 0) {
            if(isEmailValid(values.email)){
                setValues(v => {
                    return{
                        ...v,
                        classInput: 'text-flied-correct'
                    }
                })
            }else{
                setValues(v => {
                    return{
                        ...v,
                        classInput: 'text-flied-incorrect'
                    }
                })
            }
        }
        // else{
        //     setValues(v => {
        //         return{
        //             ...v,
        //             classInput: ''
        //         }
        //     })
        // }
    },[values.email]);
    return [values,handleInputChange,reset];
}
