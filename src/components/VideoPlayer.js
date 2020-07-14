import React, { useState, useEffect } from 'react'
import ReactPlayer from 'react-player'
import closeBtn from '../assets/img/close2.png'

function VideoPlayer ({ lists, onVideoEnd }) {
  console.log('lists as props', lists)
  const [links, setlinks] = useState('')

  useEffect(() => {
    console.log('lists in useEffect', lists)
    console.log('links', links)
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
        <ul className='playlist-wrapper__links__lists'>
          {lists.map((item, index) => {
            return (
              <li
                key={item.id}
                className='playlist-wrapper__link'
                onClick={(e) => handleClickOnLink(item.id)}
              >
                <span>{item.link}</span>
                <img src={closeBtn} alt="close-icon" className='playlist-wrapper__links__closeBtn' />
              </li>
            )
          })}
        </ul>
      </article>

    </section>
  )
}

export default VideoPlayer
