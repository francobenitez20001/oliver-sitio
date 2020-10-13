import {TRAER_TODAS,LOADING,ERROR} from '../types/subcategoriasTypes';

const INITIAL_STATE = {
    subcategorias:[],
    loading:false,
    error:null
};

export default (state = INITIAL_STATE,action)=>{
    switch (action.type) {
        case TRAER_TODAS:
            return {...state,subcategorias:action.payload,loading:false}
        case LOADING:
            return {...state,loading:true}
        case ERROR:
            return {...state,error:action.payload,loading:false}
        default:
            return state;
    }
}