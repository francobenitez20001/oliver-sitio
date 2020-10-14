import Header from '../src/components/Head';
//import {useEffect} from 'react';
import Productos from '../src/components/Productos';
import Filtro from '../src/components/Filtro';
//import BotonScrollTop from '../src/components/botonScrollToTop';
import Buscador from '../src/components/Buscador';

const ProductosPage = (props) => {
    return ( 
        <>
            <Header title="Oliver - Productos"/>
            <section className="main__productos container">
                <div className="row">
                    <Filtro location={props}/>
                    <div className="col-12 py-3">
                        <Productos match={props.match}/>
                    </div>
                </div>
                <Buscador/>
            </section>
        </>
    );
}
 
export default ProductosPage;