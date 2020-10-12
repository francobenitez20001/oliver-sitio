import Header from '../src/components/Head';
//import {useEffect} from 'react';
import Productos from '../src/components/Productos';
import Filtro from '../src/components/Filtro';
//import BotonScrollTop from '../src/components/botonScrollToTop';
import Buscador from '../src/components/Buscador';

const Producto = (props) => {
    return ( 
        <>
            <Header title="Oliver - Productos"/>
            <section className="main__productos container">
                <div className="row">
                    <div className="col-12 col-md-3">
                        <Filtro location={props}/>
                    </div>
                    <div className="col-12 col-md-9 py-3">
                        <Productos productos={[]} match={props.match}/>
                    </div>
                </div>
                <Buscador/>
            </section>
        </>
    );
}
 
export default Producto;