import {API} from '../../config/index';
import {TRAER_TODAS,LOADING,ERROR} from '../types/bannerTypes';

export const traerTodas = ()=>async (dispatch)=>{
    dispatch({
        type:LOADING
    });
    try {
        return fetch(`${API}/banners`).then(res=>res.json()).then(data=>{
            const banners = data.data;
            dispatch({
                type:TRAER_TODAS,
                payload:banners
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