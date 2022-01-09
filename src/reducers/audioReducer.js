import {
    TOGGLE_PLAY,
    PLAY_WITH_SCREEN,
    PLAY_THIS_SONG,
    LOADING_SONG,
    CHANGE_VOLUME,
    LOOPING,
    TOGGLE_MUTED
} from 'utils/constants'

const data = JSON.parse(localStorage.getItem('no_music_player'))

const initialState = data ? data : {
    screenType: '',
    isPlaying: false,
    listSongs: [],
    // currentTime: 0,
    // durationTime: 0,
    nextSong: {},
    prevSong: [],
    currentSong: {},
    volume: 0.8,
    loading: false,
    loopType: 'Loop',
    isMuted: false
}

const audioReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_PLAY:
            const isPlaying = { ...state, isPlaying: action.payload }
            // localStorage.setItem('no_music_player', JSON.stringify(isPlaying))
            return isPlaying
        case PLAY_WITH_SCREEN:
            const screenType = { ...state, screenType: action.payload }
            // localStorage.setItem('no_music_player', JSON.stringify(screenType))
            return screenType
        case PLAY_THIS_SONG:
            const thisSong = {
                ...state,
                isPlaying: true,
                loading: true,
                currentSong: { ...action.payload }
            }
            // localStorage.setItem('no_music_player', JSON.stringify(thisSong))
            return thisSong
        case LOADING_SONG:
            const loading = { ...state, loading: action.payload }
            // localStorage.setItem('no_music_player', JSON.stringify(loading))
            return loading
        case CHANGE_VOLUME:
            const volume = { ...state, volume: action.payload }
            // localStorage.setItem('no_music_player', JSON.stringify(volume))
            return volume
        case LOOPING:
            const loopType = { ...state, loopType: action.payload }
            // localStorage.setItem('no_music_player', JSON.stringify(loopType))
            return loopType
        case TOGGLE_MUTED:
            const isMuted = { ...state, isMuted: action.payload }
            // localStorage.setItem('no_music_player', JSON.stringify(isMuted))
            return isMuted
        default:
            return state
    }
}

export default audioReducer