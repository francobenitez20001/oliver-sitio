import React, { useState, useEffect } from 'react';
import CardProducto from '../CardProducto';
import {connect} from 'react-redux';
import * as productosActions from '../../../store/actions/productosActions';
import ProductosStyle from './Productos.module.css';
import Loader from '../Loader';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FiltroStyle from '../Filtro/Filtro.module.css';

const Productos = (props) => {

    const [filtro, setFiltro] = useState('');

    useEffect(() => {
        if(props.location !== '/productos'){
            if(props.query.search){
                mostrarSolapaFiltro(props.query.search);
            }else{
                mostrarSolapaFiltro(props.query.index[0]);
            }
        }else{
            getProductos();
        }
    }, []);

    const showFiltrosMobile = ()=>{
        document.getElementsByClassName('Filtro_filtros__contanier__3knXf')[0].classList.add(FiltroStyle.show_filtros);
    }

    const getProductos = async ()=>{
        try {
            await props.traerTodos();
        } catch (error) {
            console.log(error);
        }
    }
    
    const mostrarSolapaFiltro = filtro=>{
        setFiltro(filtro);
    }

    const handleChangeOrdenProductos = event=>{
        if(event.target.value === 'asc'){
            props.productos.sort((a,b)=>{
                if(a.precioUnidad > b.precioUnidad) return 1;
                if(a.precioUnidad < b.precioUnidad) return -1;
                return 0;
            })
        }else{
            props.productos.sort((a,b)=>{
                if(a.precioUnidad < b.precioUnidad) return 1;
                if(a.precioUnidad > b.precioUnidad) return -1;
                return 0;
            })
        };
        return props.ordenarProductos(props.productos);
    }
    
    //ocultar la chapita que indica el nombre del filtro activo cuando se restablecen los filtros.
    if(props.location=='/productos' && filtro!=''){
        setFiltro('');
    }
    return (
        <>
            {(props.loading || !props.productos)?<div className="col-12 text-center"><Loader/></div>:
            <>
                {(filtro!=='')?
                    <span id="label__filtro-busqueda" className={ProductosStyle.label__filtro_busqueda}>
                        <FontAwesomeIcon icon={faSearch}/>
                        <span className={ProductosStyle.item_filtro_busqueda}>
                            <span className="text-mutedd" id="valor-busqueda">{filtro}</span>
                        </span>
                    </span>
                :null}
                <div className="row justify-content-between my-2 align-items-center" style={{padding:'0px 15px'}}>
                    <span className="text-muted"><b className="txt-yellow">{props.productos.length}</b> productos encontrados</span>
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
                    {!props.productos ? null :
                        props.productos.map(prd=>(
                            <div key={prd.idProducto} className="col-6 col-md-3">
                                <CardProducto imagen={prd.foto} prd={prd}/>
                            </div>
                        ))
                    }
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