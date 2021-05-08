import React, { useEffect } from 'react';
import { connect } from "react-redux";
import * as ventasActions from '../../store/actions/ventasActions';
import * as carritoActions from '../../store/actions/carritoActions';

const {traerProductos:traerProductosDeCarrito} = carritoActions;
const {init} = ventasActions;


const DetalleProductos = (props) => {
    const {productos} = props.carritoReducer;
    const {subtotal,total,totalEnvio} = props.ventaReducer;

    useEffect(() => {
        if(!productos.length){
            props.traerProductosDeCarrito();
        }
        props.init(); //inciializa el state de ventas para traer totales, cantidad de productos, etc.
    }, [])

    return (
        (!productos.length)?null:
        <div className="containerDetalleProducto">
            <div className="infoProducto text-center mb-2">
                {(productos.length==1)?
                <>
                    <img src={productos[0].foto} alt={productos[0].producto}/>
                    <h3 className="my-2">{productos[0].subProducto}</h3>
                    <span>Cantidad: {productos[0].cantidad}</span>
                </>
                :
                    null
                }
            </div>
            <span className="txt-resumen">Resumen de compra</span>
            <div className="infoPago ">
                <hr className="mt-0"/>
                <span className="d-flex justify-content-between precioProducto">
                    <p>Productos ({productos.length})</p>
                    <span>${subtotal}</span>
                </span>
                <span className="d-flex justify-content-between precioProducto">
                    <p>Envío</p>
                    <span>${totalEnvio}</span>
                </span>
                <hr className="mt-0"/>
                <span className="d-flex justify-content-between precioTotal" style={{fontWeight:'bold'}}>
                    <p>Pagás</p>
                    <span>${total}</span>
                </span>
            </div>
            <style jsx>{`
                .containerDetalleProducto{
                    position:fixed;
                    height:100vh; 
                    background-color:white;
                    width:20%;
                    font-family: 'Quicksand', sans-serif;
                    padding:50px 0px 0px 0px;
                }

                .infoProducto h3{
                    font-size:15px;
                    font-weight: 300;
                    color: #333;
                    margin-bottom: 8px;
                    padding: 0 40px;  
                }
                .infoProducto span{
                    color: #333;
                    display: block;
                    font-size: 14px;
                }


                .infoProducto img{
                    width:65px;
                    height:80px;
                }

                .infoPago{
                    padding:5px 15px
                }

                .txt-resumen{
                    font-size: 16px;
                    line-height: 16px;
                    font-weight: 600;
                    color: #333;
                    padding: 8px 15px;
                }

                .infoPago .precioProducto{
                    font-size: 16px;
                    font-weight: 300;
                    color: #333;
                }

                .infoPago .precioTotal{
                    font-size: 18px;
                    line-height: 18px;
                }
            `}</style>
        </div>
    );
}

const mapStateToProps = ({carritoReducer,ventaReducer})=>{
    return {
        carritoReducer,
        ventaReducer
    }
}

const mapDispatchToProps = {
    traerProductosDeCarrito,
    init
}

export default connect(mapStateToProps,mapDispatchToProps)(DetalleProductos);