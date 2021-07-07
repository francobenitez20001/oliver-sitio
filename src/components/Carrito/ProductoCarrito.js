import React from 'react';
import ProductoCarritoModule from './ProductoCarrito.module.css';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProductoCarrito = (props) => {
    const {foto,producto,peso,total,idSubProducto,cantidad,fecha,totalExplicito,eliminarProducto} = props;
    return (
        <div className={ProductoCarritoModule.card__productoCarrito+' '+`col-12`}>
            {eliminarProducto ? <FontAwesomeIcon icon={faTrash} className={ProductoCarritoModule.delete_producto_carrito} onClick={()=>props.eliminarProducto(idSubProducto)}></FontAwesomeIcon> : null}
            <div className={ProductoCarritoModule.img__producto__wrapper}>
                <img src={foto} alt="prd" className="img-fluid"/>
            </div>
            <div className={ProductoCarritoModule.info__productoCarrito}>
                <span className={ProductoCarritoModule.carrito__nombre__producto+' '+`d-block`}>{producto}</span>
                <span className={ProductoCarritoModule.carrito__cantidad__producto+' '+`d-block`}>{fecha ? fecha : `x ${peso}Kg`}</span>
                <span className="text-muted"><b>{cantidad}</b> {cantidad>1?'unidades':'unidad'}</span>
            </div>
            <div className={ProductoCarritoModule.total__producto__carrito}>
                <span className="text-black">${totalExplicito ? totalExplicito : total * cantidad}</span>
            </div>
        </div>
    );
}
 
export default ProductoCarrito;