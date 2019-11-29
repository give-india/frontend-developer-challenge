export function setLinkData(data) {
    return {
        type: "SET_LINK_DATA",
        payload: data
    }
}

export function setCurrentPlayingSong(data) {
    return {
        type: "SET_CURRENT_SONG",
        payload: data
    }
}

export function setSongIndex(data) {
    return{
        type: "SET_SONG_INDEX",
        payload: data
    }
}

export const alterLinks = links => dispatch => {
    dispatch(setLinkData(links));
};

export const appendLink = (link,linkData,songIndex) => dispatch => {
    let tempData = linkData;
    let tempIndex = songIndex + 1;
    if (tempData.length === 0) {
        dispatch(setCurrentPlayingSong(link));
    }
    tempData.push({ title: "Link " + tempIndex, key: link });
    dispatch(setLinkData(tempData));
    dispatch(setSongIndex(tempIndex));
};

export const removeFromList = (linkData,deleteKey) => dispatch => {
    let tempData = linkData;
    
    tempData = tempData.filter(eachObject => eachObject.key !== deleteKey);
    dispatch(setLinkData(tempData));
};

export const playThisSong = playKey => dispatch => {
    dispatch(setCurrentPlayingSong(playKey));
};