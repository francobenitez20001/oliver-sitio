import {API} from '../../config/index';
import {TRAER_ZONAS,SELECCIONAR,LOADING,ERROR, LIMPIAR_ACTIVO} from '../types/zonasTypes';

export const traerTodas = ()=>async (dispatch)=>{
    dispatch({
        type:LOADING
    });
    try {
        const dataUser = JSON.parse(localStorage.getItem('oliverpetshop_usuario'));
        let myHeaders = new Headers();
        myHeaders.append("token", dataUser.token);
        const zonasApi = await fetch(`${API}/zonas`,{headers:myHeaders});
        const dataZonas = await zonasApi.json();
        dispatch({
            type:TRAER_ZONAS,
            payload:dataZonas.data
        });
    } catch (error) {
        dispatch({
            type:ERROR,
            payload:error
        })
    }
}

export const seleccionar = id =>(dispatch,getState)=>{
    if(!id){
        console.log('aca');
        dispatch({
            type:LIMPIAR_ACTIVO
        })
        return;
    }
    const {zonas} = getState().zonasReducer;
    let zona = zonas.filter(z=>z.idZona == id);
    if(!zona.length){
        dispatch({
            type:ERROR,
            payload:'No se encontro la zona'
        });
        return;
    }
    zona = zona[0];
    dispatch({
        type:SELECCIONAR,
        payload:zona
    })
}