import * as actionTypes from "../Action/actionConstants";

const initialState = {
  items: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADDITEM:
      const updatedItems = [...state.items];
      updatedItems.push(action.inputvalue);
    return {
        ...state,
      items: updatedItems
    };
    
    case actionTypes.REMOVEITEM:
      return{
        ...state,
        items: action.remainingItems
      };

    case actionTypes.REORDERITEM:
      return{
        ...state,
        items: action.reorderItems
      }
  }
  return state;
};

export default reducer;
