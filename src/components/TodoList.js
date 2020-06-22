import React,  { useState } from 'react';
import PropTypes from 'prop-types'
import Todo from './Todo'
import ReactPlayer from 'react-player'

const TodoList = ({ todos, onTodoClick, moveUp, moveDown }) => {
  var [index, setIndex] = useState(0);
  return (
  <ul>
    {todos.map((todo,index) => {

      return <Todo
        key={todo.id}
        {...todo}
        onClick={() => onTodoClick(todo.id)}
        upArrow={() => moveUp(index,todos.length)}
        downArrow={() => moveDown(index,todos.length)}
      />
    })}

  <ReactPlayer
    url={todos[index] ?todos[index].text : 'https://www.youtube.com/watch?v=oUFJJNQGwhk'
    }
    playing={true}
    controls={true}
    onEnded={() => onTodoClick(todos[index].id) }
  />

 
  </ul>
)
    }

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onTodoClick: PropTypes.func.isRequired
}

export default TodoList
