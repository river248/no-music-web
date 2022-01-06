import React, { useEffect, useRef, useState } from 'react'
import ImageSong from 'components/Image/ImageSong'
import MainLayout from 'layouts/MainLayout'
import { IoPlay } from 'react-icons/io5'

import './HomePage.scss'

function HomePage() {

    const [slide, setSlide] = useState([1,2,3,4])

    const timer = useRef(null)

    useEffect(() => {
        
        timer.current = setInterval(() => {
            const clone = [...slide]
            const lastEle = clone.pop()
            clone.unshift(lastEle)
            setSlide(clone)
        }, 5000)

        return () => clearInterval(timer.current)

    }, [slide])

    const listHotSong = [
        {name: 'Trốn tìm', singer: 'Đen Vâu ft. MTV Band', image: 'tron-tim.jpg'},
        {name: 'Tìm hành tinh khác', singer: 'Vũ Cát Tường', image: 'tim-hanh-tinh-khac.jpg'},
        {name: 'Bước qua nhau', singer: 'Vũ', image: 'buoc-qua-nhau.jpg'},
        {name: 'Mang tiền về cho mẹ', singer: 'Đen Vâu ft. Nguyên Thảo', image: 'mang-tien-ve-cho-me.jpg'},
    ]

    const listRecentlySong = [
        {name: 'Thói quen', singer: 'Hoàng Dũng ft. GDucky', image: 'thoi-quen.jpg'},
        {name: 'Chúng ta của hiện tại', singer: 'Sơn Tùng M-TP', image: 'chung-ta-cua-hien-tai.jpg'},
        {name: 'Tết về sớm nhé', singer: 'Phan Mạnh Quỳnh', image: 'tet-ve-som-nhe.jpg'},
        {name: 'Sẽ hứa đi cùng nhau', singer: 'Soobin Hoàng Sơn ft. Da Lab', image: 'se-hua-di-cung-nhau.jpg'}
    ]
    
    return (
        <MainLayout>
            <div className='hot-song-container'>
                { listHotSong.map((hotsong, index) => (
                <div className={`hot-song-container-item hot-song-container-item-${slide[index]}`} key={index}>
                    <div className='hot-song-image'>
                        <ImageSong source={hotsong.image} alert={hotsong.name}/>
                        <div className='middle-hot-song'>
                            <IoPlay/>
                        </div>
                    </div>
                    <span className='hot-song-name'>{hotsong.name}</span>
                    <span className='hot-song-singer'>{hotsong.singer}</span>
                </div>))}
            </div>
            <hr/>
            <div className='home-page-title'>
                <span>Gần đây</span>
                <span>Tất cả...</span>
            </div>
            <div className='recently-song-container'>
                {listRecentlySong.map((recentlySong, index) => (<div className='recently-song-container-item' key={index}>
                    <div className='recently-song-image'>
                        <ImageSong source={recentlySong.image} alert={recentlySong.name}/>
                        <div className='middle-recently-song'>
                            <IoPlay/>
                        </div>
                    </div>
                    <span className='recently-song-name'>{recentlySong.name}</span>
                    <span className='recently-song-singer'>{recentlySong.singer}</span>
                </div>))}
            </div> 
        </MainLayout>
    )
}

export default HomePage
