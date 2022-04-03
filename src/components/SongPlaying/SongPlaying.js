/* eslint-disable jsx-a11y/no-distracting-elements */
import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { Spinner } from 'react-bootstrap'
import { CgChevronDoubleLeft, CgChevronDoubleRight } from 'react-icons/cg'
import { FaPause, FaPlay } from 'react-icons/fa'
import { BiListUl } from 'react-icons/bi'
import { RiRepeat2Fill, RiRepeatOneFill } from 'react-icons/ri'
import { MdVolumeUp, MdVolumeOff, MdVolumeDown, MdVolumeMute } from 'react-icons/md'
import { IoShuffle } from 'react-icons/io5'
import { AiFillHeart } from 'react-icons/ai'

import ImageSong from 'components/Image/ImageSong'
import { changeVolume, loopingSong, toggleMuted, togglePlay } from 'actions/audioAction'
import { calculateTime } from 'utils/formatTimer'

function SongPlaying(props) {

    const {
        progressRef, currentProcess, currentTime, duration,
        isPlaying, screenType, currentSong, loading, volume, loopType, isMuted,
        togglePlay, setSeekable, changeVolume, loopingSong, toggleMuted
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

    const handleLoopStatus = () => {
        switch (loopType) {
            case 'Loop':
                loopingSong('Repeat')
                break
            case 'Repeat':
                loopingSong('Shuffle')
                break
            case 'Shuffle':
                loopingSong('Loop')
                break
            default:
                break
        }
    }

    const handleToggleMuted = () => {
        if (isMuted)
            toggleMuted(false)
        else
            toggleMuted(true)
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
            { (screenType === 'S' && isPlaying) && <marquee dỉrection='left'>
                <span>{currentSong.name}</span><br/>
                <span>{currentSong.singer}</span>
            </marquee>}
            { (screenType === 'M' || !isPlaying) && <>
                <span>{currentSong.name}</span>
                <span>{currentSong.singer}</span>
            </>}
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
                <button onClick={handleLoopStatus}>
                    { (loopType === 'Loop') && <RiRepeat2Fill/>}
                    { (loopType === 'Repeat') && <RiRepeatOneFill/>}
                    { (loopType === 'Shuffle') && <IoShuffle/>}
                </button>
            </div>
            <div id='time-audio-playing'>
                <span>{calculateTime(currentTime)}</span>
                <span>{calculateTime(duration)}</span>
            </div>
            <div className='volume-container'>
                <button onClick={handleToggleMuted}>
                    { isMuted ? <MdVolumeOff/> :
                        <>
                        { (volume >= 0.5) && <MdVolumeUp/> }
                        { (volume < 0.5 && volume > 0) && <MdVolumeDown/>}
                        { (volume === 0) && <MdVolumeMute/>}
                        </>
                    }
                </button>
                <input
                    type='range'
                    id='volume-bar'
                    defaultValue={volume*100}
                    max={100}
                    onChange={handleChangeVolume}
                    ref={volumeRef}
                />
            </div>
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
        volume: state.audioReducer.volume,
        loopType: state.audioReducer.loopType,
        isMuted: state.audioReducer.isMuted
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        togglePlay : (status) => {
            dispatch(togglePlay(status))
        },
        changeVolume : (value) => {
            dispatch(changeVolume(value))
        },
        loopingSong : (type) => {
            dispatch(loopingSong(type))
        },
        toggleMuted : (status) => {
            dispatch(toggleMuted(status))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(SongPlaying))
