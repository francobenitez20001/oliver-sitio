import { useState } from 'react';
import {connect} from 'react-redux';
import Loader from '../Loader/index';
import {API} from '../../../config/index';

const FormModificarPw = (props) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [actionSuccess, setActionSuccess] = useState(null);
    const [email, setEmail] = useState('');

    const sendEmail = async ()=>{
        let headers = new Headers();
        let dataToSend;
        if(props.usuarioReducer.logueado){
            const {idUsuario,token} = props.usuarioReducer.usuario;
            if(!token) return setError('Ups.. ha ocurrido un error.');
            headers.append('token',token);
            dataToSend={idUsuario};
        }else{
            if(email=='') return setError('Ups.. ha ocurrido un error.');
            dataToSend = {email}
        }
        setLoading(true);
        headers.append("Content-Type", "application/json");
        console.log(dataToSend);
        const request = await fetch(`${API}resetPassword`,{
            method:'POST',
            headers,
            body:JSON.stringify(dataToSend)
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

    const handleChangeEmail = event=>{
        setEmail(event.target.value);
    }
    
    return (
        <div className="containerResetPass">
            <div className="text-center">{(error)?<div className="alert alert-danger text-center">{error}</div>:null}</div>
            <div className={`alert alert-${(actionSuccess)?`info`:`warning`} text-center`}>{(actionSuccess)?<b>{actionSuccess}</b>:`Estaremos enviando un email con los pasos para poder realizar el proceso de modificación de contraseña`}</div>
            <div className="col-12 text-center">
                {(loading)?<Loader/>:null}
                {(props.withEmail)?<input type="email" className="form-control mb-3" value={email} onChange={handleChangeEmail} required placeholder="Ingrese su email"/>:null}
                {(!actionSuccess && !loading)?<button onClick={sendEmail} type="button" className="boton bg-yellow">Enviar email</button>:null}
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