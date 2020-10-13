import {combineReducers} from 'redux';
import marcasReducer from "./marcasReducer";
import productosReducer from "./productosReducer";
import carritoReducer from './carritoReducer';
import categoriasReducer from './categoriasReducer';
import subcategoriaReducer from './subcategoriasReducer';

export default combineReducers({
    marcasReducer,
    productosReducer,
    carritoReducer,
    categoriasReducer,
    subcategoriaReducer
});