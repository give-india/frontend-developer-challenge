export const addLink = value => {
  return {
    type: 'ADD_LINK',
    payload: value
  }
}

export const isPlay = value => {
  return {
    type: 'IS_PLAY',
    payload: value
  }
}
