import {TRAER_TODOS,LOADING,ERROR,TRAER_PROMOCIONES,ORDENAR_PRODUCTOS,FILTRANDO} from '../types/productosTypes';

const INITIAL_STATE = {
    productos:[],
    promociones:[],
    loading:false,
    error:null
};

export default (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case TRAER_TODOS:
            return {...state,productos:action.payload,loading:false}
        case TRAER_PROMOCIONES:
            return {...state,promociones:action.payload,loading:false}
        case ORDENAR_PRODUCTOS:
            return {...state,productos:action.payload,loading:false};
        case FILTRANDO:
            return {...state,productos:action.payload,loading:false};
        case LOADING:
            return {...state,loading:true}
        case ERROR:
            return {...state,loading:false,error:action.payload}
        default:
            return state;
    }
}
