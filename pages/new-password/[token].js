import Head from '../../src/components/Head'
import React, { useState } from 'react';
import Error from '../../src/components/Error';
import {connect} from 'react-redux';
import * as usuarioActions from '../../store/actions/usuarioActions';
import Loader from '../../src/components/Loader/index';

const newPassword = (props) => {
    const [formValues, setFormValues] = useState({
        newPassword:'',
        confirmNewPassword:''
    });

    const handleChange = event=>{
        return setFormValues({
            ...formValues,
            [event.target.name]:event.target.value
        });
    }

    const handleSubmit = event=>{
        event.preventDefault();
        props.updatePassword(formValues,props.token);
    }
    const {loading,error} = props.usuarioReducer;
    console.log(props);
    return (
        <>
            <Head title='Oliver Petshop - Nueva contraseña'/>
            <section className="mt-2 container">
                {/* <Error message="Ups.. algo ha ido mal."/> */}
                {(error)?<Error message={error}/>:null}
                <form className="form-group mt-3" onSubmit={handleSubmit}>
                    <div className="col-12 mb-3">
                        <label htmlFor="pw">Nueva Contraseña</label>
                        <input onChange={handleChange} value={formValues.newPassword} type="password" className="form-control" placeholder="Ingrese su nueva contraseña" name="newPassword" id="newPassword" required/>
                    </div>
                    <div className="col-12 mb-3">
                        <label htmlFor="pw-repeat">Repita la nueva contraseña</label>
                        <input onChange={handleChange} value={formValues.confirmNewPassword} type="password" className="form-control" placeholder="Repita su nueva contraseña" name="confirmNewPassword" id="confirmNewPassword" required/>
                    </div>
                    <div className="col-12 text-center">
                        {(loading)?<Loader/>:<input type="submit" className="boton bg-yellow" value="Enviar"/>}
                    </div>
                    <style jsx>{`
                        form{
                            font-family: 'Quicksand', sans-serif!important;
                        }
                    `}</style>
                </form>
            </section>
        </>
    );
}

newPassword.getInitialProps = async({query})=>{
    const token = query.token;
    return {token};
};

const mapStateToProps = ({usuarioReducer})=>{
    return {usuarioReducer};
}
 
export default connect(mapStateToProps,usuarioActions)(newPassword);