import React, { Fragment, useContext } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import { signOut } from 'firebase/auth'
import { auth, database } from '../../Firebase/Config'
import { doc, updateDoc } from 'firebase/firestore'

import { AuthContext } from '../../Context/Auth'


const Header = () => {

    const { user } = useContext(AuthContext);
    const Navigate = useNavigate();

    const onLogoutHandler = async(e) => {
        await updateDoc(doc(database, "users", auth.currentUser.uid), {
            isOnline: false
        });   
        await signOut(auth);
        Navigate('/login')
    }
    return (
         <nav className="navbar navbar-expand-lg navbar-dark " style={{backgroundColor: "#5c7fce"}}>
            <div>
                <Link className="navbar-brand" to="/">Chatbot</Link>
            </div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">               
                    {
                    user ? (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/chat">Chat</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/profile">Profile </Link>
                            </li>
                            <li className="nav-item">
                                <Link onClick={onLogoutHandler} className="nav-link" to="/">Logout</Link>
                            </li>
                        </>
                    ) : (
                        <Fragment>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">Register</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link"to="/login">Login</Link>
                            </li>
                        </Fragment>
                        )
                    }
                </ul>
            </div>
        </nav>
    )
}

export default Header
