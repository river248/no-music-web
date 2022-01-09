import {
    TOGGLE_PLAY,
    PLAY_WITH_SCREEN,
    PLAY_THIS_SONG,
    LOADING_SONG,
    CHANGE_VOLUME,
    LOOPING,
    TOGGLE_MUTED
} from 'utils/constants'

export const togglePlay = (status) => {
    return {
        type: TOGGLE_PLAY,
        payload: status
    }
}

export const playWithScreen = (screenType) => {
    return {
        type: PLAY_WITH_SCREEN,
        payload: screenType
    }
}

export const playThisSong = (info) => {
    return {
        type: PLAY_THIS_SONG,
        payload: info
    }
}

export const loadingSong = (status) => {
    return {
        type: LOADING_SONG,
        payload: status
    }
}

export const changeVolume = (value) => {
    return {
        type: CHANGE_VOLUME,
        payload: value
    }
}

export const loopingSong = (type) => {
    return {
        type: LOOPING,
        payload: type
    }
}

export const toggleMuted = (status) => {
    return {
        type: TOGGLE_MUTED,
        payload: status
    }
}