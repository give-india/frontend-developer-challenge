const defaultState = {
    linkData: [],
    currentPlayingId: "",
    songIndex: 0
};
  
  const PlaySongsReducer = function(state = defaultState, action) {
    const { type, payload } = action;
  
    const updateState = update => {
      return Object.assign({}, state, update);
    };
  
    const resetState = () => {
      return Object.assign({}, state, defaultState);
    };
    switch (type) {
      case "SET_LINK_DATA":
        return updateState({ linkData: payload });
      case "SET_CURRENT_SONG":
        return updateState({ currentPlayingId: payload });
      case "SET_SONG_INDEX":
        return updateState({ songIndex: payload });
      case "RESET_DATA":
        return resetState();
      default:
        return state;
    }
  };
  export default PlaySongsReducer;
  