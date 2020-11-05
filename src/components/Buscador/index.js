import React,{useState} from 'react';
import Router from 'next/router'
import Modal from '../Modal/index';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Buscador = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [buscador, setBuscador] = useState('');

    const showModalBuscador = ()=>{
        document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
        setModalIsOpen(true)
    };

    const closeModal = ()=>{
        document.getElementsByTagName('body')[0].style.overflowY = 'scroll';
        setModalIsOpen(false)
    };

    const handleChangeBuscador = event=>(
        setBuscador(event.target.value)
    );

    const handleSubmit = event=>{
        event.preventDefault();
        (buscador.trim()!== '')?Router.push(`/productos?search=${buscador}`):false; 
    }

    return (
        <>
            <button className="boton__float__search bg-yellow" onClick={showModalBuscador}>
                <FontAwesomeIcon icon={faSearch}/>
            </button>
            {(modalIsOpen)?
            <Modal closeModal={closeModal}>
                <form className="form-group mt-4" onSubmit={handleSubmit}>
                    <input type="text" className="form-control" placeholder="¿Qué andas buscando?" onChange={handleChangeBuscador} required/>
                    <button type="submit" className="boton bg-yellow mt-3">Buscar</button>
                </form>
            </Modal>:null}
            <style jsx>{`
                .boton__float__search{
                    position: fixed;
                    top: 85%;
                    right: 4%;
                    display: block;
                    padding: 7px;
                    width: 40px;
                    height: 40px;
                    text-align: center;
                    border-radius: 20px;
                    border: 1px solid #FFB347;
                    box-shadow: 0px 2px 1px -1px rgba(228, 224, 224, 0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
                    display: none;
                }

                @media(max-width:768px){
                    .boton__float__search{
                        display: block;
                    }
                }    
            `}</style>
        </>
    );
}
 
export default Buscador;