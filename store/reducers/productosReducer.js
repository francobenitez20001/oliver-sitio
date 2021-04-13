import {TRAER_TODOS,TRAER_UNO,LOADING,ERROR,TRAER_PROMOCIONES,ORDENAR_PRODUCTOS,FILTRANDO,LOADING_MAS,TRAER_MAS, TRAER_OFERTAS, APLICAR_FILTRO_CATEGORIA, APLICAR_FILTRO_SUBCATEGORIA, APLICAR_FILTRO_MARCA, APLICAR_FILTRO_BUSCADOR, APLICAR_FILTRO_ORDEN, ELIMINAR_FILTRO_CATEGORIA, ELIMINAR_FILTRO_SUBCATEGORIA, ELIMINAR_FILTRO_MARCA, ELIMINAR_FILTRO_BUSCADOR, ELIMINAR_FILTRO_ORDEN, PRODUCTOS_RESTABLECER_FILTROS} from '../types/productosTypes';

const INITIAL_STATE = {
    productos:[],
    producto:null,
    loading:false,
    loading_mas:false,
    error:null,
    ofertas:[],
    filtrando:false,
    filtros:{
        categoria:null,
        subcategoria:null,
        marca:null,
        search:'',
        orden:null
    }
};

const subproductosReducer = (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case TRAER_TODOS:
            return {...state,productos:action.payload,loading:false}
        case TRAER_MAS:
            return {...state,productos:action.payload,loading_mas:false}
        case TRAER_UNO:
            return {...state,producto:action.payload,loading:false}
        case TRAER_PROMOCIONES:
            return {...state,promociones:action.payload,loading:false}
        case ORDENAR_PRODUCTOS:
            return {...state,productos:action.payload,loading:false};
        case FILTRANDO:
            return {...state,productos:action.payload,loading:false};
        case LOADING:
            return {...state,loading:true}
        case LOADING_MAS:
            return {...state,loading_mas:true}
        case ERROR:
            return {...state,loading:false,error:action.payload}
        case TRAER_OFERTAS:
            return {...state,ofertas:action.payload,loading:false,error:null};
        case PRODUCTOS_RESTABLECER_FILTROS:
            return {
                ...state,
                filtrando:false,
                filtros:{
                    categoria:null,
                    subcategoria:null,
                    marca:null,
                    search:'',
                    orden:null
                }
            }
        case APLICAR_FILTRO_CATEGORIA:
            return {
                ...state,
                filtrando:true,
                filtros:{
                    ...state.filtros,
                    categoria:action.payload
                }
            }
        case APLICAR_FILTRO_SUBCATEGORIA:
            return {
                ...state,
                filtrando:true,
                filtros:{
                    ...state.filtros,
                    subcategoria:action.payload
                }
            }
        case APLICAR_FILTRO_MARCA:
            return {
                ...state,
                filtrando:true,
                filtros:{
                    ...state.filtros,
                    marca:action.payload
                }
            }
        case APLICAR_FILTRO_BUSCADOR:
            return {
                ...state,
                filtrando:true,
                filtros:{
                    ...state.filtros,
                    search:action.payload
                }
            }
        case APLICAR_FILTRO_ORDEN:
            return {
                ...state,
                filtros:{
                    ...state.filtros,
                    orden:action.payload
                }
            }
        case ELIMINAR_FILTRO_CATEGORIA:
            return {
                ...state,
                filtrando:true,
                filtros:{
                    ...state.filtros,
                    categoria:null
                }
            }
        case ELIMINAR_FILTRO_SUBCATEGORIA:
            return {
                ...state,
                filtrando:true,
                filtros:{
                    ...state.filtros,
                    subcategoria:null
                }
            }
        case ELIMINAR_FILTRO_MARCA:
            return {
                ...state,
                filtrando:true,
                filtros:{
                    ...state.filtros,
                    marca:null
                }
            }
        case ELIMINAR_FILTRO_BUSCADOR:
            return {
                ...state,
                filtrando:true,
                filtros:{
                    ...state.filtros,
                    buscador:null
                }
            }
        case ELIMINAR_FILTRO_ORDEN:
            return {
                ...state,
                filtros:{
                    ...state.filtros,
                    orden:null
                }
            }
        default:
            return state;
    }
}

export default subproductosReducer;
