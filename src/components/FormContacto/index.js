import React, { useState } from 'react';
import { API } from '../../../config';
import Loader from '../Loader/index';
const Swal = require('sweetalert2');

const FormContacto = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async e=>{
        e.preventDefault();
        if(email.trim() === ''){
            setError('Completa el email');
        }
        setError(null);
        setLoading(true);
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        const guardarEmail = await fetch(`${API}/usuario-oferta`,{
            method:'POST',
            headers,
            body:JSON.stringify({email})
        });
        setLoading(false);
        setEmail('');
        if(guardarEmail.status !==200){
            Swal.fire('Upss...','Ha ocurrido un error en la operación, intentalo más tarde.','error');
            return;
        }
        Swal.fire(
            'Listo!',
            'Tu email se ha registrado y cuando tengamos novedades importantes te estaremos avisando!',
            'success'
        )
    }
    return (
        <section className="contacto__ofertas">
            <div className="container">
                <form className="form-group my-0" onSubmit={handleSubmit}>
                    <div className="row align-items-center my-0 mx-0">
                        <div className="col-12 col-md-4 my-2">
                            <h3 className="txt-yellow">Quiero recibir ofertas!</h3>
                        </div>
                        <div className="col-12 col-md-6 my-2">
                            <input type="email" name="email" value={email} onChange={e=>setEmail(e.target.value)} className="form-control" placeholder="Email" required/>
                        </div>
                        <div className="col-12 col-md-2 my-2">
                            {loading ? <Loader/> : <button type="submit" className="boton bg-outline-yellow">Recibir ofertas</button>}
                        </div>
                    </div>
                </form>
            </div>
            <style jsx>{`
                .contacto__ofertas{
                    background-color: white;
                    padding: 25px;
                }

                .contacto__ofertas form input{
                    width: 100%;
                    background: 0 0;
                    border: none;
                    box-shadow: none;
                    border-bottom: 1px solid #FFB347;
                    padding-left: 0;
                }

                @media(max-width:379px){
                    .contacto__ofertas form h3{
                        text-align: center;
                        font-size: 25px !important;
                    }
                }
            `}</style>
        </section>
    );
}
 
export default FormContacto;