import React, { useEffect, useRef, useState } from 'react'
import { FaRegPaperPlane } from 'react-icons/fa'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { IoMdArrowDropdownCircle } from 'react-icons/io'
import { useLocation, useNavigate } from 'react-router-dom'

import './Header.scss'
import { getToken } from 'components/Auth/Auth'
import ImageSong from 'components/Image/ImageSong'

function Header() {

    const [currentPage, setCurrentPage] = useState('Trang chủ')
    const [toggleUser, setToggleUser] = useState(false)
    const [toggleNotification, setToggleNotification] = useState(false)
    const dropDownUserRef = useRef(null)
    const notificationRef = useRef(null)

    const location = useLocation()
    const token = getToken()
    const navigate = useNavigate()

    useEffect(() => {
        switch (location.pathname) {
            case '/home':
                setCurrentPage('Trang chủ')
                break
            case '/search':
                setCurrentPage('Tìm kiếm')
                break
            case '/discovery':
                setCurrentPage('Khám phá')
                break
            case '/chart':
                setCurrentPage('BXH')
                break
            default:
                setCurrentPage('Trang chủ')
        }
    }, [location.pathname])
    
    useEffect(() => {

        const checkIfClickedOutside = e => {
            // If the menu is open and the clicked target is not within the menu,
            // then close the menu
            if (toggleNotification && notificationRef.current && !notificationRef.current.contains(e.target)) {
                setToggleNotification(false)
            }
        }
      
        document.addEventListener('mousedown', checkIfClickedOutside)
      
        return () => {
            // Cleanup the event listener
            document.removeEventListener('mousedown', checkIfClickedOutside)
        }

    }, [toggleNotification])

    useEffect(() => {

        const checkIfClickedOutside = e => {
            // If the menu is open and the clicked target is not within the menu,
            // then close the menu
            if (toggleUser && dropDownUserRef.current && !dropDownUserRef.current.contains(e.target)) {
                setToggleUser(false)
            }
        }
      
        document.addEventListener('mousedown', checkIfClickedOutside)
      
        return () => {
            // Cleanup the event listener
            document.removeEventListener('mousedown', checkIfClickedOutside)
        }

    }, [toggleUser])

    const handleGetNotifications = () => {
        if (token)
            setToggleNotification(!toggleNotification)
        else
            alert('Vui lòng đăng nhập để thực hiện tính năng này!')
    }

    const handleUserInfo = () => {
        if (token)
        console.log('infomation')
        else
            alert('Vui lòng đăng nhập để thực hiện tính năng này!')
    }

    return (
        <div className='header-container'>

            <div className='header-left-container'>                
                <span className='header-logo'>NO</span>
                <span className='current-page'>{currentPage}</span>
            </div>
            <form>
                <span></span>
                <input placeholder='Tìm kiếm...'/>
            </form>
            <div className='header-right-container'>
                <div className='header-icons' ref={notificationRef}>
                    <div className='header-icon-item-1' onClick={handleGetNotifications}>
                        <FaRegPaperPlane/>
                        {token && <span>0</span>}
                    </div>
                    { (toggleNotification && token) &&
                    <div className='header-drop-down drop-down-notification'>
                        <span id='none-notify'>Bạn chưa có thông báo mới!</span>
                    </div>}
                </div>
                <div className='header-icons'>
                    <label htmlFor={ token ? 'audio-file' : ''}><AiOutlineCloudUpload/></label>
                    { token && <input type='file' id='audio-file' accept='audio/*'/>}
                </div>

                <div className='header-avatar' onClick={handleUserInfo}>
                    { token && <ImageSong source={'/user/id012345678/avatar.jpg'} alert={'/avatar/user/avatar.jpg'}/> }
                </div>
                <div className='header-icons' ref={dropDownUserRef}>
                    <IoMdArrowDropdownCircle onClick={() => setToggleUser(!toggleUser)}/>

                    { (toggleUser && token) &&
                    <div className='header-drop-down drop-down-user'>
                        <span>Xem trang cá nhân</span>
                        <span>Đăng xuất</span>
                    </div>}

                    { (toggleUser && !token) &&
                    <div className='header-drop-down drop-down-user'>
                        <span onClick={() => navigate('/account')}>Tài khoản</span>
                    </div>}
                </div>
            </div>

        </div>
    )
}

export default Header
