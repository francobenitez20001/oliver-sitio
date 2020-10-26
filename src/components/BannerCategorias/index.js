import React,{useEffect} from 'react';
import CardCategoria from '../CardCategoria';
import {connect} from 'react-redux';
import * as categoriasAction from '../../../store/actions/categoriasAction';

const BannerCategorias = (props) => {
    useEffect(() => {
        getCategorias();
    }, []);

    const getCategorias = ()=>{
        if(props.categorias.length===0){
            props.traerTodas();
        }
    }
    return (
        <section className="wrapper__categorias bg-yellow">
            <div className="container">
                <h3 className="mb-5">Comprá según tu categoria</h3>
                <div className="row">
                    {props.categorias.map((cat,key)=>(
                        <div className="col-6 col-md-3" key={key}>
                            <CardCategoria categoria={cat}/>
                        </div>
                    ))}
                </div>
            </div>
            <style jsx>{`
                .wrapper__categorias{
                    background-color: #FFB347;
                    padding:35px 0px;
                }    
            `}</style>
        </section>
    );
}

const mapStateToProps = reducers=>{
    return reducers.categoriasReducer;
}

export default connect(mapStateToProps,categoriasAction)(BannerCategorias);