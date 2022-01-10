export const getToken = () => {
    return localStorage.getItem('no_music_token') || null
}

export const setUserSession = (accessToken) => {
    localStorage.setItem('no_music_token', JSON.stringify(accessToken))
}

export const removeUserSession = () => {
    localStorage.removeItem('no_music_token')
}