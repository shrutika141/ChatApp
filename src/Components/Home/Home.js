import React, { useEffect, useState } from 'react'

import { auth, database, storage } from '../../Firebase/Config';
import { collection, query, where, onSnapshot, addDoc, Timestamp, orderBy, setDoc, doc } from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';

import ProfilePic from '../../Images/ProfilePic.jpg';
// import "../../Style/Chat.css"
import "../../Style/Home.css"
// import '../../App.css';
import User from '../User/User';
import UserProfile from '../UserProfile/UserProfile.js';
import MessageForm from '../MessageForm/MessageForm';
import Message from '../Message/Message';


const Home = () => {

    const [users, setUsers] = useState([]);
    const [chat, setChat] = useState('');
    const [text, setText] = useState('')
    const [img, setImg] = useState('')
    const [msgs, setMsgs] = useState('')

    const user1 = auth.currentUser.uid;

    useEffect(() => {
        const userRef = collection(database, 'users');

        // create a query object

        const createQuery = query(userRef, where('uid', 'not-in', [user1]));

        // excute query

        const unsub = onSnapshot(createQuery, async (querySnapshot) => {
            let users = [];
            
             await querySnapshot.forEach(async (doc) => {
                await users.push(doc.data())
            });
            setUsers(users);
        })
        return () => unsub();
    }, [])

    

    // console.log(users)

    const Selectuser = (SelectedUser) => {            //select user to send msgs
      setChat(SelectedUser)

      const user2 = SelectedUser.uid;
      const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`

      const msgRef = collection(database, 'messages', id, 'chat')

      const q = query(msgRef, orderBy("createdAt", "asc"))        //arrange all the msg by time

      onSnapshot(q, (querysnapshot) => {
        let msg = [];
        querysnapshot.forEach((e) => {
          msg.push(e.data())
        })
        setMsgs(msg)
      })
    }

    // console.log(msgs)

    const submitHandler = async(e) => {               //send msg to user
      e.preventDefault();
      const user2 = chat.uid

      const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`     //unique identifier to identify the person to chat
      
      let url;
      if(img){
        const imgRef = ref( storage, `images/${new Date().getTime()} - ${img.name}` );

        const snap = await uploadBytes(imgRef, img)
        const newUrl = await getDownloadURL(ref(storage, snap.ref.fullPath))
        url = newUrl;
      }

      await addDoc(collection(database, "messages", id, "chat"),{             //store msgs
          text,
          from: user1,
          to: user2,
          createdAt: Timestamp.fromDate(new Date()),
          media: url || ""
      })

      await setDoc(doc(database, "lastMsgs", id), {
        text,
        from: user1,
        to: user2,
        createdAt: Timestamp.fromDate(new Date()),
        media: url || "",
        unread: true,
      })
      setText('')
    }

    return (
        <div className="home_container">
            <div className="users_container">
              <UserProfile />
              <hr />
              {
                users.map(e => (
                  <User 
                      key={e.uid} 
                      user={e}
                      selectUser={Selectuser}
                      user1={user1}
                      chat={chat}
                  />
                ))
              }
        
            </div>
            <div className="messages_container">
                <div className="messages_user">
                    {
                        chat ? (
                                <h5>{chat.name}</h5>
                        ) : (
                              <p className="no_conv">Select a user to start conversation</p>
                        )
                    }      
                </div>
                <div className="messages">
                    {
                        msgs.length ? msgs.map((e, i) => (
                          <Message key={i} msg={e} user1={user1} />
                        ) ) : null 
                    }
                
                </div>
                <MessageForm submitHandler={submitHandler} text={text} setText={setText} setImg={setImg} />
            </div>
        </div>
    )
}

export default Home
