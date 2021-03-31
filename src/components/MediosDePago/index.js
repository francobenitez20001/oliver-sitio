import { Fragment,useEffect } from "react";
import {connect} from 'react-redux';
import * as mediosActions from '../../../store/actions/medioDePagoActions';
import * as carritoActions from '../../../store/actions/carritoActions';

const {traerMedios} = mediosActions;
const {cambiarMedioDePago} = carritoActions;

const MediosDePago = (props) => {
    useEffect(() => {
        if(props.mediosDePagoReducer.mediosDePago.length==0){
            props.traerMedios();
        }
    }, []);

    const handleChange = event=>{
        props.cambiarMedioDePago(event.target.value);
    }
    return (
        <Fragment>
            <select className="form-control" onChange={handleChange} defaultValue={props.carritoReducer.idMedioPago} id="form-medios-pago" disabled={true}>
                {props.mediosDePagoReducer.mediosDePago.map((medio,key)=>{
                    return <option value={medio.idMedioPago} key={key}>{medio.medio}</option>
                })}
            </select>

            <style jsx>{`
                @media(max-width:768px){
                    select{
                        margin-bottom:60px;
                    }          
                }
            `}</style>
        </Fragment>
    );
}

const mapStateToProps = ({mediosDePagoReducer,carritoReducer})=>{return {mediosDePagoReducer,carritoReducer}};
const mapDispatchToProps = {traerMedios,cambiarMedioDePago};
 
export default connect(mapStateToProps,mapDispatchToProps)(MediosDePago);