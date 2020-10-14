import {combineReducers} from 'redux';
import marcasReducer from "./marcasReducer";
import subproductosReducer from "./subproductosReducer";
import carritoReducer from './carritoReducer';
import categoriasReducer from './categoriasReducer';
import subcategoriaReducer from './subcategoriasReducer';

export default combineReducers({
    marcasReducer,
    subproductosReducer,
    carritoReducer,
    categoriasReducer,
    subcategoriaReducer
});