import React from 'react'
import { 
  BrowserRouter as Router,
  Routes,
  Route, 
  Navigate} from 'react-router-dom'

import AccountPage from 'pages/AccountPage/AccountPage'
import './App.scss'
import MainLayout from 'layouts/MainLayout'
import PublicRoute from 'components/Auth/PublicRoute'

function App() {
  return (
    <Router>
        <Routes>
          <Route element={<PublicRoute/>}>
            <Route path='/account/*' element={<AccountPage/>}>
              <Route path='login' element={<AccountPage/>}/>
              <Route path='sign-up' element={<AccountPage/>}/>
            </Route>
          </Route>
          <Route path='/' element={<Navigate replace to={'/home'}/>}/>
          <Route path='/*' element={<MainLayout/>}/>
        </Routes>
    </Router>
  )
}

export default App
