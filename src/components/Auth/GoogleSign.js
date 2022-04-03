import React from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { FcGoogle } from 'react-icons/fc'

import firebaseApp from 'config/firebaseConfig'

firebaseApp()

function GoogleSign({ className }) {

    const auth = getAuth()
    const provider = new GoogleAuthProvider()

    const handleGoogleSign = () => {
        signInWithPopup(auth, provider).then(res => console.log(res.user))
    }

    return (
        <button className={className} onClick={handleGoogleSign}>
            <FcGoogle/>
            <span>Tiếp tục với Google</span>
        </button>
    )
}

export default GoogleSign
