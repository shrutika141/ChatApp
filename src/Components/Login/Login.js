import React, { useState } from 'react'
import '../../Style/Login.css'
import { useNavigate } from 'react-router-dom';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, database } from '../../Firebase/Config';

const Login = () => {

    const Navigate = useNavigate()

    const [data, setData] = useState({
        email: "",
        password: "",
        error: null,
        loading: false
    })

    const { email, password, error, loading } = data;

    const OnchangeHandler = (e) => {
        // console.log(e)
        setData({...data, [e.target.name]: e.target.value})
    }

    const onSubmitHandler = async(e) => {
        e.preventDefault();
        setData({...data, error: null, loading: true})
        if(!email || !password){
            // console.log("fill all fields")
            setData({...data, error: "Please fill all required fields"})
        }
        try{
            const result = await signInWithEmailAndPassword(auth, email, password);        //user loggedin
            // console.log(user.user)
            await updateDoc(doc(database, "users", result.user.uid), {
                isOnline: true
            });
            setData({ email: '', password: '', error: null, loading: false})           //fields empty
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
                <form className="login-form" onSubmit={onSubmitHandler}>
                    <span className="material-icons">Log In to your Account !</span>
                    <br /><br />
                    <input type="text" name="email" value={email} placeholder="Email Address" onChange={OnchangeHandler} />
                    <input type="password" name="password" value={password} placeholder="Password" onChange={OnchangeHandler} />        
                    <div className="btn_container">
                        <button className="btn btn-sm" disabled={loading}>
                            {loading ? 'Logging in' : 'Login'}
                        </button>
                    </div>
                </form>  
            </div>
        </div>
    )
}

export default Login
