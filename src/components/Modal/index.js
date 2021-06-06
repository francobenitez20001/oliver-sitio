import React, { useEffect } from 'react';
import ReactDOM from 'react-dom'
import ModalStyle from './Modal.module.css';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Modal = (props) => {
    useEffect(() => {
        document.getElementById('body__modal_buscador').classList.add(ModalStyle.show);
        document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
    }, [])
    const closeModal = ()=>{
        document.getElementById('body__modal_buscador').classList.remove('show');
        setTimeout(() => {
            document.getElementsByTagName('body')[0].style.overflowY = 'scroll';
            return props.closeModal();
        }, 500);
    }
    if(!document.querySelector('#modals')){
        const rootContainer = document.createElement('div');
        rootContainer.setAttribute('id','modals');
        const parentElem = document.querySelector('#__next');
        parentElem.appendChild(rootContainer);
    }
    return (
        ReactDOM.createPortal(
            <div className={ModalStyle.Modal}>
                <div className={ModalStyle.modal_dialog} id="body__modal_buscador">
                    <FontAwesomeIcon icon={faTimes} onClick={closeModal} className={ModalStyle.close_modal} style={{cursor:'pointer'}}/>
                    <div className={ModalStyle.modal_content}>
                        {props.children}
                    </div>
                </div>
            </div>,
            document.getElementById('modals')
        )
    );
}
 
export default Modal;