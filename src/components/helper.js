const getLocalData = () => {
  let songsList;
  const currentVideoDetails = localStorage.getItem('currentVideoDetails');
  let currentVideoDetailsJson;
  try {
    songsList = JSON.parse(localStorage.getItem('songsList'));
  } catch (ex) {
    songsList = [];
  }

  try {
    currentVideoDetailsJson = JSON.parse(currentVideoDetails);
  } catch (ex) {
    currentVideoDetailsJson = { youId: null, pauseTime: null };
  }
  return { songsList, currentVideoDetailsJson };
};

export default getLocalData;
