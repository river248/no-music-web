import React from 'react'
import { 
  BrowserRouter as Router,
  Routes,
  Route } from 'react-router-dom'

import AccountPage from 'pages/AccountPage/AccountPage'
import './App.scss'

function App() {
  return (
    <Router>

        <Routes>
          <Route path='/' element={<AccountPage/>}/>
          <Route path='/login' element={<AccountPage/>}/>
          <Route path='/sign-up' element={<AccountPage/>}/>
        </Routes>

    </Router>
  )
}

export default App
