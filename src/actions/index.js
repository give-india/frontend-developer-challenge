let nextTodoId = 1
export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})

export const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id
})

export const moveUp = (index,length) => ({
  type: 'MOVE_UP',
  index,
  length
})

export const moveDown = (index,length) => ({
  type: 'MOVE_DOWN',
  index,
  length
})