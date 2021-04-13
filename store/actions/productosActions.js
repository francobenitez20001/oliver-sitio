import {API} from '../../config/index';
import {isMobile} from '../../helpers/index';
import {TRAER_TODOS,TRAER_UNO,LOADING,ERROR,TRAER_PROMOCIONES,ORDENAR_PRODUCTOS,FILTRANDO,LOADING_MAS,TRAER_MAS, TRAER_OFERTAS, APLICAR_FILTRO_CATEGORIA, APLICAR_FILTRO_SUBCATEGORIA, APLICAR_FILTRO_MARCA, APLICAR_FILTRO_BUSCADOR, APLICAR_FILTRO_ORDEN, ELIMINAR_FILTRO_CATEGORIA, ELIMINAR_FILTRO_SUBCATEGORIA, ELIMINAR_FILTRO_MARCA, ELIMINAR_FILTRO_BUSCADOR, ELIMINAR_FILTRO_ORDEN, PRODUCTOS_RESTABLECER_FILTROS, PRODUCTOS_PAGINACION} from '../types/productosTypes';

export const traerProductos = ()=>async (dispatch,getState)=>{
    dispatch({
        type:LOADING
    });
    try {
        //obtengo el estado actualizado de los filtros
        const {filtrando,filtros:{categoria,subcategoria,marca,search,orden},paginacion:{desde,limiteMobile,limiteDesktop}} = getState().productosReducer;

        let url = `${API}`;
        if(!filtrando){
            url += `/producto?desde=${desde}&limite=${isMobile() ? limiteMobile :limiteDesktop}`;
        }else{
            if(search.trim() !== ""){
                url += `/buscar?busqueda=${search}`
            }else{
                url+=`/productos/filtro/filtrar?desde=${desde}&limite=${isMobile() ? limiteMobile :limiteDesktop}&`;
                if(categoria) { url += `categoria=${categoria}&` }
                if(subcategoria) { url += `subcategoria=${subcategoria}&` }
                if(marca) { url += `marca=${marca}`}
            }
        }

        // console.log(url);
        
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

export const traerMas = ()=>async (dispatch,getState)=>{
    dispatch({
        type:LOADING_MAS
    });
    try {
        //obtengo el estado actualizado de los filtros
        const {productos,filtrando,filtros:{categoria,subcategoria,marca,search,orden},paginacion:{desde,limiteMobile,limiteDesktop}} = getState().productosReducer;

        let url = `${API}`;
        if(!filtrando){
            url += `/producto?desde=${desde}&limite=${isMobile() ? limiteMobile :limiteDesktop}`;
        }else{
            if(search.trim() !== ""){
                url += `/buscar?busqueda=${search}`
            }else{
                url+=`/productos/filtro/filtrar?desde=${desde}&limite=${isMobile() ? limiteMobile :limiteDesktop}&`;
                if(categoria) { url += `categoria=${categoria}&` }
                if(subcategoria) { url += `subcategoria=${subcategoria}&` }
                if(marca) { url += `marca=${marca}`}
            }
        }

        return fetch(url).then(res=>res.json()).then(data=>{
            let updateproductos = [...productos,...data.data];
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

export const updatePaginacion = ()=>(dispatch,getState)=>{
    const {paginacion} = getState().productosReducer;
    let desdeUpdated = isMobile() ? paginacion.desde + paginacion.limiteMobile : paginacion.desde + paginacion.limiteDesktop;
    dispatch({
        type:PRODUCTOS_PAGINACION,
        payload:desdeUpdated
    });
}