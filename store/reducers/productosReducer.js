import {TRAER_TODOS,TRAER_UNO,LOADING,ERROR,TRAER_PROMOCIONES,ORDENAR_PRODUCTOS,FILTRANDO,LOADING_MAS,TRAER_MAS} from '../types/productosTypes';

const INITIAL_STATE = {
    productos:[],
    producto:null,
    promociones:[],
    loading:false,
    loading_mas:false,
    error:null
};

const subproductosReducer = (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case TRAER_TODOS:
            return {...state,productos:action.payload,loading:false}
        case TRAER_MAS:
            return {...state,productos:action.payload,loading_mas:false}
        case TRAER_UNO:
            return {...state,producto:action.payload,loading:false}
        case TRAER_PROMOCIONES:
            return {...state,promociones:action.payload,loading:false}
        case ORDENAR_PRODUCTOS:
            return {...state,productos:action.payload,loading:false};
        case FILTRANDO:
            return {...state,productos:action.payload,loading:false};
        case LOADING:
            return {...state,loading:true}
        case LOADING_MAS:
            return {...state,loading_mas:true}
        case ERROR:
            return {...state,loading:false,error:action.payload}
        default:
            return state;
    }
}

export default subproductosReducer;
