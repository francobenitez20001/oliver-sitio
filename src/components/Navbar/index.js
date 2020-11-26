import React,{useState,useEffect} from 'react';
import NavbarStyle from './Navbar.module.css';
import Link from 'next/link';
import Router,{useRouter} from 'next/router';
import Modal from '../Modal/index';
import Login from '../Login';
import Register from '../Login/Register';
import Carrito from '../Carrito';
import { faHome,faUser,faPiggyBank,faShoppingCart,faAlignLeft,faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import {faFacebook,faInstagram} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {PUBLIC_URL, URL_CLOUD_STORAGE} from '../../../config/index';
import {connect} from 'react-redux';
import * as usuarioActions from '../../../store/actions/usuarioActions';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


const Navbar = (props) => {
    useEffect(() => {
        props.verificarSesion();
    }, []);

    const [busqueda, setBusqueda] = useState('');
    const [login, setLogin] = useState(false);
    const [carrito, setCarrito] = useState(false);
    const [register, setRegister] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [dropdownOpen, setOpen] = useState(false);
    const location = useRouter();
    //actions login-register
    const showModalLogin =()=>{
        (register)?setRegister(false):null;
        (carrito)?setCarrito(false):null;
        setLogin(true);
        setModalIsOpen(true)
    }

    const showRegister = ()=>{
        (login)?setLogin(false):false;
        (carrito)?setCarrito(false):null;
        setRegister(true);
    }

    const closeModal=()=>(
        setModalIsOpen(false)
    )
    
    
    //-------------------------------------------------//


    //actions carrito
    const showModalCarrito = ()=>{
        (login)?setLogin(false):null;
        (register)?setRegister(false):null;
        setCarrito(true);
        setModalIsOpen(true);
    }

    const toggleMenu = ()=>{
        document.getElementsByClassName(NavbarStyle.menu__collapsed)[0].classList.toggle(NavbarStyle.showCollapsed);
    }

    const handleChangeMenu = event=>{
        setBusqueda(event.target.value);
    }

    const handleSubmitBuscador = event=>{
        event.preventDefault();
        if(busqueda.trim() === '')return false;
        if(location.pathname == '/'){
            return Router.push(`/productos?search=${busqueda}`);
        }
        return window.location.assign(`/productos?search=${busqueda}`);
    }

    const renderContenidoModal = ()=>{
        if(login) return <Login showRegister={showRegister}/>;
        if(register) return <Register showLogin={showModalLogin}/>;
        if(carrito) return <Carrito/>
    }
    const cerrarSesion = async()=>{
        await props.logout();
        setTimeout(() => {
            return showModalLogin();
        }, 800);
    }
    const toggle = () => setOpen(!dropdownOpen);
    return (
        <>
            <div className={NavbarStyle.navbar + ' ' + `sticky-top`}>
                <div className={NavbarStyle.wrapper__navbar  + ' ' +  `container`}>
                    <nav className="row ml-0 w-100">
                        <div className={NavbarStyle.container__logo}>
                            <Link href="/">
                                <a>
                                    <img src={`${URL_CLOUD_STORAGE}/static/Perro.png`} className={NavbarStyle.logo + ' ' + `img-fluid`} alt="Oliver pet shop"/>
                                </a>
                            </Link>
                        </div>
                        <span className={NavbarStyle.boton__menu + ' ' + NavbarStyle.btn_carrito + ' ' + NavbarStyle.carrito_mobile} onClick={showModalCarrito}>
                            <FontAwesomeIcon icon={faShoppingCart} className={NavbarStyle.txt__item_menu}/>
                        </span>
                        <FontAwesomeIcon  onClick={toggleMenu} icon={faAlignLeft} className={NavbarStyle.icon_menu}/>
                        <form className={NavbarStyle.buscador + ' ' + `col-sm-4 col-xl-7 col-md-7 d-flex align-items-center input-group`} autoComplete="off" onSubmit={handleSubmitBuscador}>
                            <input type="text" required className={NavbarStyle.form_search_menu + ' ' + `form-control`} onChange={handleChangeMenu} placeholder="¿Qué andas buscando?"/>
                        </form>
                        <div className={NavbarStyle.container__login_menu + ' ' + `col-sm-7 col-xl-4 col-md-4 d-flex align-items-center justify-content-end`}>
                            {(props.logueado)?
                                <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                                    <DropdownToggle caret size="sm" className={NavbarStyle.boton__menu + ' ' + NavbarStyle.btn_account + ' ' + NavbarStyle.sinBorder}>
                                        <img src={(props.usuario.foto != 'null')?props.usuario.foto:`https://storage.googleapis.com/web-oliver/user-default.png`} className={NavbarStyle.imgProfile}/>
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <Link href={`${PUBLIC_URL}/perfil`}>
                                            <a>
                                                <DropdownItem>
                                                    Mi perfil
                                                </DropdownItem>
                                            </a>
                                        </Link>
                                        <DropdownItem divider />
                                        <DropdownItem onClick={cerrarSesion}><FontAwesomeIcon icon={faSignOutAlt} className={NavbarStyle.txt__item_menu}/> Cerrar sesión</DropdownItem>
                                    </DropdownMenu>
                                </ButtonDropdown>
                            :
                                <span onClick={showModalLogin} className={NavbarStyle.boton__menu + ' ' + NavbarStyle.btn_account}>
                                    <span className={NavbarStyle.txt__item_menu}>Ingresá ahora / Registrate</span>
                                </span>
                            }
                            <span className={NavbarStyle.boton__menu + ' ' + NavbarStyle.btn_carrito} onClick={showModalCarrito}>
                                <FontAwesomeIcon icon={faShoppingCart} className={NavbarStyle.txt__item_menu}/>
                            </span>
                        </div>
                    </nav>
                </div>
                <div className={NavbarStyle.menu__collapsed}>
                    <section className={NavbarStyle.header__collapsed_nav}>
                        <img src={`${URL_CLOUD_STORAGE}/static/Perro.png`} className={NavbarStyle.logo} alt="Oliver pet shop"/>
                        <i onClick={toggleMenu} className={NavbarStyle.close_btn_menu + ' ' + `fas fa-times`}></i>
                        {(props.logueado)?
                                <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                                    <DropdownToggle caret size="sm" className={NavbarStyle.boton__menu + ' ' + NavbarStyle.btn_account + ' ' + NavbarStyle.sinBorder}>
                                        <img src={(props.usuario.foto != 'null')?props.usuario.foto:`https://storage.googleapis.com/web-oliver/user-default.png`} className={NavbarStyle.imgProfile}/>
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <Link href={`${PUBLIC_URL}/perfil`} onClick={toggleMenu}>
                                            <a>
                                                <DropdownItem>
                                                    Mi perfil
                                                </DropdownItem>
                                            </a>
                                        </Link>
                                        <DropdownItem divider />
                                        <DropdownItem onClick={cerrarSesion}><FontAwesomeIcon icon={faSignOutAlt} className={NavbarStyle.txt__item_menu}/> Cerrar sesión</DropdownItem>
                                    </DropdownMenu>
                                </ButtonDropdown>
                        :null}
                    </section>
                    <div className={NavbarStyle.main__collapsed}>
                        <ul className={NavbarStyle.list__menu__collapsed}>
                            <Link href="/" onClick={toggleMenu}>
                                <a>
                                    <li className={NavbarStyle.item__menu__collapsed}>
                                        <FontAwesomeIcon icon={faHome} className={NavbarStyle.icon__itemMenu__collapsed}/>
                                        <span className={NavbarStyle.label__item__menu}>Inicio</span>
                                    </li>
                                </a>
                            </Link>
                            <Link href="/" onClick={toggleMenu}>
                                <a>
                                    <li className={NavbarStyle.item__menu__collapsed}>
                                        <FontAwesomeIcon icon={faPiggyBank} className={NavbarStyle.icon__itemMenu__collapsed}/>
                                        <span className={NavbarStyle.label__item__menu}>Productos</span>
                                    </li>
                                </a>
                            </Link>
                            {(props.logueado)?null
                            :
                            <li className={NavbarStyle.item__menu__collapsed} onClick={showModalLogin}>
                                <FontAwesomeIcon icon={faUser} className={NavbarStyle.icon__itemMenu__collapsed}/>
                                <span className={NavbarStyle.label__item__menu}>Ingresá ahora / Registrate</span>
                            </li>
                            }
                            <li className={NavbarStyle.item__menu__collapsed + ' ' + NavbarStyle.__withButton}>
                                <a href="/" className="boton bg-yellow">Ofertas</a>
                            </li>
                        </ul>
                    </div>
                    <section className={NavbarStyle.collapsed_info + ' ' + `text-center`}>
                        <div className={NavbarStyle.redes__collapsed}>
                            <FontAwesomeIcon icon={faFacebook} className={NavbarStyle.iconoRed}/>
                            <FontAwesomeIcon icon={faInstagram} className={NavbarStyle.iconoRed}/>
                        </div>
                        <span className="text-muted">&copy;Terminos y Condiciones</span>
                    </section>  
                </div>
            </div>
            {(!modalIsOpen)?null:
                <Modal closeModal={closeModal}>
                    {renderContenidoModal()}
                </Modal>
            }
        </>
    );
}
const mapStateToProps = reducers=>{
    return reducers.usuarioReducer;
}

export default connect(mapStateToProps,usuarioActions)(Navbar);