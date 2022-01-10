import React, { useEffect, useRef } from 'react'

import './Login.scss'
import GoogleSign from 'components/Auth/GoogleSign'
import FacebookSign from 'components/Auth/FacebookSign'
import { useNavigate } from 'react-router-dom'

function Login({ disable, setType, type }) {

    const loginRef = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        if(disable)
            loginRef.current.style.setProperty('animation', 'disappearSlide 0.5s ease-in-out forwards')
    }, [disable])

    const handleSignUp = () => {
        loginRef.current.style.setProperty('animation', 'disappearSlideOpacity 0.5s ease-in-out forwards')
        setTimeout(() => {
            navigate('sign-up')
            if(type === 1)
                setType(1)
            if(type === 2)
                setType(2)
        }, 700)
    }

    const handleGoToHome = () => {
        loginRef.current.style.setProperty('animation', 'disappearSlideOpacity 0.5s ease-in-out forwards')
        setTimeout(() => {
            navigate('/')
            setType(0)
        }, 700)
    }

    return (
        <div className='login-box' ref={loginRef}>
            <span>NO</span>
            <span>Chào mừng đến với NOMUSIC</span>
            <div className='form-login'>
                <input type='email' placeholder='Tài khoản'/>
                <input type='password' placeholder='Mật khẩu'/>
                <label>Quên mật khẩu?</label>
                <button>Đăng nhập</button>
            </div>
            <span>OR</span>
            <FacebookSign className='facebook-login-btn'/>
            <GoogleSign className='google-login-btn'/>
            <span className='text-bottom-login' onClick={handleSignUp}>Chưa có tài khoản? Đăng ký ngay!</span>
            <span className='text-bottom-login' onClick={handleGoToHome}>Bạn đang bận? Bắt đầu ngay!</span>
        </div>
    )
}

export default Login
