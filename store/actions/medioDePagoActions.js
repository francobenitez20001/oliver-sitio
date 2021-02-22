import { LOADING,ERROR,TRAER_TODOS } from "../types/mediosDePagoTypes";
import {API} from '../../config/index';

export const traerMedios = ()=>async (dispatch,getState)=>{
    dispatch({type:LOADING});
    try {
        let {token} = getState().usuarioReducer.usuario;
        let headers = new Headers();
        headers.append('token',token);
        const reqMedios = await fetch(`${API}/mediosDePago`,{method:'GET',headers});
        if(reqMedios.status != 200) return dispatch({type:ERROR,payload:reqMedios.statusText});
        const dataMedios = await reqMedios.json();
        return dispatch({
            type:TRAER_TODOS,
            payload:dataMedios.data
        });
    } catch (error) {
        dispatch({
            type:ERROR,
            payload:error.message
        })
    }
}