import ProductoCarrito from "../Carrito/ProductoCarrito";
import {connect} from 'react-redux';
import Loader from "../Loader";

const ProductosUsuario = (props) => {
    const {ultimasCompras,loading} = props;
    return (
        loading ? <Loader/> :
        ultimasCompras.map(ven=>(
            <ProductoCarrito
            key={ven.idVenta}
            idSubProducto={1}
            producto={ven.productos.length>1 ? `${ven.productos[0].subProducto} y otros productos` : ven.productos[0].subProducto}
            fecha={ven.fecha}
            totalExplicito={ven.total}
            foto={ven.productos[0].foto}
            cantidad={ven.productos.length}/>
        ))
    );
}
const mapStateToProps = ({usuarioReducer}) => usuarioReducer; 
export default connect(mapStateToProps,{})(ProductosUsuario);