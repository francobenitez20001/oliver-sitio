import React, { useState,useEffect } from 'react';
import './index.css';
import Modal from '../Modal';
import ModalMarca from '../ModalMarca';
//import { connect } from 'react-redux';
//import * as productosActions from '../../actions/productosActions';

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
        setModalIsOpen(false);
    }

    //loop de efecto para ejecutar solo una vez cuando el componente se monte en el caso de que se este filtrando directo desde la url
    useEffect(() => {
        if(props.location.match.url !== '/productos'){
            activarFiltroPorUrl();
        }
    },[]);

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
        for (let index = 0; index < document.getElementsByClassName('item-filtro').length; index++) {
            const element = document.getElementsByClassName('item-filtro')[index];
            element.classList.remove('active');
            document.getElementsByClassName('icon-close-filtro')[index].classList.add('d-none');
        };

        //si no hay nada en buscador, puedo setear un active en algun elemento de la lista
        if(estadoFiltro.buscador.trim()===''){
            //recorro el state para obtener las claves y agregar active el elemento correspondiente
            for (const key in estadoFiltro) {
                if(estadoFiltro[key] && estadoFiltro[key]!=='' && estadoFiltro[key]!==true){
                    if(document.getElementsByName(`${estadoFiltro[key]}`)[0]){//pregunto si existe el elemento con la clase del filtro para agregarle el active, si no existe lo creo. (si no existe es porque viene desde modal de marcas)
                        document.getElementsByName(`${estadoFiltro[key]}`)[0].classList.add('active');
                        document.getElementById(`close-${estadoFiltro[key]}`).classList.remove('d-none');
                    }else{
                        //creo los elementos del item
                        let newItemMarca = document.createElement('li');
                        let divItemMarca = document.createElement('div');
                        let spanItemMarca = document.createElement('span');
                        let iconClose = document.createElement('i');
    
                        //asigno las clases, atributos y eventos necesarios.
                        divItemMarca.className = 'item-filtro active';
                        divItemMarca.setAttribute('name',`${estadoFiltro.marca}`);
                        divItemMarca.addEventListener('click',()=>activarFiltro('marca',estadoFiltro.marca));
                        spanItemMarca.className = 'text-muted';
                        spanItemMarca.innerHTML = estadoFiltro.marca;
                        iconClose.className="fas fa-times icon-close-filtro";
                        iconClose.setAttribute('id',`close-${estadoFiltro.marca}`);
                        iconClose.addEventListener('click',()=>limpiarFiltro('marca'));
    
                        //voy ubicando los elementos dentro de cada padre
                        divItemMarca.appendChild(spanItemMarca);
                        newItemMarca.appendChild(divItemMarca);
                        newItemMarca.appendChild(iconClose);
                        
                        //Obtengo el primer item de la lista y lo elimino, para tener siempre la misma cantidad de marcas en la lista.
                        let firstItemMarca = document.querySelector('.lista__marca').children[0];
                        let listaMarcas = document.querySelector('.lista__marca');
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
            props.filtrarProductos(urlFiltro);
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
        document.getElementsByClassName('filtros__contanier')[0].classList.remove('show_filtros');
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
    //console.log(props);
    return (
        <div className="filtros__contanier">
            <div>
                <i className="fas fa-times cerrar-filtro-mobile" onClick={closeFiltrosMobile}></i>
                <h4 className="titulo_filtros">Mascota</h4>
                <ul>
                    <li>
                        <div className="item-filtro" name="perro" onClick={()=>activarFiltro('mascota','perro')}>
                            <span className="text-muted">Perro</span>
                        </div>
                        <i onClick={()=>limpiarFiltro('mascota')} id="close-perro" className="fas fa-times icon-close-filtro d-none"></i>
                    </li>
                    <li>
                        <div className="item-filtro" name="gato" onClick={()=>activarFiltro('mascota','gato')}>
                            <span className="text-muted">Gato</span>
                        </div>
                        <i onClick={()=>limpiarFiltro('mascota')} id="close-gato" className="fas fa-times icon-close-filtro d-none"></i>
                    </li>
                </ul>
                <h4 className="titulo_filtros">Alimentos</h4>
                <ul>
                    <li>
                        <div className="item-filtro" name="alimentoSeco" onClick={()=>activarFiltro('subcategoria','alimentoSeco')}>
                            <span className="text-muted">Alimentos Secos</span>
                        </div>
                        <i onClick={()=>limpiarFiltro('subcategoria')} id="close-alimentoSeco" className="fas fa-times icon-close-filtro d-none"></i>
                    </li>
                    <li>
                        <div className="item-filtro" name="alimentoHumedo" onClick={()=>activarFiltro('subcategoria','alimentoHumedo')}>
                            <span className="text-muted">Alimentos Húmedos</span>
                        </div>
                        <i onClick={()=>limpiarFiltro('subcategoria')} id="close-alimentoHumedo" className="fas fa-times icon-close-filtro d-none"></i>
                    </li>
                    <li>
                        <div className="item-filtro" name="alimentoMedicados" onClick={()=>activarFiltro('subcategoria','alimentoMedicados')}>
                            <span className="text-muted">Alimentos Medicados</span>
                        </div>
                        <i onClick={()=>limpiarFiltro('subcategoria')} id="close-alimentoMedicados" className="fas fa-times icon-close-filtro d-none"></i>
                    </li>
                    <li>
                        <div className="item-filtro" name="alimentoNatural" onClick={()=>activarFiltro('subcategoria','alimentoNatural')}>
                            <span className="text-muted">Alimentos Naturales</span>
                        </div>
                        <i onClick={()=>limpiarFiltro('subcategoria')} id="close-alimentoNatural" className="fas fa-times icon-close-filtro d-none"></i>
                    </li>
                </ul>
                <h4 className="titulo_filtros">Accesorios</h4>
                <ul>
                    <li>
                        <div className="item-filtro" name="camasmantas" onClick={()=>activarFiltro('subcategoria','camasmantas')}>
                            <span className="text-muted">Camas y mantas</span>
                        </div>
                        <i onClick={()=>limpiarFiltro('subcategoria')} id="close-camasmantas" className="fas fa-times icon-close-filtro d-none"></i>
                    </li>
                    <li>
                        <div className="item-filtro" name="comederos" onClick={()=>activarFiltro('subcategoria','comederos')}>
                            <span className="text-muted">Comederos y bebederos</span>
                        </div>
                        <i onClick={()=>limpiarFiltro('subcategoria')} id="close-comederos" className="fas fa-times icon-close-filtro d-none"></i>
                    </li>
                    <li>
                        <div className="item-filtro" name="ropa" onClick={()=>activarFiltro('subcategoria','ropa')}>
                            <span className="text-muted">Ropa</span>
                        </div>
                        <i onClick={()=>limpiarFiltro('subcategoria')} id="close-ropa" className="fas fa-times icon-close-filtro d-none"></i>
                    </li>
                    <li>
                        <div className="item-filtro" name="paseo" onClick={()=>activarFiltro('subcategoria','paseo')}>
                            <span className="text-muted">elementos de paseo</span>
                        </div>
                        <i onClick={()=>limpiarFiltro('subcategoria')} id="close-paseo" className="fas fa-times icon-close-filtro d-none"></i>
                    </li>
                </ul>
                <h4 className="titulo_filtros">Marca</h4>
                <ul className="sinBorderBottom lista__marca">
                    <li>
                        <div className="item-filtro" name="proplan" onClick={()=>activarFiltro('marca','proplan')}>
                            <span className="text-muted">Pro Plan</span>
                        </div>
                        <i onClick={()=>limpiarFiltro('marca')} id="close-proplan" className="fas fa-times icon-close-filtro d-none"></i>
                    </li>
                    <li>
                        <div className="item-filtro" name="canin" onClick={()=>activarFiltro('marca','canin')}>
                            <span className="text-muted">Royal Canin</span>
                        </div>
                        <i onClick={()=>limpiarFiltro('marca')} id="close-canin" className="fas fa-times icon-close-filtro d-none"></i>
                    </li>
                    <li>
                        <div className="item-filtro" name="eukanuba" onClick={()=>activarFiltro('marca','eukanuba')}>
                            <span className="text-muted">Eukanuba</span>
                        </div>
                        <i onClick={()=>limpiarFiltro('marca')} id="close-eukanuba" className="fas fa-times icon-close-filtro d-none"></i>
                    </li>
                    <li>
                        <div className="item-filtro" name="sabrositos" onClick={()=>activarFiltro('marca','sabrositos')}>
                            <span className="text-muted">Sabrositos</span>
                        </div>
                        <i onClick={()=>limpiarFiltro('marca')} id="close-sabrositos" className="fas fa-times icon-close-filtro d-none"></i>
                    </li>
                </ul>
                <button onClick={()=>setModalIsOpen(true)} className="boton bg-gris">Ver todas</button>
            </div>
            {(!modalIsOpen)?null:
                <Modal closeModal={onCloseModal}>
                    <ModalMarca closeModal={onCloseModal} activarFiltro={activarFiltro}/>
                </Modal>
            }
        </div>
    );
}

export default Filtro;
/*const mapStateToProps = reducers=>{
    return reducers.productosReducer;
}

export default connect(mapStateToProps,productosActions)(Filtro);*/