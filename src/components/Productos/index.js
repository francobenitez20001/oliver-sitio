import React, { useState, useEffect } from 'react';
import CardProducto from '../CardProducto';
import {connect} from 'react-redux';
import * as subproductosActions from '../../../store/actions/subproductosActions';
import ProductosStyle from './Productos.module.css';
import Loader from '../Loader';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FiltroStyle from '../Filtro/Filtro.module.css';

const Productos = (props) => {
    useEffect(() => {
        /*if(props.match.path === '/productos/search/:query'){
            document.getElementById('valor-busqueda').innerHTML = props.match.params.query;
            document.getElementById('label__filtro-busqueda').classList.remove('d-none');
        };*/
        getProductos();
    }, []);

    const showFiltrosMobile = ()=>{
        document.getElementsByClassName('Filtro_filtros__contanier__3knXf')[0].classList.add(FiltroStyle.show_filtros);
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
                    <FontAwesomeIcon icon={faSearch}/>
                    <span className={ProductosStyle.item_filtro_busqueda}>
                        <span className="text-muted" id="valor-busqueda">Dog chow</span>
                    </span>
                </span>
                <div className="row justify-content-between my-2 align-items-center" style={{padding:'0px 15px'}}>
                    <span className="text-muted"><b className="txt-yellow">{props.subproductos.length}</b> productos encontrados</span>
                    <div className={ProductosStyle.ordenarProductos + ' ' + `d-flex align-items-center`}>
                        <span className="txt-yellow text-bold mr-2">Ordenar por: </span>
                        <select className={ProductosStyle.select_ordenar} onChange={handleChangeOrdenProductos}>
                            <option value="desc">Mayor precio</option>
                            <option value="asc">Menor precio</option>
                        </select>
                    </div>
                    <button onClick={showFiltrosMobile} className={`boton bg-yellow mt-3 d-none` + ' ' + ProductosStyle.boton_filtrar_mobile}>Filtrar</button>
                </div>
                <div className="row">
                    {props.subproductos.map(prd=>(
                        <div key={prd.idSubProducto} className="col-6 col-md-3">
                            <CardProducto imagen={prd.foto} prd={prd}/>
                        </div>
                    ))}
                </div>
            </>
            }
        </>
    );
}

const mapStateToProps = reducers=>{
    return reducers.subproductosReducer;
}

export default connect(mapStateToProps,subproductosActions)(Productos);