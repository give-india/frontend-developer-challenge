
export function addVideoToPlayList(data) {
    return {
        type: "ADD",
        data: data
    }
}

export function removeVideoToPlayList(id) {
    return {
        type: "REMOVE",
        id: id
    }
}

export function setPlayerIndex(index) {
    return {
        type: "SET_PLAYER_INDEX",
        index: index
    }
}