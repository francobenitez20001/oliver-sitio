import {API} from '../../config/index';
import {TRAER_TODAS,LOADING,ERROR} from '../types/subcategoriasTypes';

export const traerTodas = ()=>async (dispatch)=>{
    dispatch({
        type:LOADING
    });
    try {
        return fetch(`${API}subcategoria`).then(res=>res.json()).then(data=>{
            const subcategorias = data.data;
            dispatch({
                type:TRAER_TODAS,
                payload:subcategorias
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