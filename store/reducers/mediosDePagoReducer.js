import {TRAER_TODOS,LOADING,ERROR} from '../types/mediosDePagoTypes';

const INITIAL_STATE = {
    mediosDePago:[],
    loading:false,
    error:null
};

const mediosDePagoReducer = (state = INITIAL_STATE,action)=>{
    switch (action.type) {
        case TRAER_TODOS:
            return {...state,mediosDePago:action.payload,loading:false}
        case LOADING:
            return {...state,loading:true}
        case ERROR:
            return {...state,error:action.payload,loading:false}
        default:
            return state;
    }
}

export default mediosDePagoReducer;