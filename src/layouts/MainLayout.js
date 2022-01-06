import Header from 'components/Header/Header'
import Navigation from 'components/Navigation/Navigation'
import React, { useState } from 'react'

import './MainLayout.scss'

function MainLayout({ children }) {

    const [isWiden, setIsWiden] = useState(true)

    return (
        <>
            <header><Header/></header>
            <nav><Navigation setIsWiden={setIsWiden}/></nav>
            <main>
                <div className={ isWiden ? 'main-container-l' : 'main-container-l main-container-s'}>
                    {children}
                </div>
            </main>
        </>
    )
}

export default MainLayout
