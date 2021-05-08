import {SELECCIONAR, TRAER_ZONAS,LOADING,ERROR, LIMPIAR_ACTIVO} from '../types/zonasTypes'

const INITIAL_STATE = {
    zonas:[],
    zona:null,
    loading:false,
    error:null
}

const zonasReducer = (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case TRAER_ZONAS:
            return {
                ...state,
                zonas:action.payload,
                loading:false,
                error:null,
                zona:null
            }
        case SELECCIONAR:
            return {
                ...state,
                zona:action.payload,
                loading:false,
                error:null
            }
        case LIMPIAR_ACTIVO:
            return {
                ...state,
                zona:null
            }
        case LOADING:
            return {...state,loading:true}
        case ERROR:
            return {...state,loading:false,error:action.payload,zona:null}
        default:
            return state;
    }
}

export default zonasReducer;