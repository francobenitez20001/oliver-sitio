import {API} from '../../config/index';
import {isMobile} from '../../helpers/index';
import {TRAER_TODOS,TRAER_UNO,LOADING,ERROR,TRAER_PROMOCIONES,ORDENAR_PRODUCTOS,FILTRANDO,LOADING_MAS,TRAER_MAS} from '../types/productosTypes';

export const traerTodos = ({desde,limiteDesktop,limiteMobile})=>async (dispatch)=>{
    dispatch({
        type:LOADING
    });
    try {
        let url = `${API}/producto?desde=${desde}&limite=${limiteDesktop}`;
        if(isMobile()){
            url = `${API}/producto?desde=${desde}&limite=${limiteMobile}`;
        }
        return fetch(url).then(res=>res.json()).then(data=>{
            dispatch({
                type:TRAER_TODOS,
                payload:data.data
            });
        })
    } catch (error) {
        dispatch({
            type:ERROR,
            payload:error
        })
    }
}

export const traerMas = (rangoProducto,prevProductos)=>async (dispatch)=>{
    dispatch({
        type:LOADING_MAS
    });
    try {
        let url = `${API}/producto?desde=${rangoProducto.desde}&limite=${rangoProducto.limiteDesktop}`;
        if(isMobile()){
            url = `${API}/producto?desde=${rangoProducto.desde}&limite=${rangoProducto.limiteMobile}`;
        }
        return fetch(url).then(res=>res.json()).then(data=>{
            let updateproductos = [...prevProductos,...data.data];
            dispatch({
                type:TRAER_MAS,
                payload:updateproductos
            });
        })
    } catch (error) {
        dispatch({
            type:ERROR,
            payload:error
        })
    }
}

export const traerPorId = id=>async(dispatch)=>{
    dispatch({
        type:LOADING
    });
    try {
        return fetch(`${API}/producto/${id}`).then(res=>res.json()).then(data=>{
            dispatch({
                type:TRAER_UNO,
                payload:data
            });
        })
    } catch (error) {
        dispatch({
            type:ERROR,
            payload:error
        })
    }
}

export const traerPromociones = ()=>async(dispatch)=>{
    dispatch({
        type:LOADING
    });
    try {
        let url = `${API}/producto?desde=1&limite=8`;
        if(isMobile()){
            url = `${API}/producto?desde=1&limite=4`;
        }
        return fetch(url).then(res=>res.json()).then(data=>{
            dispatch({
                type:TRAER_PROMOCIONES,
                payload:data.data
            });
        })
    } catch (error) {
        dispatch({
            type:ERROR,
            payload:error
        })
    }
}

export const ordenarProductos = productosOrdenados=>async dispatch=>{
    dispatch({
        type:LOADING
    });
    try {
        dispatch({
            type:ORDENAR_PRODUCTOS,
            payload:productosOrdenados
        });
    } catch (error) {
        dispatch({
            type:ERROR,
            payload:error
        })
    }
}

export const filtrarProductos = url=>async dispatch=>{
    //console.log('filtrando');
    //console.log(url);
    dispatch({
        type:LOADING
    });
    try {
        let urlFiltro = (url.includes('buscar?busqueda'))?`productos/${url}`:`productos/filtro/${url}`;
        return fetch(`${API}/${urlFiltro}`).then(res=>res.json()).then(data=>{
            dispatch({
                type:FILTRANDO,
                payload:data.data
            })
        })
    } catch (error) {
        dispatch({
            type:ERROR,
            payload:error
        })
    }
}