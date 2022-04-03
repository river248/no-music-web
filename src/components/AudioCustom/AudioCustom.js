/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import { IoMdArrowDropdown } from 'react-icons/io'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import { CgMiniPlayer } from 'react-icons/cg'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import './AudioCustom.scss'
import { loadingSong, playWithScreen, togglePlay } from 'actions/audioAction'
import SongPlaying from 'components/SongPlaying/SongPlaying'


function AudioCustom(props) {

    const {
        screenType, currentSong, isPlaying, loading, volume, loopType, isMuted,
        playWithScreen, loadingSong, togglePlay
    } = props

    const boxRef = useRef(null)
    const barRef = useRef(null)
    const audioRef = useRef(null)
    const progressRef = useRef(null)
    const navigate = useNavigate()

    const [audio, setAudio] = useState('')
    const [seekable, setSeekable] = useState(false)
    const [currentProcess, setCurrentProcess] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)

    const handleHideBox = () => {

        boxRef.current.style.setProperty('animation', 'slideDown 0.7s ease-out forwards')
        setTimeout(() => {
            playWithScreen('S')
        }, 700)
        
    }

    const handleHideBar = () => {

        barRef.current.style.setProperty('animation', 'slideDown 0.3s ease-out forwards')
        setTimeout(() => {
            playWithScreen('M')
        }, 300)
    }

    useEffect(() => {
        if(isPlaying && !loading)
            audioRef.current.play()
        if(!isPlaying && !loading)
            audioRef.current.pause()
        if(loading)
            progressRef.current.style.setProperty('background', `linear-gradient(90deg, #51d8c6 0%, #fff 0%)`)
    }, [isPlaying, loading])

    useEffect(() => {
        let isSubcribe = true
        const storage = getStorage()
        getDownloadURL(ref(storage, `/${currentSong.audio}`))
        .then(url => {

            if(isSubcribe)
                setAudio(url)
        })
        .catch((error) => console.log(error))

        return () => {
            setAudio('')
            isSubcribe = false
        }
    }, [currentSong])

    useEffect(() => {
        if (!loading && seekable) {
            audioRef.current.currentTime = (progressRef.current.value/100)*audioRef.current.duration
            setSeekable(false)
        }
    }, [seekable])

    useEffect(() => {
        if (!loading)
            audioRef.current.volume = volume
    }, [volume])

    useEffect(() => {
        if (isMuted)
            audioRef.current.muted = true
        else
            audioRef.current.muted = false
    }, [isMuted])

    const handleTimeUpdate = () => {

        let progress = audioRef.current.currentTime
        let percent = (progress/audioRef.current.duration)*100
        progressRef.current.value = Math.floor(percent)
        progressRef.current.style.setProperty('background', `linear-gradient(90deg, #51d8c6 ${percent}%, #fff 0%)`)
        setCurrentTime(audioRef.current.currentTime)

        if (percent === 100) {

            switch (loopType) {
                case 'Loop':
                    togglePlay(false)
                    break
                case 'Repeat':
                    audioRef.current.play()
                    break
                case 'Shuffle':
                    togglePlay(false)
                    break
                default:
                    break
            }
            setCurrentProcess(0)
            setCurrentTime(0)
            progressRef.current.style.setProperty('background', `linear-gradient(90deg, #51d8c6 0%, #fff 0%)`)
        }
    }

    const handleCanPlay = () => {
        loadingSong(false)
        audioRef.current.volume = volume
        setDuration(audioRef.current.duration)
    }

    return (
        <>
        { screenType === 'M' && <div className='play-box-container' ref={boxRef}>
            <IoMdArrowDropdown onClick={handleHideBox}/>
            <div className='full-screen-btn' onClick={() => navigate('detail-song')}/>
            <SongPlaying
                progressRef = {progressRef}
                setSeekable = {setSeekable}
                currentProcess = {currentProcess}
                currentTime = {currentTime}
                duration = {duration}
            />
        </div> }
        { screenType === 'S' && <div className='play-bar-container' ref={barRef} >
            <div className='fake-play-bar' onClick={() => navigate('detail-song')}/>
            <SongPlaying
                progressRef = {progressRef}
                setSeekable = {setSeekable}
                currentProcess = {currentProcess}
                currentTime = {currentTime}
                duration = {duration}
            />
            <div id='play-box-screen' onClick={handleHideBar}>
                <CgMiniPlayer/>
            </div>
        </div> }
        <audio
            ref={audioRef}
            src={audio} preload='metadata'
            onCanPlayThrough={handleCanPlay}
            onTimeUpdate={handleTimeUpdate}/>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        screenType: state.audioReducer.screenType,
        currentSong: state.audioReducer.currentSong,
        isPlaying: state.audioReducer.isPlaying,
        loading: state.audioReducer.loading,
        volume: state.audioReducer.volume,
        loopType: state.audioReducer.loopType,
        isMuted : state.audioReducer.isMuted
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        playWithScreen : (screenType) => {
            dispatch(playWithScreen(screenType))
        },
        loadingSong : (status) => {
            dispatch(loadingSong(status))
        },
        togglePlay : (status) => {
            dispatch(togglePlay(status))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioCustom)
