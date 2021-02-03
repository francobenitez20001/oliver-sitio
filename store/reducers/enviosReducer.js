import { LOADING,ERROR,GUARDAR } from "../types/enviosTypes";

const INITIAL_STATE = {
    data:null,
    loading:false,
    error:null
}

const enviosReducer = (state = INITIAL_STATE,action)=>{
    switch (action.type) {           
        case GUARDAR:
            return {data:action.payload,loading:false,error:null}
        case LOADING:
            return {...state,loading:true}
        case ERROR:
            return {...state,loading:false,error:action.payload}
        default:
            return state;
    }
}

export default enviosReducer;