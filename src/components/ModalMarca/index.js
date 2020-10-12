import React,{useEffect} from 'react';
import MarcaStyle from './Marca.module.css';

import {connect} from 'react-redux';
import * as marcasActions from '../../../store/actions/marcasActions';
import Loader from '../Loader/index';

const ModalMarca = (props) => {
    useEffect(() => {
        getData();
    }, []);
    console.log(props);
    
    const getData = ()=>{
        if(props.marcas && props.marcas.length==0){
            props.traerTodas();
        }
    }

    const activarFiltro = marca=>{
        props.closeModal();
        props.activarFiltro('marca',marca);
    }

    return (
        <>
            {(props.loading)?
                <div className="col-12 text-center">
                    <Loader/>
                </div>
            :
                <>
                    <h4 className="text-center">Nuestras marcas</h4>
                    <div className={`row` + ' ' + MarcaStyle.modalMarca} style={{padding:'0px 10px'}}>
                        {props.marcas.map(marca=>(
                            <div key={marca.idMarca} className="col-12 col-md-6 text-center px-4 mb-4" onClick={()=>activarFiltro(marca.marca)}>
                                <div className={MarcaStyle.col_modal_marca + ' ' + `row alig-items-center`}>
                                    <div className="col-6">
                                        <img src={`https://api.oliverpetshop.com.ar/img/`+marca.imagen} alt="marca" className={MarcaStyle.imgMarca +' ' + `img-fluid`}/>
                                    </div>
                                    <div className="col-6 d-flex align-items-center justify-content-center">
                                        {(marca.marca.length>12)?
                                            <p className={MarcaStyle.achicarTamaño + ' ' + MarcaStyle.marca_modal}>{marca.marca}</p>
                                        :
                                            <p className={MarcaStyle.marca_modal}>{marca.marca}</p>
                                        }
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            } 
        </>
    );
}

const mapStateToProps = reducers=>{
    return reducers.marcasReducer;
}
 
export default connect(mapStateToProps,marcasActions)(ModalMarca);