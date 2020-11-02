import {API} from '../../config/index';
import {TRAER_TODAS,LOADING,ERROR} from '../types/marcasTypes';

export const traerTodas = ()=>async (dispatch)=>{
    dispatch({
        type:LOADING
    });
    try {
        return fetch(`${API}marca`).then(res=>res.json()).then(data=>{
            const marcas = data.data;
            dispatch({
                type:TRAER_TODAS,
                payload:marcas
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