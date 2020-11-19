import React,{useState} from 'react';
import Error from "../Error";
import LoginStyle from  './Login.module.css';
import Loader from '../Loader';
import { connect } from 'react-redux';
import * as usuarioActions from '../../../store/actions/usuarioActions';
import { GoogleLogin } from 'react-google-login';
import {GOOGLE_CLIENT_ID} from '../../../config/index'

const Login = (props) => {
    const [formLoginValues, setFormLoginValues] = useState({
        email:'',
        password:''
    });

    const handleChangeLogin = event=>{
        setFormLoginValues({
            ...formLoginValues,
            [event.target.name]:event.target.value
        })
    };

    const handleSubmitLogin = event=>{
        event.preventDefault();
        //let btnSubmit = document.querySelector('#form-login .boton');
        //btnSubmit.setAttribute('disabled',true);
        return props.login(formLoginValues);
    }

    const habilitarRegister = ()=>{
        props.showRegister();
    }

    const responseGoogle = data=>{
        if(data.tokenId){
            return props.singInWithGoogle(data.tokenId);
        }
    }
    //console.log(props);
    return (
        <div className={LoginStyle.login__container}>
            <h6 className={LoginStyle.title__login + ' ' + `text-center`}>Ingresá a tu cuenta</h6>
            {(props.error)?<Error message={props.error}/>:null}
            {(props.loading)?<div className="text-center"><Loader/></div>:null}
            {(props.logueado)?
            <div>
                <div className="text-center alert alert-success">Bienvenido/a {props.usuario.nombre}</div>
                <a href="/" className="boton bg-yellow mb-1">Continuar</a>
            </div>
            :
                <>
                    <form className={LoginStyle.form + ' ' + `form-group`} name="form-login" id="form-login" onSubmit={handleSubmitLogin}>
                        <label className={LoginStyle.label} htmlFor="email">Email</label>
                        <input type="email" className={LoginStyle.input + ' ' + `form-control`} id="email" name="email" value={formLoginValues.email} onChange={handleChangeLogin}/>
                        <label className={LoginStyle.label} htmlFor="password">Contraseña</label>
                        <input type="password" className={LoginStyle.input + ' ' + `form-control`} id="password" name="password" value={formLoginValues.password} onChange={handleChangeLogin}/>
                        <br/>
                        <input type="submit" className="boton bg-yellow mb-1" value="Ingresar"/>
                        <a href="/" className={LoginStyle.forgot__pass + ' ' + `text-center d-block`}>Olvidé mi constraseña</a>
                    </form>
                    <section className={LoginStyle.registerInLogin + ' ' + `text-center`}>
                        <span className="text-muted">¿No tenes cuenta?<span className={LoginStyle.registerLink} onClick={habilitarRegister}> Registrate</span></span>
                        <br/>
                        <GoogleLogin
                            className="mt-2"
                            clientId={GOOGLE_CLIENT_ID}
                            buttonText="Iniciar sesión con Google"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                    </section>
                </>
            }
        </div>
    );
}
const mapStateToProps = reducers=>{
    return reducers.usuarioReducer;
}

export default connect(mapStateToProps,usuarioActions)(Login);