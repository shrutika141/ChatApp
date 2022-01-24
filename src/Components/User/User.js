import { doc, onSnapshot } from 'firebase/firestore';
import React, { Fragment, useEffect, useState} from 'react';
import { database } from '../../Firebase/Config';
import ProfilePic from '../../Images/ProfilePic.jpg';

const User = ({ user, selectUser, user1, chat }) => {

    // console.log(user);

    const user2 = user?.uid;

    const [data, setData] = useState('');

    useEffect(() => {
        const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`     
        let unsub = onSnapshot(doc(database, 'lastMsgs', id), (doc) => {
            setData(doc.data())
        })
        return () => unsub()
    }, [])

    console.log(data)

    return (
        <Fragment>
            <div className={`user_wrapper ${chat.name === user.name && "selected_user"}`} 
                    onClick={() => selectUser(user)}>
                <div className="user_info">
                    <div className="user_detail">
                        <img src={user.Images || ProfilePic } alt="avatar" className="avatar" /> 
                        <h6>{user.name}</h6>
                    </div>
                    <div className={`user_status ${user.isOnline ? "online" : "offline"}`}></div>
                </div>
            </div>
                <hr />
        </Fragment>
    );
};

export default User;
