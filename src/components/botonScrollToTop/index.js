import React from 'react';
import {scrollToTop} from '../../helpers/helpers';

const BotonScrollTop = () => {
    return (
        <button type="button" onClick={scrollToTop} id="btn-scroll" className="btn btn-secondary btn-float-top">
            <i className="fas fa-arrow-up"></i>
            <style jsx>{`
                .btn-float-top{
                    position: fixed;
                    bottom: 10%;
                    right: 3%;
                    width: 40px;
                    height: 40px;
                    border-radius: 20px!important;
                    display: block!important;
                }    
            `}</style>
        </button>
    );
}
 
export default BotonScrollTop;