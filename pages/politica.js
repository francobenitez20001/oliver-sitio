import React, { useEffect } from 'react';
import Header from '../src/components/Head';
import Footer from '../src/components/Footer/index';
import { connect } from "react-redux";
import * as politicaActions from '../store/actions/politicaActions';
import * as productosActions from '../store/actions/productosActions';
import BotonWhatsapp from '../src/components/BotonWhatsApp';
const {traerInfo} = politicaActions;
const {restablecerFiltros} = productosActions;

const Politica = (props) => {
    useEffect(() => {
        props.traerInfo();
        document.getElementsByTagName('body')[0].style.overflowY="auto";
        if(props.productosReducer.filtrando){
            props.restablecerFiltros();
        }
    }, [])
    // console.log(props);
    return (
        <>
            <Header title="Oliver PetShop - Políticas"/>
            <div className="container mt-5 py-4">
                <h2>Política de privacidad</h2>
                <div id="info">{props.politicaReducer.politica}</div>
                <br/>
                <hr/>
                <h2>Terminos y condiciones</h2>
                <div id="info" dangerouslySetInnerHTML={{__html:props.politicaReducer.terminos}}></div>
            </div>
            <Footer/>
            <style jsx>{`
                #info{
                    line-height: inherit;
                    font-family: 'Quicksand', sans-serif;
                    font-size: 20px;
                    line-height: 30px;
                    color: #555;
                    white-space: pre-line;
                }
                h2, #info h3{
                    line-height: 2.2;
                    font-weight: 300;
                    color: #FFB347;
                }
                .container #info h3{
                    color:#fff;
                }    
            `}</style>
            <BotonWhatsapp/>
        </>
    );
}

const mapStateToProps = ({politicaReducer,productosReducer})=>{
    return {
        politicaReducer,
        productosReducer
    };
}

const mapDispatchToProps = {
    traerInfo,
    restablecerFiltros
}
 
export default connect(mapStateToProps,mapDispatchToProps)(Politica);