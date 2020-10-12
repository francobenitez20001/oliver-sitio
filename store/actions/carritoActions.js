//import {API} from '../config/index';
import {TRAER_PRODUCTOS,AGREGAR_PRODUCTO,ELIMINAR_PRODUCTO,LOADING,ERROR} from '../types/carritoTypes';

export const traerProductos = ()=>async (dispatch)=>{
    dispatch({
        type:LOADING
    });
    try {
        const productos = JSON.parse(localStorage.getItem('carrito'));
        dispatch({
            type:TRAER_PRODUCTOS,
            payload:productos
        });
    } catch (error) {
        dispatch({
            type:ERROR,
            payload:error
        })
    }
}

export const agregarProducto = producto=>async (dispatch,getState)=>{
    dispatch({
        type:LOADING
    });
    try {
        //productos que hay en el reducer
        let {productos} = getState().carritoReducer;
        let listProductosUpgrade = [
            ...productos,
            producto
        ];
        //actualizo localstorage
        localStorage.setItem('carrito',JSON.stringify(listProductosUpgrade));
        setTimeout(() => {
            dispatch({
                type:AGREGAR_PRODUCTO,
                payload:listProductosUpgrade
            })
        }, 1500);
    } catch (error) {
       dispatch({
            type:ERROR,
            payload:error
        }) 
    }
}

export const eliminarProducto = idProducto=>async (dispatch,getState)=>{
    dispatch({
        type:LOADING
    });
    try {
        const {productos} = getState().carritoReducer;
        //filtro los productos que no tengan el idProducto que se recibió. entonces elimino ese producto y actualizo el reducer.
        const newProductos = productos.filter(newArray=>newArray.idProducto !== idProducto);
        localStorage.setItem('carrito',JSON.stringify(newProductos));
        dispatch({
            type:ELIMINAR_PRODUCTO,
            payload:newProductos
        });
    } catch (error) {
        dispatch({
            type:ERROR,
            payload:error
        })    
    }
}