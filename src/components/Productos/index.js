import React, { useState, useEffect } from 'react';
import imgprd from '../../assets/prd.jpg'
import CardProducto from '../CardProducto';
import {connect} from 'react-redux';
import * as productosActions from '../../actions/productosActions';
import './index.css';
import Loader from '../Loader';

const Productos = (props) => {
    useEffect(() => {
        if(props.match.path === '/productos/search/:query'){
            document.getElementById('valor-busqueda').innerHTML = props.match.params.query;
            document.getElementById('label__filtro-busqueda').classList.remove('d-none');
        };
        getProductos();
    }, [props.productos]);

    const showFiltrosMobile = ()=>{
        document.getElementsByClassName('filtros__contanier')[0].classList.add('show_filtros');
    }

    const getProductos = ()=>{
        props.traerTodos();
    } 

    const handleChangeOrdenProductos = event=>{
        if(event.target.value === 'asc'){
            props.productos.sort((a,b)=>{
                if(a.precio > b.precio) return 1;
                if(a.precio < b.precio) return -1;
                return 0;
            })
        }else{
            props.productos.sort((a,b)=>{
                if(a.precio < b.precio) return 1;
                if(a.precio > b.precio) return -1;
                return 0;
            })
        };
        return props.ordenarProductos(props.productos);
    }
    return (
        <>
            {(props.loading)?<div className="col-12 text-center"><Loader/></div>:
            <>
                <span id="label__filtro-busqueda" className="d-none">
                    <i className="fas fa-search"></i>
                    <span className="item-filtro-busqueda">
                        <span className="text-muted" id="valor-busqueda">Dog chow</span>
                    </span>
                </span>
                <div className="row justify-content-between my-2 align-items-center" style={{padding:'0px 15px'}}>
                    <span className="text-muted"><b className="txt-yellow">{props.productos.length}</b> productos encontrados</span>
                    <div className="ordenarProductos d-flex align-items-center">
                        <span className="txt-yellow text-bold mr-2">Ordenar por: </span>
                        <select className="select_ordenar" onChange={handleChangeOrdenProductos}>
                            <option value="desc">Mayor precio</option>
                            <option value="asc">Menor precio</option>
                        </select>
                    </div>
                    <button onClick={showFiltrosMobile} className="boton bg-yellow mt-3 boton-filtrar-mobile">Filtrar</button>
                </div>
                <div className="row">
                    {props.productos.map(prd=>(
                        <div key={prd.idProducto} className="col-6 col-md-4">
                            <CardProducto imagen={imgprd} prd={prd}/>
                        </div>
                    ))}
                </div>
            </>
            }
        </>
    );
}

const mapStateToProps = reducers=>{
    return reducers.productosReducer;
}

export default connect(mapStateToProps,productosActions)(Productos);