export const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60)
    const seconds = Math.floor(secs % 60)
    const returnSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
    const returnMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`

    return `${returnMinutes} : ${returnSeconds}`
}