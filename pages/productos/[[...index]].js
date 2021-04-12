import Header from '../../src/components/Head';
//import {useEffect} from 'react';
import Productos from '../../src/components/Productos';
import Filtro from '../../src/components/Filtro';
//import BotonScrollTop from '../src/components/botonScrollToTop';
import Buscador from '../../src/components/Buscador';
import {useRouter} from 'next/router';
import BotonWhatsapp from '../../src/components/BotonWhatsApp';

const ProductosPage = (props) => {
    const router = useRouter();
    console.log(router);
    const {asPath,query} = router;
    let tituloSite = 'Oliver - Productos';
    if(asPath!=='/productos'){
        if(query.search){
            tituloSite = query.search+' en OliverPetShop';
        }else if(query.index[0]){
            tituloSite = query.index[0].replace("-"," ").replace(/\b\w/g, l => l.toUpperCase()) + ' en OliverPetShop';
        }
    }
    return ( 
        <>
            <Header title={tituloSite}/>
            <section className="main__productos container">
                <div className="row">
                    <Filtro location={asPath}
                            query={query}/>
                    <div className="col-12 py-3">
                        <Productos location={asPath}
                                    query={query}/>
                    </div>
                </div>
                <Buscador/>
            </section>
            <BotonWhatsapp/>
        </>
    );
}

ProductosPage.getInitialProps = async({query})=>{
    return {query};
}

export default ProductosPage;