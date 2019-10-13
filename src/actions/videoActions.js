import * as types from '../constants'

export const videoDataAction = (id) => {
    return function(dispatch){
        dispatch({type:types.FETCH_VIDEO});
        return fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${id}`,{method:'GET', headers:{
            'Content-Type': 'application/json'
          }}).then(data => data.json()).then(data => {
            dispatch({
                type: types.FETCH_VIDEO_SUCCESS,
                data
            })
        }).catch((err) => {
            dispatch({
                type: types.FETCH_VIDEO_ERROR,
                err,
            })
        })
    }
}