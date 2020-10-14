import React, { useState,useEffect } from 'react';
import FiltroStyle from './Filtro.module.css';
import Modal from '../Modal';
import ModalMarca from '../ModalMarca';
import { faTimes,faBroom,faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from 'react-redux';
import * as subproductosActions from '../../../store/actions/subproductosActions';
import * as marcasActions from '../../../store/actions/marcasActions';
import * as categoriasActions from '../../../store/actions/categoriasAction';
import * as subcategoriasActions from '../../../store/actions/subcategoriasAction';
import Loader from '../Loader';

const {traerTodas:marcasTraerTodas} = marcasActions;
const {filtrarProductos:subproductosFiltrarProductos} = subproductosActions;
const {traerTodas:categoriasTraerTodas} = categoriasActions;
const {traerTodas:subcategoriaTraerTodas} = subcategoriasActions;

const Filtro = (props) => {

    //state for the filters
    const [estadoFiltro, setEstadoFiltro] = useState({
        filtrando:false,
        mascota:'',
        subcategoria:'',
        marca:'',
        buscador:''
    });

    //manejo de Modal marcas
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const onCloseModal = ()=>{
        document.getElementsByTagName('body')[0].style.overflowY = 'scroll';
        setModalIsOpen(false);
    }

    //loop de efecto para ejecutar solo una vez cuando el componente se monte en el caso de que se este filtrando directo desde la url
    useEffect(() => {
        getData();
        //if(props.location.match.url !== '/productos'){
            //    activarFiltroPorUrl();
            //}
    },[]);
        
    const getData = async()=>{
        if(props.marcasReducer.marcas.length===0){
            await props.marcasTraerTodas();
        }
        if(props.categoriasReducer.categorias.length===0){
            await props.categoriasTraerTodas();
        }
        if(props.subcategoriaReducer.subcategorias.length===0){
            await props.subcategoriaTraerTodas();
        }
    }

    //loop de efecto para hacer render cada vez que se agrega o elimina un filtro
    useEffect(() => {
        switchItemActive();
    }, [estadoFiltro]);


    const activarFiltroPorUrl = ()=>{
        switch (props.location.match.path) {
            case '/productos/categoria/:id':
                return activarFiltro('mascota','perro');
            case '/productos/subcategoria/:id':
                return activarFiltro('subcategoria','alimentoSeco');
            case '/productos/marca/:id':
                return activarFiltro('marca','sabrositos');
            case '/productos/search/:query':
                const {match:{params:{query}}} = props.location;
                return activarFiltro('buscador',query);
            default:
                break;
        }
    }

    const activarFiltro = (tipoFiltro,nameItem)=>{
        switch (tipoFiltro) {
            case 'mascota':
                setEstadoFiltro({
                    ...estadoFiltro,
                    mascota:nameItem,
                    buscador:'',
                    filtrando:true
                });
                break;
            case 'subcategoria':
                setEstadoFiltro({
                    ...estadoFiltro,
                    subcategoria:nameItem,
                    buscador:'',
                    filtrando:true
                })
                break;
            case 'marca':
                setEstadoFiltro({
                    ...estadoFiltro,
                    marca:nameItem,
                    buscador:'',
                    filtrando:true
                })
                break;
            case 'buscador':
                setEstadoFiltro({
                    ...estadoFiltro,
                    buscador:nameItem,
                    filtrando:true
                });
                break;
            default:
                break;
        }
    }

    const switchItemActive = ()=>{
        // console.log(estadoFiltro);
        for (let index = 0; index < document.getElementsByClassName(FiltroStyle.item_filtro).length; index++) {
            const element = document.getElementsByClassName(FiltroStyle.item_filtro)[index];
            element.classList.remove(FiltroStyle.active);
            document.getElementsByClassName(FiltroStyle.icon_close_filtro)[index].classList.add('d-none');
        };

        //si no hay nada en buscador, puedo setear un active en algun elemento de la lista
        if(estadoFiltro.buscador.trim()===''){
            //recorro el state para obtener las claves y agregar active el elemento correspondiente
            for (const key in estadoFiltro) {
                if(estadoFiltro[key] && estadoFiltro[key]!=='' && estadoFiltro[key]!==true){
                    if(document.getElementsByName(`${estadoFiltro[key]}`)[0]){//pregunto si existe el elemento con la clase del filtro para agregarle el active, si no existe lo creo. (si no existe es porque viene desde modal de marcas)
                        document.getElementsByName(`${estadoFiltro[key]}`)[0].classList.add(FiltroStyle.active);
                        document.getElementById(`close-${estadoFiltro[key]}`).classList.remove('d-none');
                    }else{
                        //creo los elementos del item
                        let newItemMarca = document.createElement('li');
                        let divItemMarca = document.createElement('div');
                        let spanItemMarca = document.createElement('span');
                        let iconClose = document.createElement('svg');
                        let pathIconClose = document.createElement('path');
    
                        //asigno las clases, atributos y eventos necesarios.
                        divItemMarca.className =`${FiltroStyle.item_filtro} ${FiltroStyle.active}`;
                        divItemMarca.setAttribute('name',`${estadoFiltro.marca}`);
                        divItemMarca.addEventListener('click',()=>activarFiltro('marca',estadoFiltro.marca));
                        spanItemMarca.className = 'text-muted';
                        spanItemMarca.innerHTML = estadoFiltro.marca;


                        iconClose.setAttribute('aria-hidden',true);
                        iconClose.setAttribute('focusable',false);
                        iconClose.setAttribute('data-prefix','fas');
                        iconClose.setAttribute('data-icon','times');
                        iconClose.setAttribute('role','img');
                        iconClose.setAttribute('xmlns','http://www.w3.org/2000/svg');
                        iconClose.setAttribute('viewBox','0 0 352 512');
                        iconClose.className = `svg-inline--fa fa-times fa-w-11 ${FiltroStyle.icon_close_filtro}`;
                        iconClose.setAttribute('id',`close-${estadoFiltro.marca}`);
                        iconClose.addEventListener('click',()=>limpiarFiltro('marca'));

                        pathIconClose.setAttribute('fill','currentColor');
                        pathIconClose.setAttribute('d','M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z');

                        iconClose.appendChild(pathIconClose);
                        
    
                        //voy ubicando los elementos dentro de cada padre
                        divItemMarca.appendChild(spanItemMarca);
                        newItemMarca.appendChild(divItemMarca);
                        newItemMarca.appendChild(iconClose);
                        
                        //Obtengo el primer item de la lista y lo elimino, para tener siempre la misma cantidad de marcas en la lista.
                        let firstItemMarca = document.querySelector(`#listaMarca`).children[0];
                        let listaMarcas = document.querySelector(`#listaMarca`);
                        listaMarcas.removeChild(firstItemMarca);
                        //ahora agrego el item creado a la lista
                        listaMarcas.appendChild(newItemMarca);
                    }
                }
            }
        }
        //la primera vez que se carga el componente, filtrando es false, por eso pregunto para que no se ejecuta la funcion de ir a filtrar apenas se monte el componente. Sino que se ejecute cuando de verdad se quiera filtrar.
        if(estadoFiltro.filtrando){
            let urlFiltro = armarUrlFiltro();//armo la url que mando a la api para traer los resultados de lo filtrado.
            props.subproductosFiltrarProductos(urlFiltro);
        };
    }

    const limpiarFiltro = tipo=>{
        switch (tipo) {
            case 'mascota':
                setEstadoFiltro({
                    ...estadoFiltro,
                    mascota:''
                });
                break;
            case 'subcategoria':
                setEstadoFiltro({
                    ...estadoFiltro,
                    subcategoria:''
                });
                break;
            case 'marca':
                setEstadoFiltro({
                    ...estadoFiltro,
                    marca:''
                });
                break;
            default:
                break;
        }
    }

    const closeFiltrosMobile = ()=>{
        document.getElementsByClassName(FiltroStyle.filtros__contanier)[0].classList.remove(FiltroStyle.show_filtros);
    }

    const armarUrlFiltro = ()=>{
        let url = 'filtrar';
        //si buscador viene true, es porque viene desde el buscador del menu o modal de buscador(mobile).
        if(estadoFiltro.buscador!=='') return url += `?buscar=${estadoFiltro.buscador}`;

        let mascota = estadoFiltro.mascota,
            subcategoria = estadoFiltro.subcategoria,
            marca = estadoFiltro.marca;
        if(mascota && mascota !== ''){
            url += `?mascota=${estadoFiltro.mascota}`;
        }
        if(estadoFiltro.subcategoria && estadoFiltro.subcategoria !== ''){
            if(mascota!== ''){
                url += `&subcategoria=${estadoFiltro.subcategoria}`; 
            }else{
                url += `?subcategoria=${estadoFiltro.subcategoria}`;
            }
        }
        if(marca && marca !== ''){
            if(mascota !== '' && subcategoria !== ''){
                url += `?marca=${estadoFiltro.marca}`;
            }else{
                url += `&marca=${estadoFiltro.marca}`;
            }
        }
        return url;
    }

    const showFiltros = ()=>{
        let element = document.getElementsByClassName(FiltroStyle.filtros__contanier)[0];
        element.classList.toggle(FiltroStyle.show);
        document.getElementById('iconFiltroContainer').classList.toggle(FiltroStyle.rotar);
    }

    console.log(props);
    return (
        <div className={FiltroStyle.filtros__contanier}>
            <button className={FiltroStyle.btn_close_filtro} onClick={showFiltros}>
                <FontAwesomeIcon id="iconFiltroContainer" icon={faChevronRight}/>
            </button>
            <div>
                {(props.categoriasReducer.categorias.length==0 || props.subcategoriaReducer.subcategorias.length==0 || props.marcasReducer.marcas.length==0)?<Loader/>:
                    <>  
                        {(estadoFiltro.filtrando)?<button className="boton bg-yellow mb-3">
                            <FontAwesomeIcon icon={faBroom}/> Limpiar Filtros
                        </button>:null}
                        <FontAwesomeIcon icon={faTimes} className={FiltroStyle.cerrar_filtro_mobile} onClick={closeFiltrosMobile}/>
                        <h4 className={FiltroStyle.titulo_filtros}>Mascota</h4>
                        <ul className={FiltroStyle.lista}>
                            {
                                props.categoriasReducer.categorias.map(cat=>(
                                    <li key={cat.idCategoria}>
                                        <div className={FiltroStyle.item_filtro} name={cat.categoria} onClick={()=>activarFiltro('mascota',`${cat.categoria}`)}>
                                            <span className="text-muted">{cat.categoria}</span>
                                        </div>
                                        <FontAwesomeIcon icon={faTimes} className={FiltroStyle.icon_close_filtro + ' ' + `d-none`} onClick={()=>limpiarFiltro('mascota')} id={`close-${cat.categoria}`}/>
                                    </li>
                                ))
                            }
                        </ul>

                        <h4 className={FiltroStyle.titulo_filtros}>Alimentos</h4>
                        <ul className={FiltroStyle.lista}>
                            {
                                props.subcategoriaReducer.subcategorias.map(sc=>(
                                    <li key={sc.idSubCategoria}>
                                        <div className={FiltroStyle.item_filtro} name={sc.subcategoria} onClick={()=>activarFiltro('subcategoria',`${sc.subcategoria}`)}>
                                            <span className="text-muted">{sc.subcategoria}</span>
                                        </div>
                                        <FontAwesomeIcon icon={faTimes} className={FiltroStyle.icon_close_filtro + ' ' + `d-none`} onClick={()=>limpiarFiltro('subcategoria')} id={`close-${sc.subcategoria}`}/>
                                    </li>
                                ))
                            }
                        </ul>

                        <h4 className={FiltroStyle.titulo_filtros}>Marca</h4>
                        <ul id="listaMarca" className={FiltroStyle.sinBorderBottom+ ' ' + FiltroStyle.lista}>
                            {
                                props.marcasReducer.marcas.map((marca,key)=>(
                                    (key>3)?false:
                                    <li key={marca.idMarca}>
                                        <div className={FiltroStyle.item_filtro} name={marca.marca} onClick={()=>activarFiltro('marca',`${marca.marca}`)}>
                                            <span className="text-muted">{marca.marca}</span>
                                        </div>
                                        <FontAwesomeIcon icon={faTimes} className={FiltroStyle.icon_close_filtro + ' ' + `d-none`} onClick={()=>limpiarFiltro('marca')} id={`close-${marca.marca}`}/>
                                    </li>
                                ))
                            }
                        </ul>
                        <button onClick={()=>setModalIsOpen(true)} className="boton bg-gris">Ver todas</button>
                    </>
                }
            </div>
            {(!modalIsOpen)?null:
                <Modal closeModal={onCloseModal}>
                    <ModalMarca closeModal={onCloseModal} activarFiltro={activarFiltro}/>
                </Modal>
            }
        </div>
    );
}

const mapStateToProps = ({marcasReducer,subproductosReducer,categoriasReducer,subcategoriaReducer})=>{
    return {
        marcasReducer,
        subproductosReducer,
        categoriasReducer,
        subcategoriaReducer
    };
}

const mapDispatchToProps = {
    marcasTraerTodas,
    subproductosFiltrarProductos,
    categoriasTraerTodas,
    subcategoriaTraerTodas
}

export default connect(mapStateToProps,mapDispatchToProps)(Filtro);