import React,{useEffect} from 'react';
//import { connect } from 'react-redux';
//import * as carritoActions from '../../actions/carritoActions'
import CarritoModule from './Carrito.module.css';
import ProductoCarrito from './ProductoCarrito';

const Carrito = (props) => {
    /*useEffect(() => {
        props.traerProductos();
    }, []);*/
    let totalCarrito = 0;

    const showProductos=()=>{
        if(!props.productos || props.productos.length === 0) return <div className="alert alert-warning">Ningun producto en el carrito</div>
        //calculo el subtotal para mostrarlo abajo de todo en el modal
        totalCarrito = calcularTotal(props.productos);
        return props.productos.map((prd,key)=>(
            <ProductoCarrito key={key}
                idProducto={prd.idProducto}
                producto={prd.producto}
                peso={prd.peso}
                total={prd.precio}
                foto={prd.foto}
                eliminarProducto={props.eliminarProducto}/>
        ))
    }

    const calcularTotal = prds=>{
        let total = 0;
        prds.forEach(prd => {
            total += parseInt(prd.precio);
        });
        return total;
    }
    console.log(props);
    return (
        <section className={CarritoModule.carrito__container + ' ' + `carrito`}>
            <h6 className="text-center">Mi Carrito</h6>
            <section className={CarritoModule.carrito__productos}>
                {showProductos()}
            </section>
            <div className={CarritoModule.footer__carrito}>
                <section className={CarritoModule.section__carrito__total + ' ' + `d-flex justify-content-between`}>
                    <p>Subtotal</p>
                    <span className={CarritoModule.subtotal__carrito}>${totalCarrito}</span>
                </section>
                <button className="boton bg-yellow" type="button">Finalizar compra</button>
            </div>
        </section>
    );
}

export default Carrito;
/*const mapStateToProps = reducers=>{
    return reducers.carritoReducer;
}
export default connect(mapStateToProps,carritoActions)(Carrito);*/