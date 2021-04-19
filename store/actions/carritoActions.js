//import {API} from '../config/index';
import {TRAER_PRODUCTOS,AGREGAR_PRODUCTO,ELIMINAR_PRODUCTO,LOADING,ERROR, CAMBIAR_MEDIO_DE_PAGO, CAMBIAR_COSTO_ENVIO} from '../types/carritoTypes';

export const traerProductos = ()=>async (dispatch)=>{
    dispatch({
        type:LOADING
    });
    try {
        const productos = await JSON.parse(localStorage.getItem('carrito'));
        let subtotal = 0;
        productos.forEach(prd => {
            subtotal += parseInt(prd.precio * prd.cantidad);
        });
        let payloadData = {
            productos,
            subtotal
        }
        return dispatch({
            type:TRAER_PRODUCTOS,
            payload:payloadData
        });
    } catch (error) {
        return dispatch({
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
        let listProductosUpgrade;
        let productoRepetido = productos.filter(res=>res.idSubProducto==producto.idSubProducto);
        if(productoRepetido.length>0){//si se intenta agregar de nuevo el mismo producto, se suma la cantidad, no todo el producto.
            productoRepetido[0].cantidad = productoRepetido[0].cantidad + producto.cantidad;
            let restantes = productos.filter(newRes=>newRes.idSubProducto!=productoRepetido[0].idSubProducto);
            if(restantes.length>0){
                listProductosUpgrade = [
                    ...restantes,
                    productoRepetido[0]
                ];
            }else{
                listProductosUpgrade = [
                    productoRepetido[0]
                ];
            }
        }else{
            listProductosUpgrade = [
                ...productos,
                producto
            ];
        }
        //actualizo localstorage
        localStorage.setItem('carrito',JSON.stringify(listProductosUpgrade));

        //calculo el subtotal
        const prds = JSON.parse(localStorage.getItem('carrito'));
        let subtotal = 0;
        prds.forEach(prd => {
            subtotal += parseInt(prd.precioUnidad * prd.cantidad);
        });

        let payloadData = {
            listProductosUpgrade,
            subtotal
        }
        setTimeout(() => {
            dispatch({
                type:AGREGAR_PRODUCTO,
                payload:payloadData
            })
        }, 1500);
    } catch (error) {
       dispatch({
            type:ERROR,
            payload:error
        }) 
    }
}

export const eliminarProducto = idSubProducto=>async (dispatch,getState)=>{
    dispatch({
        type:LOADING
    });
    try {
        const {productos} = getState().carritoReducer;
        //filtro los productos que no tengan el idProducto que se recibió. entonces elimino ese producto y actualizo el reducer.
        const newProductos = productos.filter(newArray=>newArray.idSubProducto !== idSubProducto);
        //console.log(newProductos);
        localStorage.setItem('carrito',JSON.stringify(newProductos));

        //calculo el subtotal
        const prds = JSON.parse(localStorage.getItem('carrito'));
        let subtotal = 0;
        prds.forEach(prd => {
            subtotal += parseInt(prd.precio * prd.cantidad);
        });
        
        let payloadData = {
            newProductos,
            subtotal
        }
        dispatch({
            type:ELIMINAR_PRODUCTO,
            payload:payloadData
        });
    } catch (error) {
        dispatch({
            type:ERROR,
            payload:error
        })    
    }
}

export const cambiarMedioDePago = idMedioDePago =>dispatch=>{
    return dispatch({
        type:CAMBIAR_MEDIO_DE_PAGO,
        payload:idMedioDePago
    })
}

export const setCostoEnvio = costo=>dispatch=>{
    return dispatch({
        type:CAMBIAR_COSTO_ENVIO,
        payload:costo
    })
}