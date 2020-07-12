import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import '../style/header.css'
import { isPlay } from '../action'

function SideBar () {
  const store = useSelector(store => store)
  const dispatch = useDispatch()

  const handleClickOnLink = id => {
    dispatch(isPlay(id))
  }
  return (
    <section className='playlist-wrapper'>
      <article className='playlist-wrapper__video'>
      videoplayer
      </article>
      <article className='playlist-wrapper__links'>
        <p className='playlist-wrapper__links__heading'>PlayList</p>
        <hr className='playlist-wrapper__links__border' />
        <ul className='playlist-wrapper__links__lists'>
          {store.map((item, index) => {
            return (
              <li
                key={item.id}
                className='playlist-wrapper__link'
                onClick={() => handleClickOnLink(item.id)}
              >{item.link}
              </li>
            )
          })}
        </ul>
      </article>

    </section>
  )
}

export default SideBar
