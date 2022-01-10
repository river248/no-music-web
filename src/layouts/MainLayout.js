import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from 'components/Header/Header'
import Navigation from 'components/Navigation/Navigation'
import AudioCustom from 'components/AudioCustom/AudioCustom'
import { connect } from 'react-redux'

import './MainLayout.scss'
import DiscoveryPage from 'pages/DiscoveryPage/DiscoveryPage'
import HomePage from 'pages/HomePage/HomePage'
import PrivateRoute from 'components/Auth/PrivateRoute'

function MainLayout({ screenType }) {

    const [isWiden, setIsWiden] = useState(true)

    return (
        <>
            <header><Header/></header>
            <nav><Navigation setIsWiden={setIsWiden}/></nav>
            <main>
                <div className={ isWiden ? 'main-container-l' : 'main-container-l main-container-s'}>
                    <Routes>
                        <Route path='home' element={<HomePage/>}/>
                        <Route element={<PrivateRoute/>}>
                            <Route path='discovery' element={<DiscoveryPage/>}/>
                        </Route>
                        <Route path='search' element={<HomePage/>}/>
                        <Route path='chart' element={<HomePage/>}/>
                    </Routes>
                </div>
                { screenType && <AudioCustom/> }
            </main>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
      screenType: state.audioReducer.screenType
    }
  }

export default connect(mapStateToProps, null)(MainLayout)
