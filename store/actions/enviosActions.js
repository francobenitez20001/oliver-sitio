import { LOADING,ERROR,GUARDAR } from "../types/enviosTypes";

export const guardar = data => async dispatch=>{
    dispatch({
        type:LOADING
    });
    try {
        if(!data) return dispatch({
            type:ERROR,
            payload:'Sin datos de envío'
        })
        dispatch({
            type:GUARDAR,
            payload:`${data}`.toLowerCase()
        })
    } catch (error) {
        dispatch({
            type:ERROR,
            payload:error.message
        })
    }
}