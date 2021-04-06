import {TRAER,LOADING,ERROR} from '../types/politicaTypes';

const INITIAL_STATE = {
    politica:'',
    terminos:'',
    loading:false,
    error:null
};

const politicaReducer = (state = INITIAL_STATE,action)=>{
    switch (action.type) {
        case TRAER:
            return {...state,politica:action.payload.politica,terminos:action.payload.terminos}
        case LOADING:
            return {...state,loading:true}
        case ERROR:
            return {...state,error:action.payload,loading:false}
        default:
            return state;
    }
}

export default politicaReducer;