import { connect } from 'react-redux'
import { toggleVideo } from '../actions'
import VideoList from '../components/VideoList'
import { moveUp } from '../actions'
import { moveDown } from '../actions'

const getVisibleVideos = (videos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return videos
  }
}

const mapStateToProps = (state) => ({
  videos: getVisibleVideos(state.videos.present, state.visibilityFilter)
})

const mapDispatchToProps = ({
  onVideoClick: toggleVideo,
  moveUp: moveUp,
  moveDown : moveDown
})

const VisibleVideoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoList)

export default VisibleVideoList
