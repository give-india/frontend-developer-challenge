import React, { useState, useEffect } from 'react'
import ReactPlayer from 'react-player'

function VideoPlayer ({ lists }) {
  console.log('props', lists)
  const [links, setlinks] = useState('')

  useEffect(() => {
    if (lists.length) {
      handleClickOnLink(lists[0].id)
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

  return (
    <section className='playlist-wrapper'>

      <article className='playlist-wrapper__video'>

        {links.length
          ? links.map(item => {
            if (item.isPlay) {
              return (
                <ReactPlayer
                  height='100%'
                  width='100%'
                  url={item.link} controls playing
                  className='playlist-wrapper__video--reactPlayer'
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
              >{item.link}
              </li>
            )
          })}
        </ul>
      </article>

    </section>
  )
}

export default VideoPlayer
