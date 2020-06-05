export default (state = [], action) => {
    let temp;
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
            temp = state[action.payload];
            state[action.payload] = state[action.payload - 1];
            state[action.payload - 1] = temp;
            return [...state];
        case 'MOVE_DOWN':
            if (action.payload === state.length-1) return state;
            temp = state[action.payload];
            state[action.payload] = state[action.payload + 1];
            state[action.payload + 1] = temp;
            return [...state];
        case 'DRAG_DROP':
            let temp = state[action.payload.drag];
            state.splice(action.payload.drag,1);
            state.splice(action.payload.drop,0,temp)
            return [...state]
        default:
            return state
    }
}