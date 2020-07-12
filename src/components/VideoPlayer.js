import React, { useState } from 'react'
import ReactPlayer from 'react-player/youtube'
import { useSelector, useDispatch } from 'react-redux'

function VideoPlayer () {
  const [src, setSrc] = useState('')
  const store = useSelector(store => store)
  console.log('store in videoplayer', store)
  const a = store.filter(item => item.isPlay)
  console.log(a, 'a')

  return (
    <section className='videoPlayer'>
      {console.log('videoplayer is rendering', a[0])}
      {a[0]
        ? <ReactPlayer url={a[0].link} control onReady />
        : null}
    </section>
  )
}

export default VideoPlayer
