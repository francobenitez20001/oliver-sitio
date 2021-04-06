import {TRAER_TODAS,LOADING,ERROR} from '../types/bannerTypes';

const INITIAL_STATE = {
    data:[],
    loading:false,
    error:null
};

const bannerReducer = (state = INITIAL_STATE,action)=>{
    switch (action.type) {
        case TRAER_TODAS:
            return {...state,data:action.payload}
        case LOADING:
            return {...state,loading:true}
        case ERROR:
            return {...state,error:action.payload,loading:false}
        default:
            return state;
    }
}

export default bannerReducer;