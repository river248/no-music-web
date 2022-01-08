import {
    TOGGLE_PLAY,
    PLAY_WITH_SCREEN,
    PLAY_THIS_SONG,
    LOADING_SONG,
    CHANGE_VOLUME } from 'utils/constants'

const initialState = {
    screenType: '',
    isPlaying: false,
    songsPlaying: [],
    currentTime: 0,
    durationTime: 0,
    nextSong: 0,
    prevSong: -1,
    currentSong: {},
    volume: 0.8,
    loading: false
}

const audioReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_PLAY:
            return { ...state, isPlaying: action.payload }
        case PLAY_WITH_SCREEN:
            return { ...state, screenType: action.payload }
        case PLAY_THIS_SONG:
            return {
                ...state,
                isPlaying: true,
                loading: true,
                currentSong: action.payload
            }
        case LOADING_SONG:
            return { ...state, loading: action.payload }
        case CHANGE_VOLUME:
            return { ...state, volume: action.payload }
        default:
            return state
    }
}

export default audioReducer