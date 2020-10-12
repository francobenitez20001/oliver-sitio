import {API} from '../../config/index';
import {TRAER_TODOS,LOADING,ERROR,TRAER_PROMOCIONES,ORDENAR_PRODUCTOS,FILTRANDO} from '../../store/types/productosTypes';
export const traerTodos = ()=>async (dispatch)=>{
    dispatch({
        type:LOADING
    });
    try {
        dispatch({
            type:TRAER_TODOS,
            payload:productos
        });
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
        fetch(`${API}/subproducto?desde=1&limite=8`).then(res=>res.json()).then(data=>{
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
        setTimeout(() => {
            dispatch({
                type:FILTRANDO,
                payload:productos
            })
        }, 1000);
    } catch (error) {
        dispatch({
            type:ERROR,
            payload:error
        })
    }
}