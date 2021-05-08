import { Fragment,useEffect } from "react";
import {connect} from 'react-redux';
import * as mediosActions from '../../../store/actions/medioDePagoActions';
import * as ventasActions from '../../../store/actions/ventasActions';

const {traerMedios} = mediosActions;
const {cambiarMedioDePago} = ventasActions;

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
            <select className="form-control" onChange={handleChange} defaultValue={props.ventaReducer.idMedioPago} id="form-medios-pago" disabled={true}>
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

const mapStateToProps = ({mediosDePagoReducer,ventaReducer})=>{return {mediosDePagoReducer,ventaReducer}};
const mapDispatchToProps = {traerMedios,cambiarMedioDePago};
 
export default connect(mapStateToProps,mapDispatchToProps)(MediosDePago);