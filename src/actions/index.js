let nextVideoId = 1
export const addVideo = (text) => ({
  type: 'ADD_VIDEO',
  id: nextVideoId++,
  text
})

export const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const toggleVideo = (id) => ({
  type: 'TOGGLE_VIDEO',
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