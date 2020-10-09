import React, { useState } from 'react';
import SliderFotosProducto from './sliderFotos';
import productofoto from '../../assets/prd.jpg';
import gatorenal from '../../assets/prd.jpg';
import './index.css';
import { connect } from 'react-redux';
import * as carritoActions from '../../actions/carritoActions';
import Loader from '../Loader/index';
import Modal from '../Modal/index';
import Carrito from '../Carrito/index';

const ProductoSingle = (props) => {
    const imagenes = [
        {
            img:productofoto
        },
        {
            img:gatorenal
        }
    ];

    const [producto, setProducto] = useState({
        idProducto:1,
        producto:'Purina Excellent Adult Cat Chicken & Rice',
        marca:'PURINA EXCELLENT',
        precio:999,
        peso:'3 Kg',
        cantidad:1,
        foto:productofoto
    });
    const [modalIsOpen, setModalIsOpen] = useState(false);


    const changeCantidad = action=>{
        let inputCantidad = document.getElementById('cantidad_prd');
        let cantidad = parseInt(inputCantidad.value);
        if(action === '-'){
            if(cantidad <= 1) return false;
            cantidad--;
        }else{
            cantidad++;
        }
        inputCantidad.value = cantidad;
        return setProducto({
            ...producto,
            cantidad
        });
    }

    const changePeso = (index,peso,precio)=>{
        setProducto({
            ...producto,
            precio,
            peso
        });
        let cajaPeso = document.getElementsByClassName('caja_cantidadKg');
        for (let index = 0; index < cajaPeso.length; index++) {
            (cajaPeso[index].classList.contains('active'))?cajaPeso[index].classList.remove('active'):null;
        }
        cajaPeso[index].classList.add('active');
    }

    const agregarCarrito = async()=>{
        props.agregarProducto(producto);
        setTimeout(() => {
            setModalIsOpen(true);
        }, 1700);
    }

    const closeModalCarrito =()=>(
        setModalIsOpen(false)
    );

    return (
        <div className="row">
            <div className="col-12 col-sm-6">
                <SliderFotosProducto imagenes={imagenes}/>
            </div>
            <div className="col-12 col-sm-6 descripcionProducto pt-5">
                <h3 className="marca">PURINA EXCELLENT</h3>
                <h1>Purina Excellent Adult Cat Chicken & Rice</h1>
                <div className="precios d-flex my-3">

                    <div className="indicador__precio">
                        <p>Precio</p>
                        <span className="valor__precio">${producto.precio * producto.cantidad}</span>
                    </div>

                    <div className="indicador__cantidad">
                        <p className="titulo__indicadorCantidad text-center">Seleccioná tamaño</p>
                        <div className="row justify-content-center">
                            <div className="caja_cantidadKg active" onClick={()=>changePeso(0,3,986)}>
                                <p className="kilos">3 Kgs</p>
                                <span className="precioDelKg">$986</span>
                            </div>
                            <div className="caja_cantidadKg" onClick={()=>changePeso(1,5,1200)}>
                                <p className="kilos">5 Kgs</p>
                                <span className="precioDelKg">$1200</span>
                            </div>
                            <div className="caja_cantidadKg" onClick={()=>changePeso(2,9,1500)}>
                                <p className="kilos">9 Kgs</p>
                                <span className="precioDelKg">$1500</span>
                            </div>
                            <div className="caja_cantidadKg" onClick={()=>changePeso(3,11,2000)}>
                                <p className="kilos">11 Kgs</p>
                                <span className="precioDelKg">$2000</span>
                            </div>
                        </div>
                        <div className="input-group mt-2">
                            <div className="input-group-prepend" onClick={()=>changeCantidad('-')}>
                                <span className="input-group-text">-</span>
                            </div>
                            <input type="text" id="cantidad_prd" disabled={true} className="form-control text-center" value={producto.cantidad}/>
                            <div className="input-group-append" onClick={()=>changeCantidad('+')}>
                                <span className="input-group-text">+</span>
                            </div>
                        </div>
                    </div>
                </div>
                {(props.loading)?<div className="text-center"><Loader/></div>:<button className="boton bg-yellow" onClick={agregarCarrito}>Comprar</button>}
            </div>
            {(!modalIsOpen)?null:
                <Modal closeModal={closeModalCarrito}>
                    <Carrito/>
                </Modal>
            }
        </div>
    );
}

const mapStateToProps = reducers=>{
    return reducers.carritoReducer;
}

export default connect(mapStateToProps,carritoActions)(ProductoSingle);