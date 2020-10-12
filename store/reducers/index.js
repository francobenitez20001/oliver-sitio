import {combineReducers} from 'redux';
import marcasReducer from "./marcasReducer";
import productosReducer from "./productosReducer";
import carritoReducer from './carritoReducer';

export default combineReducers({
    marcasReducer,
    productosReducer,
    carritoReducer
});