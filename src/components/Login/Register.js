import React,{useState} from 'react';
import Error from "../Error";
import LoginStyle from './Login.module.css';

const Register = (props) => {
    const [formRegisterValues, setFormRegisterValues] = useState({
        nombre:'',
        telefono:'',
        ubicacion:'',
        email:'',
        password:''
    });
    const [error, setError] = useState(false);

    const handleChangeLogin = event=>{
        setFormRegisterValues({
            ...formRegisterValues,
            [event.target.name]:event.target.value
        })
    };

    const handleSubmitLogin = event=>{
        event.preventDefault();
        if(formRegisterValues.nombre.trim()==='' || formRegisterValues.telefono.trim() === '' || 
        formRegisterValues.ubicacion.trim()==='' ||formRegisterValues.email.trim()==='' || formRegisterValues.password.trim()===''){
            setError('Es necesario completar todos los campos');
            return false;
        }
        setError(false);
        return true;
    }

    const habilitarLogin = ()=>{
        props.showLogin();
    }
    return (
        <div className={LoginStyle.login__container}>
            <h6 className={LoginStyle.title__login + ' ' + `text-center`}>Registrate</h6>
            {(error)?<Error message={error}/>:null}
            <form className={LoginStyle.form + ' ' + `form-group`} name="form-login" id="form-login" onSubmit={handleSubmitLogin}>
                <label className={LoginStyle.label} htmlFor="nombre">Nombre</label>
                <input type="text"  className={LoginStyle.input + ' ' + `form-control`} id="nombre" name="nombre" value={formRegisterValues.nombre} onChange={handleChangeLogin}/>
                
                <label className={LoginStyle.label} htmlFor="telefono">Telefono</label>
                <input type="number"  className={LoginStyle.input + ' ' + `form-control`} id="telefono" name="telefono" value={formRegisterValues.telefono} onChange={handleChangeLogin}/>
                
                <label className={LoginStyle.label} htmlFor="ubicacion">Ubicación</label>
                <input type="text"  className={LoginStyle.input + ' ' + `form-control`} id="ubicacion" name="ubicacion" value={formRegisterValues.ubicacion} onChange={handleChangeLogin}/>
                
                <label className={LoginStyle.label} htmlFor="emal">Email</label>
                <input type="email"  className={LoginStyle.input + ' ' + `form-control`} id="email" name="email" value={formRegisterValues.email} onChange={handleChangeLogin}/>
                
                <label className={LoginStyle.label} htmlFor="password">Contraseña</label>
                <input type="password"  className={LoginStyle.input + ' ' + `form-control`} id="password" name="password" value={formRegisterValues.password} onChange={handleChangeLogin}/>
                
                <br/>
                <input type="submit" className="boton bg-yellow mb-1" value="Registrarme"/>
            </form>
            <section className={LoginStyle.registerInLogin + ' ' + `text-center`}>
                <span className="text-muted">¿Ya tenes cuenta?<span className={LoginStyle.registerLink} onClick={habilitarLogin}> Ingresá</span></span>
            </section>
        </div>
    );
}
 
export default Register;