import ProductoCarrito from "../Carrito/ProductoCarrito";

const ProductosUsuario = (props) => {
    const productos = [1,2,3,4,5,6,7,8,9];
    const eliminar = ()=>console.log('eliminar');
    return (
        productos.map(item=>(
            <ProductoCarrito
            key={item}
            idSubProducto="1"
            producto="Dog pron Adulto"
            peso="5"
            total="1500"
            foto="https://storage.googleapis.com/web-oliver/-VitalCrops-DogPro-Adulto-15k.jpg"
            cantidad="1"
            eliminarProducto={eliminar}/>
        ))
    );
}
 
export default ProductosUsuario;