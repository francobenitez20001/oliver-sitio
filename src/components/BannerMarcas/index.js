import 'isomorphic-fetch';
import React, { useEffect } from 'react';
import Loader from '../Loader/index';
import CardMarca from '../CardMarca';
import * as marcasActions from '../../../store/actions/marcasActions';
import { connect } from "react-redux";
import {slug} from '../../../helpers/index';
import Link from 'next/link';
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
                    <h3 className="mb-4">Nuestras principales marcas</h3>
                    <div className="row">
                        {props.marcas.map((marca,key)=>{
                            if(key>=12) return false;
                            return <Link href={`productos/${slug(`${marca.marca}`)}/${marca.idMarca}?type=marca`} key={marca.idMarca}>
                                <div className="col-6 col-md-3 col-lg-2 my-2">
                                    <CardMarca imagen={marca.imagen}
                                                marca={marca.marca}
                                                id={marca.idMarca}/>
                                </div>
                            </Link>
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