import React from 'react'
import { FiMoreHorizontal } from 'react-icons/fi'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { BiLink } from 'react-icons/bi'

import './DetailSongPage.scss'
import ImageSong from 'components/Image/ImageSong'

function DetailSongPage() {
    return (
        <div className='detail-song-page-container'>
            <div className='left-detail-song-page'>
                <ImageSong source={'tron-tim.jpg'} alert={'tron tim.jpg'}/>
            </div>
            <div className='right-detail-song-page'>
                <div className='header-detail-song-page'>
                    <div className='detail-song-btn'>
                        <button><FiMoreHorizontal/></button>
                        <button><AiOutlineCloudUpload/></button>
                        <button><BiLink/></button>
                    </div>
                    <button>Lưu</button>
                </div>
                <div className='detail-song-content'>
                    <span id='detail-song-title'>Trốn tìm</span>
                    <hr/>
                    <span id='detail-song-singer'>Đen ft. MTV Band</span>

                    <div className='detail-song-info'>
                        <span>Thông tin: TRỐN TÌM</span>
                        <span>Thông tin: TRỐN TÌM</span>
                        <span>Thông tin: TRỐN TÌM</span>
                        <span>Thông tin: TRỐN TÌM</span>
                        <span>Thông tin: TRỐN TÌM</span>
                        <span>Thông tin: TRỐN TÌM</span>
                        <span>Thông tin: TRỐN TÌM</span>
                    </div>

                    <div id='singer-channel-container'>
                        <div className='image-singer-container'>
                            <ImageSong source={'tron-tim.jpg'} alert={'tron-tim.jpg'}/>
                        </div>
                        <span>Đen Vâu Official</span>
                        <button>Theo dõi</button>
                    </div>
                </div>
                <div className='detail-song-comment'>
                    <span>Nhận xét</span>
                </div>
            </div>
        </div>
    )
}

export default DetailSongPage
