import React from 'react'
import { 
  BrowserRouter as Router,
  Routes,
  Route } from 'react-router-dom'

import AccountPage from 'pages/AccountPage/AccountPage'
import './App.scss'
import HomePage from 'pages/HomePage/HomePage'
import AudioCustom from 'components/AudioCustom/AudioCustom'
import { connect } from 'react-redux'

function App({ screenType }) {
  return (
    <Router>

        <Routes>
          <Route path='/' element={<AccountPage/>}/>
          <Route path='/login' element={<AccountPage/>}/>
          <Route path='/sign-up' element={<AccountPage/>}/>
          <Route path='/home' element={<HomePage/>}/>
          <Route path='/search' element={<HomePage/>}/>
          <Route path='/discovery' element={<HomePage/>}/>
          <Route path='/chart' element={<HomePage/>}/>
        </Routes>

      { screenType && <AudioCustom/> }
    </Router>
  )
}

const mapStateToProps = (state) => {
  return {
    screenType: state.audioReducer.screenType
  }
}

export default connect(mapStateToProps, null)(App)
