export const addVideo = (link) => {
    return {
        type: 'PUSH_VIDEO',
        payload: link
    }
}

export const popVideo = () => {
 return {
     type: 'POP_VIDEO',
     payload: ''
 };
}

export const removeVideo = (index) => {
    return{
        type:'REMOVE_VIDEO',
        payload:index
    }
}

export const dragDrop = (addIndex,removeIndex)=>{
    return {
        type: 'DRAG_DROP',
        payload:{
            drop: addIndex,
            drag: removeIndex
        }
    }
}

export const updateStore = state => {
    return {
        type: 'UPDATE',
        payload: state
    };
}
