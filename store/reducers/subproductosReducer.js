import {TRAER_TODOS,TRAER_UNO,LOADING,ERROR,TRAER_PROMOCIONES,ORDENAR_PRODUCTOS,FILTRANDO} from '../types/subproductosTypes';

const INITIAL_STATE = {
    subproductos:[],
    subproducto:null,
    promociones:[],
    loading:false,
    error:null
};

const subproductosReducer = (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case TRAER_TODOS:
            return {...state,subproductos:action.payload,loading:false}
        case TRAER_UNO:
            return {...state,subproducto:action.payload,loading:false}
        case TRAER_PROMOCIONES:
            return {...state,promociones:action.payload,loading:false}
        case ORDENAR_PRODUCTOS:
            return {...state,subproductos:action.payload,loading:false};
        case FILTRANDO:
            return {...state,subproductos:action.payload,loading:false};
        case LOADING:
            return {...state,loading:true}
        case ERROR:
            return {...state,loading:false,error:action.payload}
        default:
            return state;
    }
}

export default subproductosReducer;
