import React, { useState } from 'react';
import SliderFotosProducto from './sliderFotos';
import { connect } from 'react-redux';
import * as carritoActions from '../../../store/actions/carritoActions';
import Loader from '../Loader/index';
import Modal from '../Modal/index';
import Carrito from '../Carrito/index';
import ProductoSingleStyle from  './ProductoSingle.module.css';

const ProductoSingle = (props) => {
    const imagenes = [
        props.subProducto.foto
    ];
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
        //!!!!revisar//////
        // setProducto({
        //     ...producto,
        //     precio,
        //     peso
        // });
        let cajaPeso = document.getElementsByClassName(ProductoSingleStyle.caja_cantidadKg);
        for (let index = 0; index < cajaPeso.length; index++) {
            (cajaPeso[index].classList.contains(ProductoSingleStyle.active))?cajaPeso[index].classList.remove(ProductoSingleStyle.active):null;
        }
        cajaPeso[index].classList.add(ProductoSingleStyle.active);
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
    
    const {descripcion,descripcion_basica,foto,peso,precioUnidad,producto,stock,subProducto,tamaño} = props.subProducto;
    console.log(props);
    return (
        <div className="row">
            <div className="col-12 col-sm-6">
                <SliderFotosProducto imagenes={imagenes}/>
            </div>
            <div className={`col-12 col-sm-6 pt-5`+' '+ ProductoSingleStyle.descripcionProducto}>
                <h3 className={ProductoSingleStyle.marca}>PURINA EXCELLENT</h3>
                <h1>{subProducto}</h1>
                <div className={ProductoSingleStyle.precios + ' ' + `d-flex my-3`}>
                    <div className={ProductoSingleStyle.indicador__precio}>
                        <p>Precio</p>
                        <span className={ProductoSingleStyle.valor__precio}>${precioUnidad}</span>
                    </div>

                    <div className={ProductoSingleStyle.indicador__cantidad}>
                        <p className={ProductoSingleStyle.titulo__indicadorCantidad+' '+`text-center`}>Seleccioná tamaño</p>
                        <div className="row justify-content-center">
                            <div className={ProductoSingleStyle.caja_cantidadKg + ' ' +ProductoSingleStyle.active} onClick={()=>changePeso(0,3,986)}>
                                <p className={ProductoSingleStyle.kilos}>3 Kgs</p>
                                <span className={ProductoSingleStyle.precioDelKg}>$986</span>
                            </div>
                            <div className={ProductoSingleStyle.caja_cantidadKg} onClick={()=>changePeso(1,5,1200)}>
                                <p className={ProductoSingleStyle.kilos}>5 Kgs</p>
                                <span className={ProductoSingleStyle.precioDelKg}>$1200</span>
                            </div>
                            <div className={ProductoSingleStyle.caja_cantidadKg} onClick={()=>changePeso(2,9,1500)}>
                                <p className={ProductoSingleStyle.kilos}>9 Kgs</p>
                                <span className={ProductoSingleStyle.precioDelKg}>$1500</span>
                            </div>
                            <div className={ProductoSingleStyle.caja_cantidadKg} onClick={()=>changePeso(3,11,2000)}>
                                <p className={ProductoSingleStyle.kilos}>11 Kgs</p>
                                <span className={ProductoSingleStyle.precioDelKg}>$2000</span>
                            </div>
                        </div>
                        <div className="input-group mt-2">
                            <div className="input-group-prepend" onClick={()=>changeCantidad('-')}>
                                <span className="input-group-text">-</span>
                            </div>
                            <input type="text" id="cantidad_prd" disabled={true} className="form-control text-center" value="1"/>
                            <div className="input-group-append" onClick={()=>changeCantidad('+')}>
                                <span className="input-group-text">+</span>
                            </div>
                        </div>
                    </div>
                </div>
                {(props.loading)?<div className="text-center"><Loader/></div>:<button disabled={true} className="boton bg-yellow" onClick={agregarCarrito}>Comprar</button>}
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