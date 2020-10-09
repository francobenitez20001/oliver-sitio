import React from 'react';
import ProductoCarritoModule from './ProductoCarrito.module.css';
const ProductoCarrito = (props) => {
    const {foto,producto,peso,total,idProducto} = props;
    return (
        <div className={ProductoCarritoModule.card__productoCarrito `col-12`}>
            <i className={ProductoCarritoModule.delete_producto_carrito `fas fa-trash-alt`} onClick={()=>props.eliminarProducto(idProducto)}></i>
            <div className={ProductoCarritoModule.img__producto__wrapper}>
                <img src={foto} alt="prd" className="img-fluid"/>
            </div>
            <div className={ProductoCarritoModule.info__productoCarrito}>
                <span className={ProductoCarritoModule.carrito__nombre__producto `d-block`}>{producto}</span>
                <span className={ProductoCarritoModule.carrito__cantidad__producto `d-block`}>x {peso}Kg</span>
            </div>
            <div className={ProductoCarritoModule.total__producto__carrito}>
                <span className="text-black">${total}</span>
            </div>
        </div>
    );
}
 
export default ProductoCarrito;