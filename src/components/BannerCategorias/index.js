import React from 'react';
import CardCategoria from '../CardCategoria';

const BannerCategorias = () => {
    return (
        <section className="wrapper__categorias bg-yellow">
            <div className="container">
                <h3 className="mb-5">Comprá según tu categoria</h3>
                <div className="row">
                    <div className="col-6 col-md-3">
                        <CardCategoria/>
                    </div>
                    <div className="col-6 col-md-3">
                        <CardCategoria/>
                    </div>
                    <div className="col-6 col-md-3">
                        <CardCategoria/>
                    </div>
                    <div className="col-6 col-md-3">
                        <CardCategoria/>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .wrapper__categorias{
                    background-color: #FFB347;
                    padding:35px 0px;
                }    
            `}</style>
        </section>
    );
}
 
export default BannerCategorias;