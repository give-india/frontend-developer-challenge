import React, { useState, useEffect } from 'react'
import ReactPlayer from 'react-player'
import closeBtn from '../assets/img/close2.png'

function VideoPlayer ({ lists, onVideoEnd, onReplace }) {
  const [links, setlinks] = useState('')

  useEffect(() => {
    if (lists.length) {
      const id = lists.filter(item => item.isPlay === true)[0].id
      handleClickOnLink(id)
    } else {
      setlinks(lists)
    }
  }, [lists])

  const handleClickOnLink = id => {
    const isPlayLists = lists.map(item => {
      if (item.id === id) {
        item.isPlay = true
        return item
      } else {
        item.isPlay = false
        return item
      }
    })
    setlinks(isPlayLists)
  }

  const handleVideoEnd = (id, index) => onVideoEnd(id, index)

  const handleDragStart = (e, id, index) => {
    e.dataTransfer.setData('id', index)
    e.target.style.opacity = '0.4'
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e, id, index) => {
    console.log('Drop')
    e.preventDefault()
    const draggedId = e.dataTransfer.getData('id')
    console.log('DraggedId', draggedId, 'dropId', index)
    onReplace(index, draggedId)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDragEnter = (e) => {
    e.currentTarget.style.border = 'dashed'
  }

  const handleDragLeave = (e) => {
    e.currentTarget.style.border = 'none'
  }

  const handleDragEnd = (e) => {
    e.target.style.opacity = ''
    e.currentTarget.style.border = 'none'
  }

  return (
    <section className='playlist-wrapper'>

      <article className='playlist-wrapper__video'>
        {console.log('links in ReactPlayer', links)}
        {links.length
          ? links.map((item, index) => {
            if (item.isPlay) {
              return (
                <ReactPlayer
                  key={item.id}
                  height='100%'
                  width='100%'
                  url={item.link} controls playing
                  className='playlist-wrapper__video--reactPlayer'
                  onEnded={() => handleVideoEnd(item.id, index)}
                />)
            }
          })
          : null}

      </article>

      <article className='playlist-wrapper__links'>
        <p className='playlist-wrapper__links__heading'>PlayList</p>
        <hr className='playlist-wrapper__links__border' />
        <ul
          className='playlist-wrapper__links__lists'

        >
          {lists.map((item, index) => {
            return (
              <li
                key={item.id}
                className='playlist-wrapper__link'
                onClick={e => handleClickOnLink(item.id)}
                draggable
                onDragStart={e => handleDragStart(e, item.id, index)}
                onDragEnter={e => handleDragEnter(e)}
                onDragLeave={e => handleDragLeave(e)}
                onDragEnd={e => handleDragEnd(e)}
                onDragOver={e => handleDragOver(e)}
                onDrop={e => handleDrop(e, item.id, index)}
              >
                <span>{item.link}</span>
                <img
                  src={closeBtn} alt='close-icon'
                  className='playlist-wrapper__links__closeBtn'
                  onClick={() => handleVideoEnd(item.id, index)}
                />
              </li>
            )
          })}
        </ul>
      </article>

    </section>
  )
}

export default VideoPlayer
