import { FETCH_VIDEO,FETCH_VIDEO_ERROR,FETCH_VIDEO_SUCCESS } from "../constants";
const INITIAL_STATE = {
    loading: false,
    data:{},
    error:false,
}


export const videoDataReducer = (state = INITIAL_STATE, action)=> {
    switch(action.type){
        case FETCH_VIDEO:{
            return {
                ...state,
                loading: true,
                error: false,
            }
        }
        case FETCH_VIDEO_SUCCESS:{
            return {
                loading: false,
                error: false,
                data: action.data
            }
        }
        case FETCH_VIDEO_ERROR:{
            return {
                loading: false,
                error: true,
                data:{} 
            }
        }
        default:
            return state;
    }

}