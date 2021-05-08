import { CAMBIAR_MEDIO_DE_PAGO, ACTUALIZAR_DATOS_ENVIO, TRAER_INFO } from "../types/ventasTypes";

export const init = ()=>(dispatch,getState)=>{
    const {productos,cantidad,total} = getState().carritoReducer;
    const data = {
        productos,
        cantidad,
        subTotal:total
    };
    dispatch({
        type:TRAER_INFO,
        payload:data
    })
}

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
        dataZona.total = zona ? zona.precio : 0;
        dataZona.tipo = 'Domicilio';
    }else if(tipos.express){
        dataZona.total = zona ? zona.precio_express : 0;
        dataZona.tipo = 'Express';
        dataZona.idMedioPago = '1';
    }else{
        dataZona.total = 0;
        dataZona.tipo = 'Local';
    }

    dataZona.zona = zona ? zona.idZona : null;
    dataZona.idMedioPago = '1';

    return dispatch({
        type:ACTUALIZAR_DATOS_ENVIO,
        payload:dataZona
    })
}