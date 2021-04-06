import {API} from '../../config/index';
import {TRAER,LOADING,ERROR} from '../types/politicaTypes';

export const traerInfo = ()=>async (dispatch)=>{
    dispatch({
        type:LOADING
    });
    try {
        return fetch(`${API}/legales`).then(res=>res.json()).then(data=>{
            const info = {
                politica:data.data[0].politica_privacidad,
                terminos:data.data[0].terminos_condiciones
            }
            dispatch({
                type:TRAER,
                payload:info
            });
        }).catch(err=>{
            dispatch({
                type:ERROR,
                payload:err
            })
        })
    } catch (error) {
        dispatch({
            type:ERROR,
            payload:error
        })
    }
}