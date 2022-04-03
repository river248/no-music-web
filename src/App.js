import React from 'react'
import { 
  Routes,
  Route, 
  Navigate} from 'react-router-dom'

import './App.scss'
import AccountPage from 'pages/AccountPage/AccountPage'
import MainLayout from 'layouts/MainLayout'
import PublicRoute from 'components/Auth/PublicRoute'

function App() {
  return (
    <Routes>
      <Route element={<PublicRoute/>}>
        <Route path='/account/*' element={<AccountPage/>}>
          <Route path='login' element={<AccountPage/>}/>
          <Route path='sign-up' element={<AccountPage/>}/>
        </Route>
      </Route>
      <Route path='/' element={<Navigate replace to={'/account'}/>}/>
      <Route path='/*' element={<MainLayout/>}/>
    </Routes>
  )
}

export default App
