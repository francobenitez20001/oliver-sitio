import {VERIFICAR_SESION,LOGIN,LOGOUT,LOADING,ERROR} from '../types/usuarioTypes';

const INITIAL_STATE = {
    usuario:null,
    logueado:false,
    loading:false,
    error:null
};

const usuarioReducer = (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case VERIFICAR_SESION:
            return {...state,logueado:action.payload.logueado,usuario:action.payload.data,loading:false}
        case LOGIN:
            return {...state,logueado:true,loading:false,error:null,usuario:JSON.parse(action.payload)}
        case LOGOUT:
            return {...state,usuario:null,logueado:false,loading:false}
        case LOADING:
            return {...state,loading:true}
        case ERROR:
            return {...state,logueado:false,loading:false,error:action.payload}
        default:
            return state;
    }
}

export default usuarioReducer;
