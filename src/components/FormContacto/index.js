import React from 'react';
const FormContacto = () => {
    return (
        <section className="contacto__ofertas">
            <div className="container">
                <form className="form-group my-0">
                    <div className="row align-items-center my-0 mx-0">
                        <div className="col-12 col-md-4 my-2">
                            <h3 className="txt-yellow">Quiero recibir ofertas!</h3>
                        </div>
                        <div className="col-12 col-md-6 my-2">
                            <input type="email" className="form-control" placeholder="Email" required/>
                        </div>
                        <div className="col-12 col-md-2 my-2">
                            <button type="submit" className="boton bg-outline-yellow">Recibir ofertas</button>
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