import React, { useEffect, useState } from 'react'
import { FaRegPaperPlane } from 'react-icons/fa'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { IoMdArrowDropdownCircle } from 'react-icons/io'

import './Header.scss'
import { useLocation } from 'react-router-dom'

function Header() {

    const [currentPage, setCurrentPage] = useState('Trang chủ')
    const location = useLocation()

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
                <div className='header-icons'>
                    <FaRegPaperPlane/>
                    <span>1</span>
                </div>
                <div className='header-icons'>
                    <AiOutlineCloudUpload/>
                </div>

                <div className='header-avatar'>

                </div>
                <div className='header-icons'>
                    <IoMdArrowDropdownCircle/>
                </div>
            </div>
        </div>
    )
}

export default Header
