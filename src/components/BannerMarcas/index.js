import 'isomorphic-fetch';
import React, { useEffect } from 'react';
import Loader from '../Loader/index';
import CardMarca from '../CardMarca';
import * as marcasActions from '../../../store/actions/marcasActions';
import { connect } from "react-redux";
const BannerMarcas = (props) => {
    useEffect(() => {
        getMarcas();
    }, []);

    const getMarcas = ()=>{
        if(props.marcas.length===0){
            props.traerTodas();
        }
    }
    return (
        <section className="wrapper__marcas">
            {(props.loading) ? 
                <div className="col-12 text-center">
                    <Loader/>
                </div>
            : 
                <div className="container">
                    <h3 className="mb-4">Nuestras marcas</h3>
                    <div className="row">
                        {props.marcas.map((marca,key)=>{
                            if(key>=12) return false;
                            return <div key={marca.idMarca} className="col-6 col-md-3 col-lg-2 my-2">
                                <CardMarca imagen={marca.imagen}/>
                            </div>
                        })}
                    </div>
                </div>
            }
            <style jsx>{`
                .wrapper__marcas{
                    padding:35px 0px;
                }     
            `}</style>
        </section>
    );
}

const mapStateToProps = reducers=>{
    return reducers.marcasReducer;
}

export default connect(mapStateToProps,marcasActions)(BannerMarcas);