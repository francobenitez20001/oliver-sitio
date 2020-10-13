import {TRAER_TODAS,LOADING,ERROR} from '../types/categoriasTypes';

const INITIAL_STATE = {
    categorias:[],
    loading:false,
    error:null
};

export default (state = INITIAL_STATE,action)=>{
    switch (action.type) {
        case TRAER_TODAS:
            return {...state,categorias:action.payload,loading:false}
        case LOADING:
            return {...state,loading:true}
        case ERROR:
            return {...state,error:action.payload,loading:false}
        default:
            return state;
    }
}