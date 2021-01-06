import { useState } from 'react';
import {connect} from 'react-redux';
import Loader from '../Loader/index';
import {API} from '../../../config/index';

const FormModificarPw = (props) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [actionSuccess, setActionSuccess] = useState(null);

    const sendEmail = async ()=>{
        const {idUsuario,token} = props.usuarioReducer.usuario;
        let headers = new Headers();
        if(!token) return setError('Ups.. ha ocurrido un error.');
        setLoading(true);
        headers.append('token',token);
        headers.append("Content-Type", "application/json");
        const request = await fetch(`${API}resetPassword`,{
            method:'POST',
            headers,
            body:JSON.stringify({idUsuario})
        });
        if(request.status!=200){
            setLoading(false);
            return setError('Ups.. ha ocurrido un error.');   
        }
        const dataRequest = await request.json();
        setLoading(false);
        if(dataRequest.ok){
            return setActionSuccess(dataRequest.info);
        }
        return setError('Ups.. ha ocurrido un error.');
    };
    
    console.log(props);
    return (
        <div className="containerResetPass">
            <div className="text-center">{(error)?<div className="alert alert-danger text-center">{error}</div>:null}</div>
            <div className={`alert alert-${(actionSuccess)?`info`:`warning`} text-center`}>{(actionSuccess)?<b>{actionSuccess}</b>:`Estaremos enviando un email con los pasos para poder realizar el proceso de modificación de contraseña`}</div>
            <div className="col-12 text-center">
                {(loading)?<Loader/>:<button onClick={sendEmail} type="button" disabled={(actionSuccess)?true:false} className="boton bg-yellow">Enviar email</button>}
            </div>
            <style jsx>{`
                .containerResetPass{
                    font-family: 'Quicksand', sans-serif!important;
                }
            `}</style>
        </div>
    );
}

const mapStateToProps = ({usuarioReducer})=>{
    return {usuarioReducer}
}

export default connect(mapStateToProps,null)(FormModificarPw);