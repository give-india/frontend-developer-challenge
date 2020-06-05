export default (state=null,action)=>{
    switch(action.type){
        case 'POP_VIDEO':
            return action.payload?action.payload:null;
        case 'PUSH_VIDEO':
            return state? state:action.payload
        case 'UPDATE':
            return action.payload.selectedVideo
        default:
            return state
    }
}