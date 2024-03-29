import Router from 'next/router';
import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import * as carritoActions from '../../../store/actions/carritoActions';
import CarritoModule from './Carrito.module.css';
import ProductoCarrito from './ProductoCarrito';

const Carrito = (props) => {

    useEffect(() => {
        props.traerProductos();
    }, []);

    const showProductos=()=>{
        if(!props.productos || props.productos.length === 0) return <div className="alert alert-warning">Ningun producto en el carrito</div>
        //calculo el subtotal para mostrarlo abajo de todo en el modal
        return props.productos.map((prd,key)=>(
            <ProductoCarrito key={key}
                idSubProducto={prd.idSubProducto}
                producto={prd.producto}
                peso={prd.peso}
                total={prd.precio}
                foto={prd.foto}
                cantidad={prd.cantidad}
                eliminarProducto={props.eliminarProducto}/>
        ))
    }

    const finalizarCompra = ()=>{
        Router.push('/checkout');
    }
    //console.log(props);
    return (
        <section className={CarritoModule.carrito__container + ' ' + `carrito`}>
            <h6 className="text-center">Mi Carrito</h6>
            <section className={CarritoModule.carrito__productos}>
                {showProductos()}
            </section>
            <div className={CarritoModule.footer__carrito}>
                <section className={CarritoModule.section__carrito__total + ' ' + `d-flex justify-content-between`}>
                    <p>Total</p>
                    <span className={CarritoModule.subtotal__carrito}>${props.total}</span>
                </section>
                {(props.productos.length==0)?null:<button className="boton bg-yellow" onClick={finalizarCompra} type="button">Finalizar compra</button>}
            </div>
        </section>
    );
}

const mapStateToProps = reducers=>{
    return reducers.carritoReducer;
}
export default connect(mapStateToProps,carritoActions)(Carrito);