import React from 'react';
import ProductoCarritoModule from './ProductoCarrito.module.css';
import {API} from '../../../config/index';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const ProductoCarrito = (props) => {
    const {foto,producto,peso,total,idSubProducto,cantidad} = props;
    return (
        <div className={ProductoCarritoModule.card__productoCarrito+' '+`col-12`}>
            <FontAwesomeIcon icon={faTrash} className={ProductoCarritoModule.delete_producto_carrito} onClick={()=>props.eliminarProducto(idSubProducto)}></FontAwesomeIcon>
            <div className={ProductoCarritoModule.img__producto__wrapper}>
                <img src={`${API}img/${foto}`} alt="prd" className="img-fluid"/>
            </div>
            <div className={ProductoCarritoModule.info__productoCarrito}>
                <span className={ProductoCarritoModule.carrito__nombre__producto+' '+`d-block`}>{producto}</span>
                <span className={ProductoCarritoModule.carrito__cantidad__producto+' '+`d-block`}>x {peso}Kg</span>
                <span className="text-muted"><b>{cantidad}</b> {cantidad>1?'unidades':'unidad'}</span>
            </div>
            <div className={ProductoCarritoModule.total__producto__carrito}>
                <span className="text-black">${total * cantidad}</span>
            </div>
        </div>
    );
}
 
export default ProductoCarrito;