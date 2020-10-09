import React from 'react';
import CardProductoModule from  './CardProducto.module.css';

const CardProducto = ({imagen,prd}) => {
    return (
        <div className={CardProductoModule.container__producto + ' ' + `my-3`}>
            <section className={CardProductoModule.header__card}>
                <img src={imagen} alt="prd" className={CardProductoModule.img}/>
            </section>
            <section className={CardProductoModule.body__card}>
                <span className={CardProductoModule.label__marca+ ' ' + `d-block text-muted`}>{prd.marca}</span>
                <h6 className={CardProductoModule.nombre__producto+ ' ' + `text-muted`}>{prd.producto}</h6>
                <span className={CardProductoModule.cantidad}>{prd.cantidad} KG</span>
                <h3 className="text-black">{prd.precio}</h3>
            </section>
            <section className={CardProductoModule.footer__card}>
                <a href={`/producto/${prd.idProducto}`} className="boton bg-blue">Comprar</a>
            </section>
            <span className={CardProductoModule.label__descuento+ ' ' + `bg-red`}>15% Off</span>
        </div>
        
    );
}
 
export default CardProducto;