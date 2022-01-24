import React, { useEffect, useState } from 'react'

import "../../Style/Profile.css"
import Camera from '../../Images/Camera'
import ProfilePic from '../../Images/ProfilePic.jpg';
import Delete from '../../Images/Delete';

import { storage, database, auth } from '../../Firebase/Config';
import { ref, getDownloadURL, uploadBytes, deleteObject } from 'firebase/storage';
import { getDoc, doc, updateDoc } from 'firebase/firestore';

import { useNavigate } from 'react-router-dom';


const Profile = () => {

    const Navigate = useNavigate();

    const [img, setImg] = useState('');
    const [user, setUser] = useState('');

    const onImgHandler = (e) => {
        setImg(e.target.files[0])
    }

    // console.log(img)

    useEffect(() => {
        
        getDoc(doc(database, "users", auth.currentUser.uid))                            //store img in database
            .then((docSnap) => {
                if(docSnap.exists){
                    setUser(docSnap.data());
                }
            })
            .catch((err) => {
                console.log(err)
            })

        if(img){
            const uploading = async() => {                                                                      //uploading new profile pic
                const imgRef = ref(storage, `images/${new Date(new Date().getTime())} - ${img.name}`)
                
                try {
                    if(user.imagePath){
                        await deleteObject(ref(storage, user.imagePath))
                    }
                    const snap = await uploadBytes(imgRef, img)                                              //upload images
                    const url = await getDownloadURL(ref(storage, snap.ref.fullPath))                        //getting the URL for remove and update image
                    
                    await updateDoc(doc(database, "users", auth.currentUser.uid), {
                        images: url,
                        imagePath : snap.ref.fullPath
                    })
                    setImg('');

                } catch (err) {
                    console.log(err.message)
                }
            }
            uploading();
        }

    }, [img])

    const DeleteImage = async() => {
        try {
            const confirm = window.confirm("Delete image ?")
            if(confirm){
                await deleteObject(ref(storage, user.imagePath))            //Image delete
                
                await updateDoc(doc(database, "users", auth.currentUser.uid), {
                    images: '',
                    imagePath: ''
                })
                Navigate('/');
            }
        } catch (err) {
            console.log(err)
        }
    }

    return  user ? (
          <div className="container-fluid mt-3">
            <div className="row">
                <div className="col-12 ">
                    <div className="card">
                        <div className="card-horizontal">
                            <div className="img-square-wrapper">
                                <img className="img-thumbnail"src={user.images || ProfilePic} alt="Card image cap" style={{width: "10rem", height: "10rem"}} />
                                <div className="overlay">
                                    <label htmlFor="photo"><Camera /></label>
                                    {
                                        user.images ? <Delete DeleteImage={DeleteImage} /> : null
                                    }
                                    <input type="file" accept="image/*" style={{ display: "none" }} id="photo" onChange={onImgHandler} />
                                </div>
                            </div>
                            <div className="card-body">
                                <h4 className="card-title">Name : {user.name}</h4>
                                <p className="card-text">E-mail : {user.email}</p>
                                <p className="text-muted"><strong>Joined on : </strong> {user.createdAt.toDate().toDateString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : null
}

export default Profile
