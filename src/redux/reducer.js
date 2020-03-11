
const initialValue =  
{
    links: [{
      id: "Link 1583925582680",
      link: "BU53zRWeUHM"
    }],
    playerIndex: 0
};

export default function reducer (state = initialValue, action) {
    switch(action.type) {
        case "ADD" :
            state.links.unshift(action.data);
            return {...state}
        case "REMOVE" : 
            const updatedLinks = state.links.filter(video => {
                return video.id !== action.id;
            });
            return {links:updatedLinks, playerIndex:0};
        case "SET_PLAYER_INDEX":
            return {...state, playerIndex: action.index }
        default:
            return state;
    }
}