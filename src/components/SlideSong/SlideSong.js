import React/*, { useEffect, useRef, useState }*/ from 'react'
import { connect } from 'react-redux'
import { IoPause, IoPlay } from 'react-icons/io5'

import './SlideSong.scss'
import { playThisSong, playWithScreen, togglePlay } from 'actions/audioAction'
import ImageSong from 'components/Image/ImageSong'

function SlideSong(props) {

    const {
        hotsong, /*index, */currentSong,
        isPlaying, screenType,
        togglePlay, playWithScreen, playThisSong
    } = props

    // const [slide, setSlide] = useState([1,2,3,4])

    // const timer = useRef(null)

    // useEffect(() => {
        
    //     timer.current = setInterval(() => {
    //         const clone = [...slide]
    //         const lastEle = clone.pop()
    //         clone.unshift(lastEle)
    //         setSlide(clone)
    //     }, 5000)

    //     return () => clearInterval(timer.current)

    // }, [slide])

    const handlePlayThisSong = (hotsong) => {
        togglePlay(true)
        playThisSong(hotsong)
        if (!screenType)
            playWithScreen('M')
    }

    return (

        <div className='slide-song-container'>
            <div className='slide-song-image'>
                <ImageSong source={hotsong.image} alert={hotsong.name}/>
                <div className='middle-slide-song'>
                    { (isPlaying && hotsong._id === currentSong._id) ?
                    <IoPause onClick={() => togglePlay(false)}/>:
                    <IoPlay onClick={() => handlePlayThisSong(hotsong)}/>
                    }
                </div>
            </div>
            <span className='slide-song-name'>{hotsong.name}</span>
            <span className='slide-song-singer'>{hotsong.singer}</span>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SlideSong)
