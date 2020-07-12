
const reducer = (state = [], action) => {
  console.log('action', action)
  switch (action.type) {
    case 'ADD_LINK':
      return [ action.payload, ...state.map(item => {
        item.isPlay = false
        return item
      })]
    case 'IS_PLAY':
      return state.map(item => item.id === action.payload
        ? { ...item, isPlay: true } : { ...item, isPlay: false })
    default: return state
  }
}
export default reducer
