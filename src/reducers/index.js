import { combineReducers } from 'redux'
import videos from './videos'
import visibilityFilter from './visibilityFilter'

const videoApp = combineReducers({
  videos,
  visibilityFilter
})

export default videoApp
