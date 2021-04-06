import React, { useEffect } from 'react';
import Header from '../src/components/Head';
import Footer from '../src/components/Footer/index';
import { connect } from "react-redux";
import * as politicaActions from '../store/actions/politicaActions';
const {traerInfo} = politicaActions;

const Politica = (props) => {
    useEffect(() => {
        props.traerInfo();
    }, [])
    // console.log(props);
    return (
        <>
            <Header title="Oliver PetShop - Políticas"/>
            <div className="container mt-5 py-4">
                <h2>Política de privacidad</h2>
                <p>{props.politica}</p>
                <br/>
                <hr/>
                <h2>Terminos y condiciones</h2>
                <p>{props.terminos}</p>
            </div>
            <Footer/>
            <style jsx>{`
                div p{
                    line-height: inherit;
                    font-family: 'Quicksand', sans-serif;
                    font-size: 20px;
                    line-height: 30px;
                    color: #555;
                    white-space: pre-line;
                }
                div h2{
                    line-height: 2.2;
                    font-weight: 300;
                    color: #FFB347;
                }    
            `}</style>
        </>
    );
}

const mapStateToProps = ({politicaReducer})=>{
    return politicaReducer;
}

const mapDispatchToProps = {
    traerInfo
}
 
export default connect(mapStateToProps,mapDispatchToProps)(Politica);