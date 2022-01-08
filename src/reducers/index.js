import { combineReducers } from 'redux'
import audioReducer from './audioReducer'

const rootReducer = combineReducers({
    audioReducer: audioReducer
})

export default rootReducer