import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { IoHomeOutline } from 'react-icons/io5'
import { GiWorld } from 'react-icons/gi'
import { BiSearch } from 'react-icons/bi'
import { HiOutlineChevronDoubleUp } from 'react-icons/hi'
import { GoThreeBars } from 'react-icons/go'

import './Navigation.scss'

function Navigation({ setIsWiden }) {

    const location = useLocation()
    const [isVisible, setIsVisible] = useState(false)
    const navRef = useRef(null)

    const handleToggleNav = () => {
        if (isVisible) {
            navRef.current.style.setProperty('animation', 'slideRight2Left 0.5s ease-in-out forwards')
            setTimeout(() => {
                setIsVisible(false)
            }, 500)
            setIsWiden(true)
        } else {
            setIsVisible(true)
            setIsWiden(false)
        }
    }

    return (
        <>
        { isVisible && <div className='navigation-container' ref={navRef}>
            <ul>
                <li className={ location.pathname === '/home' || location.pathname === '/detail-song' ? 'active' : ''}>
                    <Link to='home'>
                        <IoHomeOutline/>
                        <span>Trang chủ</span>
                    </Link>
                </li>
                <li className={ location.pathname === '/search' ? 'active' : ''}>
                    <Link to='search'>
                        <BiSearch/>
                        <span>Tìm kiếm</span>
                    </Link>
                </li>
                <li className={ location.pathname === '/discovery' ? 'active' : ''}>
                    <Link to='discovery'>
                        <GiWorld/>
                        <span>Khám phá</span>
                    </Link>
                </li>
                <li className={ location.pathname === '/chart' ? 'active' : ''}>
                    <Link to='chart'>
                        <HiOutlineChevronDoubleUp/>
                        <span>Bảng xếp hạng</span>
                    </Link>
                </li>
                <hr/>
                <div className='current-link'/>
            </ul>
        </div>}
        <div className='nav-icon' onClick={handleToggleNav}>
            <GoThreeBars/>
        </div>
        </>
    )
}

export default Navigation
