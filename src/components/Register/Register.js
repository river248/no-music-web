import React, { useEffect, useRef } from 'react'

import './Register.scss'
import GoogleSign from 'components/Auth/GoogleSign'
import FacebookSign from 'components/Auth/FacebookSign'
import { useNavigate } from 'react-router-dom'

function Register({ disable, setType, type }) {

    const registerRef = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        if(disable)
            registerRef.current.style.setProperty('animation', 'disappearSlide 0.5s ease-in-out forwards')
    }, [disable])

    const handleSignIn = () => {
        registerRef.current.style.setProperty('animation', 'disappearSlideOpacity 0.5s ease-in-out forwards')
        setTimeout(() => {
            navigate('/login')
            if(type === 1)
                setType(1)
            if(type === 2)
                setType(2)
        }, 700)
    }

    const handleGoToHome = () => {
        registerRef.current.style.setProperty('animation', 'disappearSlideOpacity 0.5s ease-in-out forwards')
        setTimeout(() => {
            navigate('/home')
            setType(0)
        }, 700)
    }

    return (
        <div className='register-box' ref={registerRef}>
            <span>NO</span>
            <span>Chào mừng đến với NOMUSIC</span>
            <div className='form-register'>
                <input type='email' placeholder='Tài khoản'/>
                <input type='password' placeholder='Mật khẩu'/>
                <input type='number' placeholder='Tuổi' min={10} max={100}/>
                <button>Đăng ký</button>
            </div>
            <span>OR</span>
            <FacebookSign className='facebook-login-btn'/>
            <GoogleSign className='google-login-btn'/>
            <span className='text-bottom-register' onClick={handleSignIn}>Bạn đã có tài khoản? Đăng nhập ngay!</span>
            <span className='text-bottom-register' onClick={handleGoToHome}>Bạn đang bận? Bắt đầu ngay!</span>
            <div className='other-login-btn' onClick={handleGoToHome}>Đăng nhập bằng tài khoản khách</div>
        </div>
    )
}

export default Register
