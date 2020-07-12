import React, { useState } from 'react'
import '../style/header.css'
import { useSelector, useDispatch } from 'react-redux'
import { addLink } from '../action'
import { v4 as uuidv4 } from 'uuid';


function Header () {
  const [val, setVal] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    const obj = {
      link: val,
      id: uuidv4(),
      isPlay: true
    }
    dispatch(addLink(obj))
    setVal('')
  }

  const handleChange = (e) => {
    setVal(e.target.value)
  }

  return (
    <form className='header' onSubmit={handleSubmit}>
      {console.log('header rendering')}
      <input
        type='text' id='link' name='link' value={val}
        placeholder='Add a youtube link  (Ex: https://www.youtube.com/watch?v=k5E2AVpwsko)'
        className='header__inputUrl'
        onChange={handleChange}
      />
    </form>
  )
}

export default Header
