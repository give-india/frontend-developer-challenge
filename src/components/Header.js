import React, { useState } from 'react'
import '../style/style.css'
import { v4 as uuidv4 } from 'uuid'
import VideoPlayer from './VideoPlayer'

function Header () {
  const [val, setVal] = useState('')
  const [playlists, setPlaylists] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    const obj = {
      link: val,
      id: uuidv4(),
      isPlay: true
    }
    setPlaylists([obj, ...playlists])
    setVal('')
  }

  const handleChange = (e) => {
    setVal(e.target.value)
  }

  return (
    <>
      <form className='header' onSubmit={handleSubmit}>
        {console.log('header rendering', playlists)}
        <input
          type='text' id='link' name='link' value={val}
          placeholder='Add a youtube link  (Ex: https://www.youtube.com/watch?v=k5E2AVpwsko)'
          className='header__inputUrl'
          onChange={handleChange}
        />
      </form>
      <VideoPlayer lists={playlists} isPlayLists />
    </>
  )
}

export default Header
