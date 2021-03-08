import {TRAER_PRODUCTOS,AGREGAR_PRODUCTO,ELIMINAR_PRODUCTO,LOADING,ERROR, CAMBIAR_MEDIO_DE_PAGO} from '../types/carritoTypes';

const INITIAL_STATE = {
    productos:[],
    porcentaje_descuento:0,
    descuento:0,
    subtotal:0,
    total:0,
    loading:false,
    error:null,
    idMedioPago:'1'
};

const carritoReducer = (state = INITIAL_STATE,action)=>{
    switch (action.type) {
        case TRAER_PRODUCTOS:
            return {...state,productos:action.payload.productos,loading:false,error:null,subtotal:action.payload.subtotal}
        case AGREGAR_PRODUCTO:
            return {...state,productos:action.payload.listProductosUpgrade,loading:false,error:null,subtotal:action.payload.subtotal}
        case ELIMINAR_PRODUCTO:
            return {...state,productos:action.payload.newProductos,loading:false,error:null,subtotal:action.payload.subtotal}
        case CAMBIAR_MEDIO_DE_PAGO:
            return {...state,idMedioPago:action.payload}
        case LOADING:
            return {...state,loading:true}
        case ERROR:
            return {...state,error:action.payload,loading:false}
        default:
            return state;
    }
}

export default carritoReducer;