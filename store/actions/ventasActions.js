import { CAMBIAR_MEDIO_DE_PAGO, CAMBIAR_ZONA_ENVIO } from "../types/ventasTypes";

export const cambiarMedioDePago = idMedioDePago =>(dispatch)=>{
    return dispatch({
        type:CAMBIAR_MEDIO_DE_PAGO,
        payload:idMedioDePago
    })
}

export const setCostoEnvio = ()=>(dispatch,getState)=>{
    const {zona} = getState().zonasReducer;
    const {tipos} = getState().enviosReducer;
    let dataZona = {};
    if(tipos.normal){
        dataZona.total = zona.precio;
    }else if(tipos.express){
        dataZona.total = zona.precio_express;
    }else{
        dataZona.total = 0;
    }

    dataZona.zona = zona.idZona;
    console.log(dataZona);
    return dispatch({
        type:CAMBIAR_ZONA_ENVIO,
        payload:dataZona
    })
}