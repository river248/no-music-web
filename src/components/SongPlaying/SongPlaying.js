import React, { useEffect, useRef } from 'react'
import ImageSong from 'components/Image/ImageSong'
import { CgChevronDoubleLeft, CgChevronDoubleRight } from 'react-icons/cg'
import { FaPause, FaPlay } from 'react-icons/fa'
import { BiListUl } from 'react-icons/bi'
import { MdOutlineReplay } from 'react-icons/md'
import { AiFillHeart } from 'react-icons/ai'
import { changeVolume, togglePlay } from 'actions/audioAction'
import { connect } from 'react-redux'
import { Spinner } from 'react-bootstrap'
import { calculateTime } from 'utils/formatTimer'

function SongPlaying(props) {

    const {
        progressRef, currentProcess, currentTime, duration,
        isPlaying, screenType, currentSong, loading, volume,
        togglePlay, setSeekable, changeVolume
    } = props

    const imageRef = useRef(null)
    const volumeRef = useRef(null)

    useEffect(() => {
        if (isPlaying && !loading)
            imageRef.current.style.setProperty('animation', 'rotate360deg 10s linear forwards infinite')
        if (!isPlaying && !loading)
            imageRef.current.style.setProperty('animation-play-state', 'paused')
    }, [isPlaying, loading])

    const handleSeekingAudio = (e) => {
        progressRef.current.value = e.target.value
        setSeekable(true)
        progressRef.current.style.setProperty('background', `linear-gradient(90deg, #51d8c6 ${e.target.value}%, #fff 0%)`)
    }

    const handleChangeVolume = (e) => {
        changeVolume(e.target.value/100)
        volumeRef.current.style.setProperty('background', `linear-gradient(90deg, #51d8c6 ${e.target.value}%, #fff 0%)`)
    }

    return (
        <>
        <div className='playing-song'>
            <div ref={imageRef}>
                <ImageSong source={currentSong.image} alert={currentSong.image}/>
            </div>
            {screenType === 'M' && <AiFillHeart/>}
        </div>
        <div className='info-playing-song'>
            <span>{currentSong.name}</span>
            <span>{currentSong.singer}</span>
        </div>
        {screenType === 'S' && <AiFillHeart className='heart-icon'/>}
        <div className='audio-controllers'>
            <input
                type='range'
                id='progress-bar'
                ref={progressRef}
                max={100}
                defaultValue={currentProcess}
                onChange={e => handleSeekingAudio(e)}>
            </input>
            <div className='audio-controller-btn'>
                <button><BiListUl/></button>
                <button><CgChevronDoubleLeft/></button>
                    { (isPlaying && !loading) && <button onClick={() => togglePlay(false)}><FaPause/></button>}
                    { loading &&
                        <button>
                            <Spinner animation='border'/>
                        </button>}
                    { (!isPlaying && !loading) && <button onClick={() => togglePlay(true)}><FaPlay/></button> }
                <button><CgChevronDoubleRight/></button>
                <button><MdOutlineReplay/></button>
            </div>
            <div id='time-audio-playing'>
                <span>{calculateTime(currentTime)}</span>
                <span>{calculateTime(duration)}</span>
            </div>
            <input
                type='range'
                id='volume-bar'
                defaultValue={volume*100}
                max={100}
                onChange={handleChangeVolume}
                ref={volumeRef}
            />
        </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        isPlaying: state.audioReducer.isPlaying,
        screenType: state.audioReducer.screenType,
        currentSong: state.audioReducer.currentSong,
        loading: state.audioReducer.loading,
        volume: state.audioReducer.volume
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        togglePlay : (status) => {
            dispatch(togglePlay(status))
        },
        changeVolume : (value) => {
            dispatch(changeVolume(value))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(SongPlaying))