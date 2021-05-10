import { ACTUALIZAR_DATOS_ENVIO, CAMBIAR_MEDIO_DE_PAGO, TRAER_INFO } from "../types/ventasTypes";

const INTITAL_STATE = {
    idMedioPago:1,
    totalEnvio:0,
    idZona:null,
    tipoEnvio:null,
    productos:[],
    cantidad:0,
    subtotal:0,
    porcentaje_descuento:0,
    descuento:0,
    total:0
}

const ventaReducer = (state=INTITAL_STATE,action)=>{
    switch (action.type) {
        case TRAER_INFO:
            return {
                ...state,
                productos:action.payload.productos,
                cantidad:action.payload.cantidad,
                subtotal:action.payload.subTotal,
                total:action.payload.subTotal + state.totalEnvio
            }
        case CAMBIAR_MEDIO_DE_PAGO:
            return {
                ...state,
                idMedioPago:action.payload
            }
        case ACTUALIZAR_DATOS_ENVIO:
            return {
                ...state,
                totalEnvio:action.payload.total,
                idZona:action.payload.zona,
                tipoEnvio:action.payload.tipo,
                idMedioPago:action.payload.idMedioPago,
                total:state.subtotal + action.payload.total
            }
        default:
            return state;
    }
}

export default ventaReducer;