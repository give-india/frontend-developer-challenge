import undoable from 'redux-undo'

const addVideo = (state, action) => {
  switch (action.type) {
    case 'ADD_VIDEO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
    default:
      return state
  }
}

function immutablySwapItems(items, firstIndex, secondIndex, length) {
  const results= items.slice();
  if ( secondIndex < 0  || secondIndex >= length ) return results;
  const firstItem = items[firstIndex];
  results[firstIndex] = items[secondIndex];
  results[secondIndex] = firstItem;
  return results;
}

const videos = (state = [{ id : 0, text : 
  'https://www.youtube.com/watch?v=oUFJJNQGwhk',completed: false}
], action) => {
  switch (action.type) {
    case 'ADD_VIDEO':
      return [
        ...state,
        addVideo(undefined, action)
      ]
    case 'TOGGLE_VIDEO':
      return [
        ...state.slice(0, action.id),
        ...state.slice(action.id + 1)
      ]
    case 'MOVE_UP':
      return immutablySwapItems(state,action.index,action.index-1,action.length)
    case 'MOVE_DOWN':
        return immutablySwapItems(state,action.index,action.index+1,action.length)
    default:
      return state
  }
}

const undoableVideos = undoable(videos)

export default undoableVideos
