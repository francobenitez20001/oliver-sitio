import React, { useEffect } from 'react';
import CardProducto from '../CardProducto/index';
import {connect} from 'react-redux';
import * as productosActions from '../../../store/actions/productosActions';
import Loader from '../Loader/index';

const Promociones = (props) => {
    useEffect(() => {
       getPromociones();
    }, []);

    const getPromociones = ()=>{
        if(props.promociones.length===0){
            props.traerPromociones();
        }
    }
    return (
        <div className="my-5">
            <h4 className="text-black">Nuestras Promociones</h4>
            <div className="row">
                {(props.loading)?<Loader/>:
                    props.promociones.map(prd=>(
                        <div key={prd.idProducto} className="col-6 col-md-4 col-xl-3">
                            <CardProducto imagen={prd.foto} prd={prd}/>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

const mapStateToProps = reducers=>{
    return reducers.productosReducer;
}

export default connect(mapStateToProps,productosActions)(Promociones);