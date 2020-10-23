import Header from '../../src/components/Head';
//import {useEffect} from 'react';
import Productos from '../../src/components/Productos';
import Filtro from '../../src/components/Filtro';
//import BotonScrollTop from '../src/components/botonScrollToTop';
import Buscador from '../../src/components/Buscador';
import {useRouter} from 'next/router';

const ProductosPage = (props) => {
    const router = useRouter();
    const {asPath,query} = router;
    let tituloSite = 'Oliver - Productos';
    if(asPath!=='/productos'){
        tituloSite = query.index[0].replace("-"," ").replace(/\b\w/g, l => l.toUpperCase()) + ' en OliverPetShop';
    }
    return ( 
        <>
            <Header title={tituloSite}/>
            <section className="main__productos container">
                <div className="row">
                    <Filtro location={asPath}
                            query={query}/>
                    <div className="col-12 py-3">
                        <Productos match={props.match}/>
                    </div>
                </div>
                <Buscador/>
            </section>
        </>
    );
}

ProductosPage.getInitialProps = async({query})=>{
    return {query};
}

export default ProductosPage;