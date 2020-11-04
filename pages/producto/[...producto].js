import {useEffect} from 'react';
import Head from '../../src/components/Head';
import { connect } from "react-redux";
import * as subproductosAction from '../../store/actions/subproductosActions';
import Loader from '../../src/components/Loader/index';
import ProductoSingle from '../../src/components/ProductoSingle';
import InfoProducto from '../../src/components/ProductoSingle/infoProducto';
import Promociones from '../../src/components/Promociones';
import {useRouter} from 'next/router';

const Producto = (props) => {
    useEffect(() => {
        getData();
    }, []);

    const getData = async()=>{
        try {
            await props.traerPorId(props.idSubProducto);
        } catch (error) {
            console.log(error);
        }
    }
    const router = useRouter();
    const render = ()=>{
        if(props.loading) return <div className="col-12 text-center mt-4"><Loader/></div>
        if(props.error) return <Error/>
        const {descripcion,descripcion_basica} = props.subproductos;
        return <>
            <Head title={props.subproductos.subProducto}/>
            <section className="pb-5" style={{backgroundColor:'white'}}>
                <div className="wrapper__producto container mb-5">
                    <ProductoSingle subProducto={props.subproductos}/>
                </div>
                <InfoProducto descripcion={descripcion} descripcion_basica={descripcion_basica}/>
            </section>
            <div className="container">
                <Promociones/>
            </div>
        </>
    }
    return (
        render()
     );
}

Producto.getInitialProps = async({query})=>{
    let idSubProducto = query.producto[1];
    return {idSubProducto};
};
 
const mapStateToProps = ({subproductosReducer})=>{
    return subproductosReducer;
}

export default connect(mapStateToProps,subproductosAction)(Producto);
