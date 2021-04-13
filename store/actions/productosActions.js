import {API} from '../../config/index';
import {isMobile} from '../../helpers/index';
import {TRAER_TODOS,TRAER_UNO,LOADING,ERROR,TRAER_PROMOCIONES,ORDENAR_PRODUCTOS,FILTRANDO,LOADING_MAS,TRAER_MAS, TRAER_OFERTAS, APLICAR_FILTRO_CATEGORIA, APLICAR_FILTRO_SUBCATEGORIA, APLICAR_FILTRO_MARCA, APLICAR_FILTRO_BUSCADOR, APLICAR_FILTRO_ORDEN, ELIMINAR_FILTRO_CATEGORIA, ELIMINAR_FILTRO_SUBCATEGORIA, ELIMINAR_FILTRO_MARCA, ELIMINAR_FILTRO_BUSCADOR, ELIMINAR_FILTRO_ORDEN, PRODUCTOS_RESTABLECER_FILTROS} from '../types/productosTypes';

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
        let url = `${API}/subproductos/ofertas?desde=0&limite=9`;
        if(isMobile()){
            url = `${API}/subproductos/ofertas?desde=0&limite=6`;
        }
        return fetch(url).then(res=>res.json()).then(data=>{
            dispatch({
                type:TRAER_OFERTAS,
                payload:data.data
            });
        })
    } catch (error) {
        dispatch({
            type:ERROR,
            payload:error.message
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

export const filtrarProductos = (url,desde,limiteDesktop,limiteMobile)=>async dispatch=>{
    //console.log('filtrando');
    //console.log(url);
    dispatch({
        type:LOADING
    });
    try {
        let urlFiltro = (url.includes('buscar?busqueda'))?`productos/${url}&`:`productos/filtro/${url}&`;
        if(isMobile()){
            urlFiltro += `desde=${desde}&limite=${limiteMobile}`;
        }else{
            urlFiltro += `desde=${desde}&limite=${limiteDesktop}`;
        }
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

export const aplicarFiltro = (tipo,valor)=>dispatch=>{
    switch (tipo) {
        case 'categoria':
            dispatch({
                type:APLICAR_FILTRO_CATEGORIA,
                payload:valor
            })
            break;
        case 'subcategoria':
            dispatch({
                type:APLICAR_FILTRO_SUBCATEGORIA,
                payload:valor
            })
            break;
        case 'marca':
            dispatch({
                type:APLICAR_FILTRO_MARCA,
                payload:valor
            })
            break;
        case 'search':
            dispatch({
                type:APLICAR_FILTRO_BUSCADOR,
                payload:valor
            })
            break;
        case 'orden':
            dispatch({
                type:APLICAR_FILTRO_ORDEN,
                payload:valor
            })
            break;
        default:
            break;
    }
}

export const quitarFiltro = (tipo)=>(dispatch,getState)=>{
    const {filtros:{categoria,subcategoria,marca,search,orden}} = getState().productosReducer;
    switch (tipo) {
        case 'categoria':
            if(!subcategoria && !marca){
                dispatch({
                    type:PRODUCTOS_RESTABLECER_FILTROS
                })
            }else{
                dispatch({
                    type:ELIMINAR_FILTRO_CATEGORIA
                })
            }
            break;
        case 'subcategoria':
            if(!categoria && !marca){
                dispatch({
                    type:PRODUCTOS_RESTABLECER_FILTROS
                })
            }else{
                dispatch({
                    type:ELIMINAR_FILTRO_SUBCATEGORIA
                })
            }
            break;
        case 'marca':
            if(!categoria && !subcategoria){
                dispatch({
                    type:PRODUCTOS_RESTABLECER_FILTROS
                })
            }else{
                dispatch({
                    type:ELIMINAR_FILTRO_MARCA
                })
            }
            break;
        case 'buscador':
            dispatch({
                type:ELIMINAR_FILTRO_BUSCADOR
            })
            break;
        case 'orden':
            dispatch({
                type:ELIMINAR_FILTRO_ORDEN
            })
            break;
        default:
            break;
    }
}

export const restablecerFiltros = ()=>dispatch=>{
    dispatch({
        type:PRODUCTOS_RESTABLECER_FILTROS
    })
}