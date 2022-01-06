/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'

function ImageSong({ source, alert }) {

    const [image, setImage] = useState('')

    useEffect(() => {
        let isSubcribe = true
        const storage = getStorage()

        getDownloadURL(ref(storage, `${source}`))
        .then(url => {
            if(isSubcribe)
                setImage(url)
        })
        .catch((error) => console.log(error))

        return () => {
            setImage('')
            isSubcribe = false
        }
        
    }, [source])

    return (
        <>
            { image && <img src={image} alt={alert}/> }
        </>
    )
}

export default ImageSong
