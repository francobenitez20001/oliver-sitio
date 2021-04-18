import React, { useState, useEffect } from 'react';
import CardProducto from '../CardProducto';
import {connect} from 'react-redux';
import * as productosActions from '../../../store/actions/productosActions';
import ProductosStyle from './Productos.module.css';
import Loader from '../Loader';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FiltroStyle from '../Filtro/Filtro.module.css';
import { isMobile } from '../../../helpers';
import NavbarStyle from '../Navbar/Navbar.module.css';
const Swal = require('sweetalert2');

const Productos = (props) => {
    const {filtros,paginacion,filtrando} = props;
    const [filtro, setFiltro] = useState('');

    useEffect(() => {
        if(props.location !== '/productos'){
            if(props.query.search){
                mostrarSolapaFiltro(props.query.search);
            }else{
                mostrarSolapaFiltro(props.query.index[0]);
            }
        }
    }, []);

    useEffect(() => {
        if(paginacion.desde>0){
            props.traerMas();
        }
    }, [paginacion]);
    
    useEffect(() => {
        if(props.location !== '/productos'){
            //si se filtra directamente por categoria,marca,etc desde otra pagina.. esperar a que se aplique el filtro para no hacer dos peticiones.
            if(filtrando){
                getProductos();
            }else{
                //request para cuando se restablecen los filtros en pagina 'productos/royal-canin' por ejemplo.
                if(props.productos.length>0){
                    getProductos();
                }
            }
        }else{
            getProductos();
        }
    }, [filtros])

    const getProductos = async ()=>{
        try {
            await props.traerProductos();
        } catch (error) {
            console.log(error);
        }
    }

    const cargarMas = ()=>{
        props.updatePaginacion();
    }

    const showFiltrosMobile = ()=>{
        if(document.getElementsByClassName(NavbarStyle.menu__collapsed)[0].classList.contains(NavbarStyle.showCollapsed)){
            document.getElementsByClassName(NavbarStyle.menu__collapsed)[0].classList.remove(NavbarStyle.showCollapsed);
        }
        document.getElementsByClassName('Filtro_filtros__contanier__3knXf')[0].classList.add(FiltroStyle.show_filtros);
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
                {(filtro!=='' && props.filtrando)?
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
                <div className="row feedProductos">
                    {!props.productos ? null :
                        props.productos.map(prd=>(
                            <div key={prd.idProducto} className="col-6 col-md-3">
                                <CardProducto imagen={prd.foto} prd={prd}/>
                            </div>
                        ))
                    }
                    {props.sinResultados ? <div className="alert alert-warning text-center w-100" style={{height:'50px'}}>No se encontraron más resultados</div> : <button className="boton bg-yellow btn-vermas" onClick={cargarMas}>{(props.loading_mas)?'Obteniendo productos...':'Cargar más'}</button>}
                </div>
                {/* {renderBotonCargarMas()} */}
            </>
            }
            <style jsx>{`
                .feedProductos{
                    height:75vh;
                    overflow-y:scroll;
                }    
                .btn-vermas{
                    position:relative;
                    height:40px;
                }
                .feedProductos::-webkit-scrollbar {
                    width: 8px;     /* Tamaño del scroll en vertical */
                    height:5px
                }

                .feedProductos::-webkit-scrollbar-thumb {
                    background: #FFB347;
                    border-radius: 4px;
                }
                .feedProductos::-webkit-scrollbar-thumb:hover {
                    background: #b3b3b3;
                    box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
                }
                @media(max-width:768px){
                    .feedProductos{
                        height:68vh;
                        overflow-y:scroll;
                    } 
                    .feedProductos::-webkit-scrollbar {
                        width: 8px;     /* Tamaño del scroll en vertical */
                        height:10px
                    }
                }
            `}
            </style>
        </>
    );
}

const mapStateToProps = reducers=>{
    return reducers.productosReducer;
}

export default connect(mapStateToProps,productosActions)(Productos);