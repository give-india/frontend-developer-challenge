import React, { useState } from 'react'
import '../assets/css/app.css'
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

  const handleVideoEnd = (id, index) => {
    const newPlaylists = playlists.filter(item => item.id !== id)

    if (!newPlaylists.length) {
      setPlaylists(newPlaylists)
      return
    }
    if (newPlaylists.length !== 1 && newPlaylists.length === index) {
      const items = newPlaylists.map((item, i) => {
        if (i === 0) {
          item.isPlay = true
          return item
        }
        return item
      })
      setPlaylists(items)
      return
    }

    if (newPlaylists.length !== 1 && newPlaylists.length !== index) {
      const items = newPlaylists.map((item, i) => {
        if (i === index) {
          item.isPlay = true
          return item
        }
        return item
      })
      setPlaylists(items)
      return
    }

    const items = newPlaylists.map((item, i) => {
      if (i === 0) {
        item.isPlay = true
        return item
      }
      return item
    })
    setPlaylists(items)
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
      <VideoPlayer lists={playlists} onVideoEnd={(id, index) => handleVideoEnd(id, index)} />
    </>
  )
}

export default Header
