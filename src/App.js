import React from 'react'
import { 
  BrowserRouter as Router,
  Routes,
  Route } from 'react-router-dom'

import AccountPage from 'pages/AccountPage/AccountPage'
import './App.scss'
import HomePage from 'pages/HomePage/HomePage'

function App() {
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

    </Router>
  )
}

export default App
