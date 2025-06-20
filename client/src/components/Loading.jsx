import React from 'react'
import { FadeLoader, ClipLoader } from 'react-spinners'

const Loading = () => {
    return (
        <div className='min-h-screen flex items-center justify-center'>
            <FadeLoader/>
        </div>
    )
}

export default Loading