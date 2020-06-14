import * as actionTypes from './actionConstants';

export const additem = (inputVal) => {
    return {
        type: actionTypes.ADDITEM,
        inputvalue: inputVal
    };
};

export const removeitem = (remainItems) => {
    return {
        type: actionTypes.REMOVEITEM,
        remainingItems: remainItems
    };
};

export const reorderitem = (reorderItems) => {
    return {
        type: actionTypes.REORDERITEM,
        reorderItems: reorderItems
    };
};