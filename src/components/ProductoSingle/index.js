import React, { useState,useEffect } from 'react';
import SliderFotosProducto from './sliderFotos';
import { connect } from 'react-redux';
import * as carritoActions from '../../../store/actions/carritoActions';
import Loader from '../Loader/index';
import Modal from '../Modal/index';
import Carrito from '../Carrito/index';
import ProductoSingleStyle from  './ProductoSingle.module.css';

const ProductoSingle = (props) => {

    const {peso,precioUnidad,idSubProducto,subProducto,tamaño} = props.subProducto;
    //console.log(props);
    useEffect(() => {
        const {foto,peso,precioUnidad,producto,tamaño,idSubProducto,marca,subProducto} = props.subProducto;
        guardarProductoEnState(foto,peso,precioUnidad,producto,tamaño,idSubProducto,marca,subProducto);
    }, [props.subProducto])

    
    const imagenes = [
        props.subProducto.foto
    ];
    //al vector de imagenes, le sumo las imagenes de los productos relacionados al mismo padre
    props.moreProducts.map(datamp=>{
        imagenes.push(datamp.foto);
    })


    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [productoData, setProductoData] = useState({});
    

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
        return setProductoData({
            ...productoData,
            cantidad
        })
    }

    const changePeso = (index,peso,precio,tamaño,idSubProducto,subProducto)=>{
        let cajaPeso = document.getElementsByClassName(ProductoSingleStyle.caja_cantidadKg);
        for (let index = 0; index < cajaPeso.length; index++) {
            (cajaPeso[index].classList.contains(ProductoSingleStyle.active))?cajaPeso[index].classList.remove(ProductoSingleStyle.active):null;
        }
        cajaPeso[index].classList.add(ProductoSingleStyle.active);
        if(!peso || !precio || !tamaño || !idSubProducto || !subProducto){
            return setProductoData({
                ...productoData,
                peso:props.subProducto.peso,
                precio:props.subProducto.precioUnidad,
                tamaño:props.subProducto.tamaño,
                idSubProducto:props.subProducto.idSubProducto,
                subProducto:props.subProducto.subProducto
            });
        };
        setProductoData({
            ...productoData,
            peso,
            precio,
            tamaño,
            idSubProducto,
            subProducto
        });
    }

    const agregarCarrito = async()=>{
        props.agregarProducto(productoData);
        setTimeout(() => {
            setModalIsOpen(true);
        }, 1700);
    }

    const closeModalCarrito =()=>(
        setModalIsOpen(false)
    );
    
    const guardarProductoEnState = (foto,peso,precioUnidad,producto,tamaño,idSubProducto,marca,subProducto)=>{
        setProductoData({
            producto,
            foto,
            peso,
            cantidad:1,
            precioUnidad,
            tamaño,
            idSubProducto,
            marca,
            subProducto
        })
    }

    return (
        <div className="row">
            <div className="col-12 col-sm-6">
                <SliderFotosProducto imagenes={imagenes} changePeso={changePeso} moreProducts={props.moreProducts}/>
            </div>
            <div className={`col-12 col-sm-6 pt-5`+' '+ ProductoSingleStyle.descripcionProducto}>
                <h3 className={ProductoSingleStyle.marca}>{productoData.marca}</h3>
                <h1>{productoData.subProducto}</h1>
                <div className={ProductoSingleStyle.precios + ' ' + `d-flex my-3`}>
                    <div className={ProductoSingleStyle.indicador__precio}>
                        <p>Precio</p>
                        <span className={ProductoSingleStyle.valor__precio}>${productoData.precioUnidad}</span>
                    </div>

                    <div className={ProductoSingleStyle.indicador__cantidad}>
                        <p className={ProductoSingleStyle.titulo__indicadorCantidad+' '+`text-center`}>Seleccioná tamaño</p>
                        <div className="row justify-content-center">
                            <div className={ProductoSingleStyle.caja_cantidadKg + ' ' +ProductoSingleStyle.active} onClick={()=>changePeso(0,`${peso}`,precioUnidad,`${tamaño}`,idSubProducto,`${subProducto}`)}>
                                <p className={ProductoSingleStyle.kilos}>{productoData.peso} Kgs</p>
                                <span className={ProductoSingleStyle.precioDelKg}>${productoData.precioUnidad}</span>
                            </div>
                            {props.moreProducts.map((mp,key)=>(
                                <div key={key} className={ProductoSingleStyle.caja_cantidadKg} 
                                    onClick={()=>changePeso((key+1),`${mp.peso}`,mp.precioUnidad,`${mp.tamaño}`,mp.idSubProducto,`${mp.subProducto}`)}>
                                    <p className={ProductoSingleStyle.kilos}>{mp.peso} Kgs</p>
                                    <span className={ProductoSingleStyle.precioDelKg}>${mp.precioUnidad}</span>
                                </div>
                            ))}
                        </div>
                        <div className="input-group mt-2">
                            <div className="input-group-prepend" onClick={()=>changeCantidad('-')}>
                                <span className="input-group-text">-</span>
                            </div>
                            <input type="text" id="cantidad_prd" className="form-control text-center" value={productoData.cantidad}/>
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