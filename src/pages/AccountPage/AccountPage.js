/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io'
import * as Scroll from 'react-scroll'
import { useLocation, useNavigate } from 'react-router-dom'

import './AccountPage.scss'
import astronaut from 'resources/assets/astronaut.jpg'
import background from 'resources/assets/background.png'
import Login from 'components/Login/Login'
import Register from 'components/Register/Register'

function AccountPage() {

    const navigate = useNavigate()
    const location = useLocation()
    const accountRef = useRef(null)
    const accountLeftRef2 = useRef(null)
    const accountRightRef2 = useRef(null)
    
    const [isVisible, setIsVisible] = useState(false)
    const [type, setType] = useState(0)
    const [disable, setDisable] = useState(false)

    const handleScrollToBottom = () => {

        navigate('/sign-up')
        setType(2)
        setDisable(false)

        const scroll = Scroll.animateScroll
        scroll.scrollToBottom({
            duration: 1500,
            delay: 0,
            smooth: true
        })
        
        setTimeout(() => {
            setIsVisible(true)
        }, 1500)

    }

    const handleSrcollToTop = () => {

        accountLeftRef2.current.style.setProperty('animation', 'disappearOpacity 0.5s ease-in-out forwards')
        accountRightRef2.current.style.setProperty('animation', 'disappearOpacity 0.5s ease-in-out forwards')

        setDisable(true)

        setTimeout(() => {
            navigate('/', { replace: true })
            setType(0)
            setIsVisible(false)
        }, 2000)

        const scroll = Scroll.animateScroll
        scroll.scrollToTop({
            duration: 1500,
            delay: 500
        })
        
    }

    const handleDisableLogin = () => {
        accountRef.current.style.setProperty('animation', 'disappearOpacity 0.5s ease-in-out forwards')
        setDisable(true)
        setTimeout(() => {
            navigate('/', { replace: true })
        }, 700)
    }


    useEffect(() => {
        
        window.addEventListener('wheel', e => handleWheelDown(e), {passive: false})
        return () => window.removeEventListener('wheel', e => handleWheelDown(e), {passive: false})

    }, [])

    const handleWheelDown = (e) => {

        if (window.scrollY === 0) {

            setTimeout(() => {
                navigate('/sign-up')
                setType(2)
                setDisable(false)
        
                const scroll = Scroll.animateScroll
                scroll.scrollToBottom({
                    duration: 1900,
                    delay: 0,
                    smooth: true
                })
            }, 200)

            
            setTimeout(() => {
                setIsVisible(true)
            }, 1900)

        } else {

            accountLeftRef2.current?.style.setProperty('animation', 'disappearOpacity 0.5s ease-in-out forwards')
            accountRightRef2.current?.style.setProperty('animation', 'disappearOpacity 0.5s ease-in-out forwards')
    
            setDisable(true)
    
            setTimeout(() => {
                navigate('/', { replace: true })
                setType(0)
                setIsVisible(false)
            }, 2000)
    
            const scroll = Scroll.animateScroll
            scroll.scrollToTop({
                duration: 1500,
                delay: 500
            })

        }
    }

    return (
        <>
        <div id='account-page' className='account-page-container' onWheel={handleWheelDown}>
            <div className='account-page-item'>
                <div className='account-page-header'>
                    <span className='logo-nomusic'>NO MUSIC</span>
                    <div className='account-page-right-header'>
                        <span>Thông tin</span>
                        <span onClick={() => { navigate('/login'); setType(1); setDisable(false) }}>Đăng nhập</span>
                        <span onClick={() => { navigate('/sign-up'); setType(1); setDisable(false) }}>Đăng ký</span>
                    </div>
                </div>

                <div className='account-page-content'>
                    <div className='account-page-content-left'>
                        <div className='account-page-slogan-img'>
                            <img src={astronaut} alt='astronaut'/>
                            <div className='slogan'>
                                <span>NO MUSIC VOL 1</span>
                                <span>Âm nhạc tạo nên chúng ta</span>
                                <span>Chúng ta làm nên âm nhạc</span>
                            </div>
                            <span className='astronaut-title'>ASTRONAUT</span>
                            <svg viewBox="0 0 100 100" className='text-circle'>
                                <defs>
                                    <path id="circle"
                                    d="
                                        M 50, 50
                                        m -37, 0
                                        a 37,37 0 1,1 74,0
                                        a 37,37 0 1,1 -74,0"/>
                                </defs>
                                <text>
                                    <textPath href="#circle">
                                        no music - Vol 1 PLAYING
                                    </textPath>
                                </text>
                            </svg>
                        </div>
                        
                    </div>
                    <div className='account-page-content-right'/>
                </div>

                <div className='account-scroll-btn' onClick={handleScrollToBottom}>
                    <IoMdArrowDropdown/>
                </div>
            </div>
            {((location.pathname === '/sign-up' || location.pathname === '/login') && type === 2) && <div className='account-page-item'>
                <div className='account-page-bottom-content'>
                    <div className='account-page-bottom-left-content'>
                        <div className='bottom-left-img-n-text'>
                            <img src={astronaut} alt='astronaut'/>
                            <span className='bottom-left-nomusic'>NO MUSIC</span>
                            <span className='bottom-left-astonaut'>astronaut</span>
                        </div>
                        { isVisible && <div className='register-container-left' ref={accountLeftRef2}>
                            <span>NO MUSIC</span>
                            <div className='account-scroll-btn account-scroll-btn-2' onClick={handleSrcollToTop}><IoMdArrowDropup/></div>
                            <span>Đăng ký cùng chúng tôi!</span>
                        </div> }
                    </div>
                    <div className='account-page-bottom-right-content'>
                        <img className='background-img-item' src={background} alt='backgound'/>
                        { isVisible && <div className='register-container-right' ref={accountRightRef2}>
                            { location.pathname === '/sign-up' && <Register disable={disable} setType={setType} type={type}/> }
                            { location.pathname === '/login' && <Login disable={disable} setType={setType} type={type}/> }
                        </div> }
                    </div>
                </div>
            </div> }

            { ((location.pathname === '/login' || location.pathname === '/sign-up') && type === 1) && <div className='login-container' ref={accountRef}>
                <div className='fake-container' onClick={handleDisableLogin}/>
                { location.pathname === '/login' && <Login disable={disable} setType={setType} type={type}/> }
                { location.pathname === '/sign-up' && <Register disable={disable} setType={setType} type={type}/> }
            </div> }
        </div>
        </>
    )
}

export default AccountPage
