import {API} from '../../config/index';
import {VERIFICAR_SESION,LOGIN,LOGOUT,LOADING,ERROR} from '../types/usuarioTypes';

export const login = (data)=>async(dispatch)=>{
    dispatch({
        type:LOADING
    });
    try {
        if(data.email.trim() === '' || data.password.trim() === ''){
            return dispatch({
                type:ERROR,
                payload:'Es necesario completar todos los campos'
            })
        }
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        return fetch(`${API}/login`,{
            method:'POST',
            body:JSON.stringify(data),
            headers
        }).then(res=>res.json()).then(response=>{
            if(response.ok){
                let objUsuario = {
                    nombre:response.usuario.nombre,
                    email:response.usuario.email,
                    foto:response.usuario.foto
                }
                localStorage.setItem('oliverpetshop_usuario',JSON.stringify(objUsuario));
                dispatch({
                    type:LOGIN,
                    payload:localStorage.getItem('oliverpetshop_usuario')
                })
            }else{
                return dispatch({
                    type:ERROR,
                    payload:response.info
                })
            }
        })
    } catch (error) {
        console.log(error);
        return dispatch({
            type:ERROR,
            payload:error
        })
    }
}

export const logout = ()=>async(dispatch)=>{
    dispatch({
        type:LOADING
    });
    try {
        localStorage.removeItem('oliverpetshop_usuario');
        return dispatch({
            type:LOGOUT
        })
    } catch (error) {
        dispatch({
            type:ERROR,
            payload:error
        })
    }
}

export const verificarSesion=()=>async(dispatch)=>{
    try {
        let dataUsuario = localStorage.getItem('oliverpetshop_usuario');
        if(dataUsuario){
            return dispatch({
                type:VERIFICAR_SESION,
                payload:true
            })
        }
        return dispatch({
            type:VERIFICAR_SESION,
            payload:false
        })
    } catch (error) {
        dispatch({
            type:ERROR,
            payload:error
        })
    }
}