export const addVideo = (link) => {
    return {
        type: 'PUSH_VIDEO',
        payload: link
    }
}

export const popVideo = (nextVideo) => {
 return {
     type: 'POP_VIDEO',
     payload: nextVideo
 };
}

export const removeVideo = (index) => {
    return{
        type:'REMOVE_VIDEO',
        payload:index
    }
}

export const moveUp = (index) => {
    return{
        type:'MOVE_UP',
        payload:index
    }
}
export const moveDown = (index) => {
    return{
        type:'MOVE_DOWN',
        payload:index
    }
}
export const updateStore = state => {
    return {
        type: 'UPDATE',
        payload: state
    };
}