import {useEffect} from 'react';
import Head from '../../src/components/Head';
import { connect } from "react-redux";
import * as productosAction from '../../store/actions/productosActions';
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
            await props.traerPorId(props.idProducto);
        } catch (error) {
            console.log(error);
        }
    }
    const router = useRouter();
    const render = ()=>{
        if(props.loading) return <div className="col-12 text-center mt-4"><Loader/></div>
        if(props.error) return <Error/>
        if(!props.producto) return null;
        const {descripcion,descripcion_basica} = props.producto.data[0];
        return <>
            <Head title={props.producto.data[0].producto}/>
            <section className="pb-5" style={{backgroundColor:'white'}}>
                <div className="wrapper__producto container mb-5">
                    <ProductoSingle producto={props.producto.data[0]}
                                    subProductos={props.producto.subproductos}/>
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
    let idProducto = query.producto[1];
    return {idProducto};
};
 
const mapStateToProps = ({productosReducer})=>{
    return productosReducer;
}

export default connect(mapStateToProps,productosAction)(Producto);
