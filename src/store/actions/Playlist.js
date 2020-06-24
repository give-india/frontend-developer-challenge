import * as actionTypes from '../actionTypes';

export const addNewLinkAction = (data) => ({
    type: actionTypes.ADD_LINK,
    data
})

export const removeLinkAction = (data) => ({
    type: actionTypes.REMOVE_LINK,
    data
})

export const addNewLinkDispatch = (data) => {
    return dispatch => {
        dispatch(addNewLinkAction(data))
    }
}

export const removeLinkDispatch = (data) => {
    return dispatch => {
        dispatch(removeLinkAction(data))
    }
}