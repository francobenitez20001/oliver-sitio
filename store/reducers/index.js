import {combineReducers} from 'redux';
import marcasReducer from "./marcasReducer";
import productosReducer from "./productosReducer";
import carritoReducer from './carritoReducer';
import categoriasReducer from './categoriasReducer';
import subcategoriaReducer from './subcategoriasReducer';
import usuarioReducer from './usuarioReducer';
import enviosReducer from './enviosReducer';
import mediosDePagoReducer from './mediosDePagoReducer';
import bannerReducer from './bannerReducer';
import politicaReducer from './politicaReducer';

export default combineReducers({
    marcasReducer,
    productosReducer,
    carritoReducer,
    categoriasReducer,
    subcategoriaReducer,
    usuarioReducer,
    enviosReducer,
    mediosDePagoReducer,
    bannerReducer,
    politicaReducer
});