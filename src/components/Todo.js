import React from 'react'
import PropTypes from 'prop-types'
import up from  "./up.svg"
import down from "./down.svg"
import './Todo.css'

const Todo = ({ onClick, completed, text, upArrow, downArrow }) => (
  <div >
  
  <li
    onClick={onClick}
    style={{
      display: completed ? 'none' : 'block'
    }}
  >
    {text}
  </li>
  
  
    <img src={up}   style={{
        display: completed ? 'none' : 'block'
      }} onClick={upArrow} />

    <img src={down}   style={{
      display: completed ? 'none' : 'block'
      }} onClick={downArrow} />



  </div> 
)

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default Todo
