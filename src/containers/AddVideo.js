import React from 'react'
import { connect } from 'react-redux'
import { addVideo } from '../actions'


let AddVideo = ({ dispatch }) => {
  let input
  let regex = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/gm

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        if ( !input.value.match(regex)){
            return
        }
        dispatch(addVideo(input.value))
        input.value = ''
      }}>
        <input ref={node => {
          input = node
        }} />
        <button type="submit">
          Add You Tube Video Url
        </button>
      </form>
    </div>
  )
}
AddVideo = connect()(AddVideo)

export default AddVideo
