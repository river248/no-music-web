import React from 'react'
import ImageSong from 'components/Image/ImageSong'
import { IoPause, IoPlay } from 'react-icons/io5'

import './HomePage.scss'
import { playThisSong, playWithScreen, togglePlay } from 'actions/audioAction'
import { connect } from 'react-redux'
import SlideSong from 'components/SlideSong/SlideSong'

function HomePage(props) {

    const {
        isPlaying, screenType, currentSong,
        togglePlay, playWithScreen, playThisSong
    } = props

    const listHotSong = [
        {_id: 1, name: 'Trốn tìm', singer: 'Đen Vâu ft. MTV Band', image: 'tron-tim.jpg', audio: 'audio/tron-tim.mp3'},
        {_id: 2, name: 'Tìm hành tinh khác', singer: 'Vũ Cát Tường', image: 'tim-hanh-tinh-khac.jpg', audio: 'audio/tim-hanh-tinh-khac.mp3'},
        {_id: 3, name: 'Bước qua nhau', singer: 'Vũ', image: 'buoc-qua-nhau.jpg', audio: 'audio/buoc-qua-nhau.mp3'},
        {_id: 4, name: 'Mang tiền về cho mẹ', singer: 'Đen Vâu ft. Nguyên Thảo', image: 'mang-tien-ve-cho-me.jpg', audio: 'audio/mang-tien-ve-cho-me.mp3'},
    ]

    const listRecentlySong = [
        {_id: 5, name: 'Thói quen', singer: 'Hoàng Dũng ft. GDucky', image: 'thoi-quen.jpg', audio: 'audio/thoi-quen.mp3'},
        {_id: 6, name: 'Chúng ta của hiện tại', singer: 'Sơn Tùng M-TP', image: 'chung-ta-cua-hien-tai.jpg', audio: 'audio/chung-ta-cua-hien-tai.mp3'},
        {_id: 7, name: 'Tết về sớm nhé', singer: 'Phan Mạnh Quỳnh', image: 'tet-ve-som-nhe.jpg', audio: 'audio/tet-ve-som-nhe.mp3'},
        {_id: 8, name: 'Sẽ hứa đi cùng nhau', singer: 'Soobin Hoàng Sơn ft. Da Lab', image: 'se-hua-di-cung-nhau.jpg', audio: 'audio/se-hua-di-cung-nhau.mp3'}
    ]
    
    const handlePlayThisSong = (recentlySong) => {
        togglePlay(true)
        playThisSong(recentlySong)

        if (!screenType)
            playWithScreen('M')
    }

    return (
        <>
            <div className='hot-song-container'>
                { listHotSong.map((hotsong, index) => (
                    <SlideSong key={hotsong._id} hotsong={hotsong} index={index}/>
                ))}
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
                            { (isPlaying && recentlySong._id === currentSong._id) ?
                            <IoPause onClick={() => togglePlay(false)}/>:
                            <IoPlay onClick={() => handlePlayThisSong(recentlySong)}/>
                            }
                        </div>
                    </div>
                    <span className='recently-song-name'>{recentlySong.name}</span>
                    <span className='recently-song-singer'>{recentlySong.singer}</span>
                </div>))}
            </div> 
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        isPlaying: state.audioReducer.isPlaying,
        screenType: state.audioReducer.screenType,
        currentSong: state.audioReducer.currentSong
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        togglePlay : (status) => {
            dispatch(togglePlay(status))
        },
        playWithScreen : (scrernType) => {
            dispatch(playWithScreen(scrernType))
        },
        playThisSong : (info) => {
            dispatch(playThisSong(info))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
