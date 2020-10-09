import React,{useState} from 'react';
import Error from "../Error";
import LoginStyle from  './Login.module.css';
const Login = (props) => {
    const [formLoginValues, setFormLoginValues] = useState({
        email:'',
        password:''
    });
    const [error, setError] = useState(false);

    const handleChangeLogin = event=>{
        setFormLoginValues({
            ...formLoginValues,
            [event.target.name]:event.target.value
        })
    };

    const handleSubmitLogin = event=>{
        event.preventDefault();
        if(formLoginValues.email.trim()==='' || formLoginValues.password.trim()===''){
            setError('Es necesario completar todos los campos');
            return false;
        }
        setError(false);
        return true;
    }

    const habilitarRegister = ()=>{
        props.showRegister();
    }

    return (
        <div className={LoginStyle.login__container}>
            <h6 className={LoginStyle.title__login + ' ' + `text-center`}>Ingresá a tu cuenta</h6>
            {(error)?<Error message={error}/>:null}
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
            </section>
        </div>
    );
}
 
export default Login;