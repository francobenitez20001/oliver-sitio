import {TRAER_PRODUCTOS,AGREGAR_PRODUCTO,ELIMINAR_PRODUCTO,LOADING,ERROR, CAMBIAR_MEDIO_DE_PAGO, CAMBIAR_COSTO_ENVIO} from '../types/carritoTypes';

const INITIAL_STATE = {
    productos:[],
    porcentaje_descuento:0,
    costoEnvio:0,
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
            return {...state,productos:action.payload.productos,loading:false,error:null,subtotal:action.payload.subtotal,total:action.payload.subtotal + state.costoEnvio}
        case AGREGAR_PRODUCTO:
            return {...state,productos:action.payload.listProductosUpgrade,loading:false,error:null,subtotal:action.payload.subtotal,total:action.payload.subtotal + state.costoEnvio}
        case ELIMINAR_PRODUCTO:
            return {...state,productos:action.payload.newProductos,loading:false,error:null,subtotal:action.payload.subtotal,total:action.payload.subtotal + state.costoEnvio}
        case CAMBIAR_MEDIO_DE_PAGO:
            return {...state,idMedioPago:action.payload}
        case LOADING:
            return {...state,loading:true}
        case ERROR:
            return {...state,error:action.payload,loading:false}
        case CAMBIAR_COSTO_ENVIO:
            return {...state,costoEnvio:action.payload,total:state.subtotal+action.payload}
        default:
            return state;
    }
}

export default carritoReducer;