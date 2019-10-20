export const addTrack = (url, count) => {
  return {
    type: 'ADD_TRACK',
    id: Date.now (),
    name: count + 1,
    url,
  };
};

export const deleteTrack = tid => {
  return {
    type: 'DELETE_TRACK',
    id: tid,
  };
};
