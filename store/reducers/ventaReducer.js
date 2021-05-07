import { CAMBIAR_ZONA_ENVIO, CAMBIAR_MEDIO_DE_PAGO, CAMBIAR_TIPO_ENVIO, TRAER_INFO } from "../types/ventasTypes";

const INTITAL_STATE = {
    idMedioPago:1,
    totalEnvio:0,
    idZona:null,
    tipoEnvio:null,
    productos:[],
    cantidad:0,
    subtotal:0,
    total:0
}

const ventaReducer = (state=INTITAL_STATE,action)=>{
    switch (action.type) {
        case TRAER_INFO:
            return {
                ...state,
                productos:action.payload.productos,
                cantidad:action.payload.cantidad,
                subTotal:action.payload.subTotal,
                total:state.subtotal + state.totalEnvio
            }
        case CAMBIAR_MEDIO_DE_PAGO:
            return {
                ...state,
                idMedioPago:action.payload
            }
        case CAMBIAR_ZONA_ENVIO:
            return {
                ...state,
                totalEnvio:action.payload.total,
                idZona:action.payload.zona
            }
        case CAMBIAR_TIPO_ENVIO://local,domicilio,express
            return{
                ...state,
                tipoEnvio:action.payload.tipo,
                totalEnvio:action.payload.total
            }
        default:
            return state;
    }
}

export default ventaReducer;