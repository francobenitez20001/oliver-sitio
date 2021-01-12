import {API,PUBLIC_URL} from '../../config/index';
import {VERIFICAR_SESION,LOGIN,LOGOUT,LOADING,ERROR,UPDATE_USER,UPDATE_PASSWORD} from '../types/usuarioTypes';

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
                    foto:response.usuario.foto,
                    token:response.token,
                    address:response.usuario.ubicacion,
                    idUsuario:response.usuario.idUsuario,
                    lat:response.usuario.lat,
                    lon:response.usuario.lon,
                    telefono:response.usuario.telefono
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

export const verificarSesion=(token=null)=>async(dispatch)=>{
    try {
        let dataUsuario = JSON.parse(localStorage.getItem('oliverpetshop_usuario'));
        if(dataUsuario || token){
            // request para verificar que el token corresponda a una sesion activa
            let headers = new Headers();
            let tokenSend = (token)?token:dataUsuario.token;
            headers.append('token',tokenSend);
            const request = await fetch(`${API}verify-sesion`,{
                method:'GET',
                headers
            });
            if(request.status!=200){
                return dispatch({
                    type:VERIFICAR_SESION,
                    payload:{data:null,logueado:false}
                })
            }
            return dispatch({
                type:VERIFICAR_SESION,
                payload:{data:dataUsuario,logueado:true}
            })
        }
        return dispatch({
            type:VERIFICAR_SESION,
            payload:{data:null,logueado:false}
        })
    } catch (error) {
        dispatch({
            type:ERROR,
            payload:error
        })
    }
}

export const register=(data)=>(dispatch)=>{
    dispatch({
        type:LOADING
    });
    try {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        return fetch(`${API}register`,{
            method:'POST',
            body:JSON.stringify(data),
            headers
        }).then(res=>res.json()).then(response=>{
            if(response.ok){
                let objUsuario = {
                    nombre:response.usuario.nombre,
                    email:response.usuario.email,
                    foto:response.usuario.foto,
                    token:response.token,
                    address:response.usuario.address,
                    idUsuario:response.usuario.idUsuario
                }
                localStorage.setItem('oliverpetshop_usuario',JSON.stringify(objUsuario));
                dispatch({
                    type:LOGIN,
                    payload:localStorage.getItem('oliverpetshop_usuario')
                });
            }else{
                dispatch({
                    type:ERROR,
                    payload:response.info
                })
            }
        })
    } catch (error) {
        dispatch({
            type:ERROR,
            payload:error
        })
    }
}

export const singInWithGoogle = tokenId => async(dispatch)=>{
    dispatch({
        type:LOADING
    });
    try {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        return fetch(`${API}google/tokensignin`,{
            method:'POST',
            headers,
            body:JSON.stringify({token:tokenId})
        }).then(res=>res.json()).then(response=>{
            if(!response.ok){
                return dispatch({
                    type:ERROR,
                    payload:response.info
                })
            };
            let objUsuario = {
                nombre:response.usuario.nombre,
                email:response.usuario.email,
                foto:response.usuario.foto,
                token:response.token,
                address:response.usuario.address,
                idUsuario:response.usuario.idUsuario,
                lat:response.usuario.lat,
                lon:response.usuario.lon,
                telefono:response.usuario.telefono
            }
            localStorage.setItem('oliverpetshop_usuario',JSON.stringify(objUsuario));
            dispatch({
                type:LOGIN,
                payload:localStorage.getItem('oliverpetshop_usuario')
            });
        })
    } catch (error) {
        dispatch({
            type:ERROR,
            payload:error
        })
    }
}

export const actualizarFoto = (data,id) =>async(dispatch)=>{
    dispatch({
        type:LOADING
    });
    try {
        let headers = new Headers();
        let token = JSON.parse(localStorage.getItem('oliverpetshop_usuario')).token;
        headers.append("token", token);
        const request = await fetch(`${API}actualizarFotoUsuarioDesdeWeb/${id}`,{
            method:'PUT',
            headers,
            body:data
        });
        const dataRequest = await request.json();
        if(dataRequest.ok){
            localStorage.setItem('oliverpetshop_usuario',JSON.stringify(dataRequest.user));
            dispatch({
                type:UPDATE_USER,
                payload:dataRequest.user
            })
        }
    } catch (error) {
        dispatch({
            type:ERROR,
            payload:error
        })
    }
}

export const actualizarUsuario = (data,id)=>async dispatch=>{
    dispatch({
        type:LOADING
    });
    try {
        let headers = new Headers();
        let token = JSON.parse(localStorage.getItem('oliverpetshop_usuario')).token;
        if(!token) return dispatch({type:ERROR,payload:'Token incorrecto'});
        headers.append('token',token);
        headers.append("Content-Type", "application/json");
        const request = await fetch(`${API}actualizarUsuarioDesdeWeb/${id}`,{
            method:'PUT',
            headers,
            body:JSON.stringify(data)
        });
        if(request.status!=200) return dispatch({type:ERROR,payload:'Ocurrio un error, ¡intentelo más tarde!'})
        const dataRequest = await request.json();
        if(dataRequest.ok){
            localStorage.setItem('oliverpetshop_usuario',JSON.stringify(dataRequest.user));
            return dispatch({
                type:UPDATE_USER,
                payload:dataRequest.user
            })
        }
        return dispatch({
            type:ERROR,
            payload:dataRequest.info
        })
    } catch (error) {
        dispatch({
            type:ERROR,
            payload:error.message
        })
    }
}

export const actualizarAddress = (data,id)=>async dispatch=>{
    dispatch({
        type:LOADING
    });
    try {
        let headers = new Headers();
        let token = JSON.parse(localStorage.getItem('oliverpetshop_usuario')).token;
        if(!token) return dispatch({type:ERROR,payload:'Token incorrecto'});
        headers.append('token',token);
        headers.append("Content-Type", "application/json");
        const request = await fetch(`${API}actualizarDireccion/${id}`,{
            method:'PUT',
            headers,
            body:JSON.stringify(data)
        });
        if(request.status!=200) return dispatch({type:ERROR,payload:'Ocurrio un error, ¡intentelo más tarde!'})
        const dataRequest = await request.json();
        if(dataRequest.ok){
            localStorage.setItem('oliverpetshop_usuario',JSON.stringify(dataRequest.usuario));
            return dispatch({
                type:UPDATE_USER,
                payload:dataRequest.usuario
            })
        }
        return dispatch({
            type:ERROR,
            payload:dataRequest.info
        })
    } catch (error) {
        dispatch({
            type:ERROR,
            payload:error.message
        }) 
    }
}

export const sendEmailForResetPassword = idUsuario=> async dispatch=>{
    dispatch({
        type:LOADING
    });
    try {
        let headers = new Headers();
        let token = JSON.parse(localStorage.getItem('oliverpetshop_usuario')).token;
        if(!token) return dispatch({type:ERROR,payload:'Token incorrecto'});
        headers.append('token',token);
        headers.append("Content-Type", "application/json");
        const request = await fetch(`${API}resetPassword`,{
            method:'POST',
            headers,
            body:JSON.stringify({idUsuario})
        });
        if(request.status!=200) return dispatch({type:ERROR,payload:'Ocurrio un error, ¡intentelo más tarde!'})
        const dataRequest = await request.json();
        if(dataRequest.ok){
            return console.log(dataRequest);
        }
        return dispatch({
            type:ERROR,
            payload:dataRequest.info
        })
    } catch (error) {
        dispatch({
            type:ERROR,
            payload:dataRequest.info
        })
    }
}

export const updatePassword = (data,token) => async dispatch=>{
    dispatch({
        type:LOADING
    });
    try {
        if(data.confirmNewPassword === '' || data.newPassword ===''){
            return dispatch({
                type:ERROR,
                payload:'Los dos campos son obligarios.'
            });
        }
        if(data.confirmNewPassword != data.newPassword){
            return dispatch({
                type:ERROR,
                payload:'Las contraseñas no coinciden.'
            });
        }
        let headers = new Headers();
        headers.append('refresh-token',token);
        headers.append("Content-Type", "application/json");
        const request = await fetch(`${API}new-password`,{
            method:'PUT',
            headers,
            body:JSON.stringify(data)
        });
        if(request.status!=200) return dispatch({
            type:ERROR,
            payload:'Ups, algo ha salido mal...'
        });
        dispatch({
            type:UPDATE_PASSWORD
        });
        return setTimeout(() => {
            window.location.assign(`${PUBLIC_URL}`);
        }, 5000);
    } catch (error) {
        return dispatch({
            type:ERROR,
            payload:error
        });
    }
}