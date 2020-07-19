import React, { useState } from 'react'
import '../assets/css/app.css'
import { v4 as uuidv4 } from 'uuid'
import VideoPlayer from './VideoPlayer'

function Header () {
  const [val, setVal] = useState('')
  const [playlists, setPlaylists] = useState([])
  const [error, setError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const urlFormat = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
    if (val.match(urlFormat)) {
      const obj = {
        link: val,
        id: uuidv4(),
        isPlay: true
      }
      setError(false)
      setPlaylists([obj, ...playlists])
      setVal('')
    } else {
      setError(true)
    }
  }

  const handleChange = (e) => {
    setVal(e.target.value)
  }

  const handleVideoEnd = async (id, index) => {
    const newPlaylists = await playlists.filter(item => item.id !== id)

    // If Playlist is empty
    if (!newPlaylists.length) {
      setPlaylists(newPlaylists)
      return
    }

    // If last video in the queue is ended then play from the first in the queue
    if (newPlaylists.length !== 1 && newPlaylists.length === index) {
      newPlaylists.forEach((item, i) => {
        if (i === 0) {
          item.isPlay = true
        }
      })
      setPlaylists(newPlaylists)
      return
    }

    // Play the immediate next video
    if (newPlaylists.length !== 1 && newPlaylists.length !== index) {
      newPlaylists.forEach((item, i) => {
        if (i === index) {
          item.isPlay = true
        }
      })
      setPlaylists(newPlaylists)
      return
    }

    newPlaylists.forEach((item, i) => {
      if (i === 0) {
        item.isPlay = true
      }
    })
    setPlaylists(newPlaylists)
  }

  const handleReplace = (dropId, dragId) => {
    // Reordering after drag and drop function
    const items = [...playlists]
    const item = playlists[dropId]
    items[dropId] = items[dragId]
    items[dragId] = item

    const newItems = items.map((item, index) => {
      if (index === 0) {
        item.isPlay = true
        return item
      }
      return item
    })
    setPlaylists(newItems)
  }

  return (
    <>
      <form className='header' onSubmit={handleSubmit}>
        <input
          type='text' id='link' name='link' value={val}
          placeholder='Add a youtube link  (Ex: https://www.youtube.com/watch?v=k5E2AVpwsko)'
          className='header__inputUrl'
          onChange={handleChange}
        />

        {
          error ? <p className='header__error'>Please Enter the valid Youtube Url</p> : null
        }
      </form>
      <VideoPlayer
        lists={playlists}
        onVideoEnd={(id, index) => handleVideoEnd(id, index)}
        onReplace={(dropId, dragId) => handleReplace(dropId, dragId)}
      />
    </>
  )
}

export default Header
