import {API} from '../../config/index';
import {TRAER_TODOS,TRAER_UNO,LOADING,ERROR,TRAER_PROMOCIONES,ORDENAR_PRODUCTOS,FILTRANDO} from '../types/productosTypes';
export const traerTodos = ()=>async (dispatch)=>{
    dispatch({
        type:LOADING
    });
    try {
        return fetch(`${API}/producto?desde=1&limite=30`).then(res=>res.json()).then(data=>{
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

export const traerPorId = id=>async(dispatch)=>{
    dispatch({
        type:LOADING
    });
    try {
        return fetch(`${API}producto/${id}`).then(res=>res.json()).then(data=>{
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
        return fetch(`${API}/producto?desde=1&limite=8`).then(res=>res.json()).then(data=>{
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
    console.log('filtrando');
    console.log(url);
    dispatch({
        type:LOADING
    });
    try {
        let urlFiltro = (url.includes('buscar?busqueda'))?`productos/${url}`:`productos/filtro/${url}`;
        return fetch(`${API}${urlFiltro}`).then(res=>res.json()).then(data=>{
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