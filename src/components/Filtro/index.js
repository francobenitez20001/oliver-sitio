import React, { useEffect } from 'react';
import FiltroStyle from './Filtro.module.css';
import { faTimes,faBroom,faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from 'react-redux';
import * as productosActions from '../../../store/actions/productosActions';
import * as marcasActions from '../../../store/actions/marcasActions';
import * as categoriasActions from '../../../store/actions/categoriasAction';
import * as subcategoriasActions from '../../../store/actions/subcategoriasAction';
import Loader from '../Loader';

const {traerTodas:marcasTraerTodas} = marcasActions;
const {aplicarFiltro,quitarFiltro,restablecerFiltros,traerProductos} = productosActions;
const {traerTodas:categoriasTraerTodas} = categoriasActions;
const {traerTodas:subcategoriaTraerTodas} = subcategoriasActions;

const Filtro = (props) => {

    //loop de efecto para ejecutar solo una vez cuando el componente se monte en el caso de que se este filtrando directo desde la url
    useEffect(() => {
        getData();
    },[]);
        
    const getData = async()=>{
        try {
            if(props.marcasReducer.marcas.length===0){
                await props.marcasTraerTodas();
            }
            if(props.categoriasReducer.categorias.length===0){
                await props.categoriasTraerTodas();
            }
            if(props.subcategoriaReducer.subcategorias.length===0){
                await props.subcategoriaTraerTodas();
            }
            if(props.location !== '/productos'){
                activarFiltroPorUrl();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const activarFiltroPorUrl = ()=>{
        if(props.query.search){
            return activarFiltro(Object.keys(props.query)[0],props.query.search);
        }else{
            return activarFiltro(props.query.type,props.query.index[1]);
        }
    }

    const activarFiltro = (tipoFiltro,key,fromModal=false)=>{
        props.aplicarFiltro(tipoFiltro,key);
    }

    const limpiarFiltro = tipo=>{
        props.quitarFiltro(tipo)
    }

    const closeFiltrosMobile = ()=>{
        document.getElementsByClassName(FiltroStyle.filtros__contanier)[0].classList.remove(FiltroStyle.show_filtros);
    }

    const showFiltros = ()=>{
        let element = document.getElementsByClassName(FiltroStyle.filtros__contanier)[0];
        element.classList.toggle(FiltroStyle.show);
        document.getElementById('iconFiltroContainer').classList.toggle(FiltroStyle.rotar);
    }

    const handleRestablecer = ()=>{
        props.restablecerFiltros();
        props.traerProductos();
    }

    const {filtrando,filtros} = props.productosReducer;
    
    return (
        <div className={FiltroStyle.filtros__contanier}>
            <button className={FiltroStyle.btn_close_filtro} onClick={showFiltros}>
                <FontAwesomeIcon id="iconFiltroContainer" icon={faChevronRight}/>
            </button>
            <div>
                {(props.categoriasReducer.categorias.length==0 || props.subcategoriaReducer.subcategorias.length==0 || props.marcasReducer.marcas.length==0)?<Loader/>:
                    <>  
                        {(filtrando)?<button className="boton bg-yellow mb-3" onClick={handleRestablecer}>
                            <FontAwesomeIcon icon={faBroom}/> Limpiar Filtros
                        </button>:null}

                        <FontAwesomeIcon icon={faTimes} className={FiltroStyle.cerrar_filtro_mobile} onClick={closeFiltrosMobile}/>
                        <h4 className={FiltroStyle.titulo_filtros}>Mascota</h4>
                        <ul className={FiltroStyle.lista}>
                            {
                                props.categoriasReducer.categorias.map(cat=>(
                                    <li key={cat.idCategoria}>
                                        <div className={FiltroStyle.item_filtro + ` ${filtros.categoria == cat.idCategoria ? FiltroStyle.active:''}`} onClick={()=>activarFiltro('categoria',`${cat.idCategoria}`)}>
                                            <span className="text-muted">{cat.categoria}</span>
                                        </div>
                                        <FontAwesomeIcon icon={faTimes} className={FiltroStyle.icon_close_filtro + ` ${filtros.categoria == cat.idCategoria ?'':'d-none'}`} onClick={()=>limpiarFiltro('categoria')}/>
                                    </li>
                                ))
                            }
                        </ul>


                        <h4 className={FiltroStyle.titulo_filtros}>Alimentos</h4>
                        <ul className={FiltroStyle.lista}>
                            {
                                props.subcategoriaReducer.subcategorias.map(sc=>(
                                    <li key={sc.idSubCategoria}>
                                        <div className={FiltroStyle.item_filtro + ` ${filtros.subcategoria == sc.idSubCategoria ? FiltroStyle.active:''}`} onClick={()=>activarFiltro('subcategoria',`${sc.idSubCategoria}`)}>
                                            <span className="text-muted">{sc.subcategoria}</span>
                                        </div>
                                        <FontAwesomeIcon icon={faTimes} className={FiltroStyle.icon_close_filtro + ` ${filtros.subcategoria == sc.idSubCategoria ? '' : 'd-none'}`} onClick={()=>limpiarFiltro('subcategoria')}/>
                                    </li>
                                ))
                            }
                        </ul>

                        <h4 className={FiltroStyle.titulo_filtros}>Marca</h4>
                        <ul id="listaMarca" className={FiltroStyle.sinBorderBottom+ ' ' + FiltroStyle.lista + ` ${FiltroStyle.listaMarca}`}>
                            {
                                props.marcasReducer.marcas.map((marca,key)=>(
                                    <li key={marca.idMarca}>
                                        <div className={FiltroStyle.item_filtro + ` ${filtros.marca == marca.idMarca ? FiltroStyle.active : ''}`} onClick={()=>activarFiltro('marca',`${marca.idMarca}`)}>
                                            <span className="text-muted">{marca.marca}</span>
                                        </div>
                                        <FontAwesomeIcon icon={faTimes} className={FiltroStyle.icon_close_filtro + ` ${filtros.marca == marca.idMarca ? '' : 'd-none'}`} onClick={()=>limpiarFiltro('marca')}/>
                                    </li>
                                ))
                            }
                        </ul>
                    </>
                }
            </div>
        </div>
    );
}

const mapStateToProps = ({marcasReducer,productosReducer,categoriasReducer,subcategoriaReducer})=>{
    return {
        marcasReducer,
        productosReducer,
        categoriasReducer,
        subcategoriaReducer
    };
}

const mapDispatchToProps = {
    marcasTraerTodas,
    categoriasTraerTodas,
    subcategoriaTraerTodas,
    aplicarFiltro,
    quitarFiltro,
    restablecerFiltros,
    traerProductos
}

export default connect(mapStateToProps,mapDispatchToProps)(Filtro);