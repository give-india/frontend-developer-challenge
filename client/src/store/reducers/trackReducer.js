const track = (state, action) => {
  switch (action.type) {
    case 'ADD_TRACK':
      return {
        id: action.id,
        url: action.url,
        name: 'Link ' + action.name,
        completed: false,
      };
    default:
      return state;
  }
};

const tracks = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TRACK':
      return [...state, track (undefined, action)];
    case 'DELETE_TRACK':
      return state.filter (track => track.id !== action.id);
    default:
      return state;
  }
};

export default tracks;
