import React from 'react'
import { getAuth, signInWithPopup, FacebookAuthProvider } from 'firebase/auth'
import firebaseApp from 'config/firebaseConfig'
import { FaFacebook } from 'react-icons/fa'

firebaseApp()

function FacebookSign({ className }) {

    const auth = getAuth()
    const provider = new FacebookAuthProvider()

    const handleFacebookSign = () => {
        signInWithPopup(auth, provider).then(res => console.log(res.user))
    }

    return (
        <button className={className} onClick={handleFacebookSign}>
            <FaFacebook/>
            <span>Tiếp tục với Facebook</span>
        </button>
    )
}

export default FacebookSign
