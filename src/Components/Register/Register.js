import React, { useState } from 'react'
import "../../Style/Login.css"
import { useNavigate } from 'react-router-dom'

import { createUserWithEmailAndPassword } from 'firebase/auth'
import { setDoc, doc, Timestamp } from 'firebase/firestore'
import { auth, database } from '../../Firebase/Config'

const Register = () => {

    const Navigate = useNavigate()

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        error: null,
        loading: false
    })

    const { name, email, password, error, loading } = data;

    const OnchangeHandler = (e) => {
        // console.log(e)
        setData({...data, [e.target.name]: e.target.value})
    }

    const onSubmitHandler = async(e) => {
        e.preventDefault();
        setData({...data, error: null, loading: true})
        if(!name || !email || !password){
            // console.log("fill all fields")
            setData({...data, error: "Please fill all required fields"})
        }
        try{
            const result = await createUserWithEmailAndPassword(auth, email, password);        //user created
            // console.log(user.user)
            await setDoc(doc(database, "users", result.user.uid), {
                uid: result.user.uid,
                name,
                email,
                createdAt: Timestamp.fromDate(new Date()),
                isOnline: true
            });                                                                     //add data to database of firestore
            setData({name: '', email: '', password: '', error: null, loading: false})           //fields empty
            Navigate('/')
        }
        catch(err){
            // console.log(err)
            setData({...data, error: err.message, loading: false});
        }
    }

    return (
        <div className="login">
            <div className="form">
                <form className="login-form"  onSubmit={onSubmitHandler}>
                    <span className="material-icons">Create your Account !</span>
                    <br /><br />
                    {error ? (
                        <div className="alert alert-danger" role="alert">{error}</div>
                        ) : null}
                    <input value={name} onChange={OnchangeHandler} placeholder="Name" type="text" name="name" />
                    <input value={email} onChange={OnchangeHandler} placeholder="Email Address" type="text" name='email' />       
                    <input value={password} onChange={OnchangeHandler} placeholder="Password" type="password" name="password" />
                    <div className="btn_container">
                        <button className="btn btn-sm" disabled={loading}>
                            {loading ? 'Creating....' : 'Register'}
                        </button>
                    </div>
                </form>  
            </div>
        </div>
    )
}

export default Register
