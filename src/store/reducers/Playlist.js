import * as actionTypes from '../actionTypes';
import { updateObject } from './utils';

const initialState = {
    list: [],
    activeItem: {}
}

const addNewItemToList = (state, action) => {
    return updateObject(state, {
        list: [
            ...state.list,
            action.data
        ],
        activeItem: state.list.length > 0 ? state.list[0] : action.data
    }
    )
}

const removeItemFromList = (state, action) => {
    let list = state.list.filter(item => item.id !== action.data.id)

    if (state.list[0].id === action.data.id) {
        return updateObject(state, {
            list,
            activeItem: state.list[1]
        })
    }

    return updateObject(state, { list })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_LINK: return addNewItemToList(state, action);
        case actionTypes.REMOVE_LINK: return removeItemFromList(state, action);
        default: return state;
    }
}

export default reducer;