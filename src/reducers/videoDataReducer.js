import { FETCH_VIDEO,FETCH_VIDEO_ERROR,FETCH_VIDEO_SUCCESS } from "../constants";
const INITIAL_STATE = {
    loading: false,
    flag: false,
    data:{},
    error:false,
}


export const videoDataReducer = (state = INITIAL_STATE, action)=> {
    switch(action.type){
        case FETCH_VIDEO:{
            return {
                ...state,
                flag:false,
                loading: true,
                error: false,
            }
        }
        case FETCH_VIDEO_SUCCESS:{
            return {
                loading: false,
                error: false,
                flag:true,
                data: action.data
            }
        }
        case FETCH_VIDEO_ERROR:{
            return {
                loading: false,
                error: true,
                flag:false,
                data:{} 
            }
        }
        default:
            return state;
    }

}