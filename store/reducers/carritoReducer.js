import {TRAER_PRODUCTOS,AGREGAR_PRODUCTO,ELIMINAR_PRODUCTO,LOADING,ERROR} from '../types/carritoTypes';

const INITIAL_STATE = {
    productos:[],
    subtotal:0,
    total:0,
    loading:false,
    error:null
};

export default (state = INITIAL_STATE,action)=>{
    switch (action.type) {
        case TRAER_PRODUCTOS:
            return {...state,productos:action.payload,loading:false,error:null}
        case AGREGAR_PRODUCTO:
            return {...state,productos:action.payload,loading:false,error:null}
        case ELIMINAR_PRODUCTO:
            return {...state,productos:action.payload,loading:false,error:null}
        case LOADING:
            return {...state,loading:true}
        case ERROR:
            return {...state,error:action.payload,loading:false}
        default:
            return state;
    }
}