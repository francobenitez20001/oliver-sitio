import {API} from '../../config/index';
import {TRAER_TODAS,LOADING,ERROR} from '../types/categoriasTypes';

export const traerTodas = ()=>async (dispatch)=>{
    dispatch({
        type:LOADING
    });
    try {
        return fetch(`${API}categorias`).then(res=>res.json()).then(data=>{
            const categorias = data.data;
            dispatch({
                type:TRAER_TODAS,
                payload:categorias
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