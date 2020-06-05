export default (state = [], action) => {
    switch (action.type) {
        case 'PUSH_VIDEO':
            return [...state, action.payload]
        case 'POP_VIDEO':
            state.shift();
            return [...state];
        case 'REMOVE_VIDEO':
            state.splice(action.payload, 1);
            return [...state]
        case 'UPDATE':
            return action.payload.videoList;
        case 'MOVE_UP':
            if (action.payload === 0) return state;
            let temp1 = state[action.payload];
            state[action.payload] = state[action.payload - 1];
            state[action.payload - 1] = temp1;
            return [...state];
        case 'MOVE_DOWN':
            if (action.payload === state.length-1) return state;
            let temp2 = state[action.payload];
            state[action.payload] = state[action.payload + 1];
            state[action.payload + 1] = temp2;
            return [...state];
        default:
            return state
    }
}