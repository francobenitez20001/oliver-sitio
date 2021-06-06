import { useEffect, useState } from "react";
import { MP_AC_TOKEN } from "../../../config";
import {connect} from 'react-redux';
import Swal from "sweetalert2";

const FormVenta = (props) => {
    const {usuarioReducer:{usuario},ventaReducer} = props;
    const [formValues, setFormValues] = useState({
        docType:'',
        docNumber:'',
        issuer:'',
        installments:'',
        total:ventaReducer.total,
        paymentMethod:null,
        email:usuario.email,
        token:null,
        descripcion:''
    });

    const [issuers, setIssuers] = useState([]);//lista de bancos emisores segun la tarjeta del usuario
    const [payerCosts, setPayerCosts] = useState([]);//lista de opciones de cuotas

    useEffect(function mount() {
        window.Mercadopago.setPublishableKey(MP_AC_TOKEN);
        window.Mercadopago.getIdentificationTypes();
    });

    useEffect(() => {
        let descripcion = `Compra de ${ventaReducer.productos.length} producto${ventaReducer.productos.length>1 ? 's' : ''} en Oliver PetShop`;
        setFormValues({
            ...formValues,
            descripcion
        })
    }, [])

    useEffect(() => {
        if(formValues.paymentMethod){
            getIssuers(formValues.paymentMethod.id);
        }
    }, [formValues.paymentMethod]);

    useEffect(() => {
        if(issuers.length>0){
            getInstallments(issuers);
        }
    }, [issuers]);

    useEffect(() => {
        if(formValues.token){
            enviarData();
        }
    }, [formValues.token])

    const handleChange = e=>{
        if(e.target.id == "cardNumber"){
            guessPaymentMethod(e.target.value);
            return;
        }
        setFormValues({
            ...formValues,
            [e.target.name]:e.target.value
        })
    }

    const guessPaymentMethod = (cardnumber)=>{
        if (cardnumber.length >= 6) {
            let bin = cardnumber.substring(0,6);
            window.Mercadopago.getPaymentMethod({
                "bin": bin
            }, (status,response)=>{
                if(status == 200){
                    let paymentMethod = response[0];
                    return setFormValues({
                        ...formValues,
                        paymentMethod:paymentMethod
                    });
                }
                console.log(response);
                return alert('Error en la busqueda de payment');
            });
        }
     };

    const getIssuers = (idpaymentMethod)=>{
        window.Mercadopago.getIssuers(idpaymentMethod,(status,response)=>{
            if(status != 200) return alert(`issuers method info error: ${response.message}`);
            setIssuers(response);
            setFormValues({
                ...formValues,
                issuer:response[0].id
            })
        });
    }

    const getInstallments = (issuers)=>{
        window.Mercadopago.getInstallments({
            "payment_method_id": formValues.paymentMethod.id,
            "amount": parseFloat(formValues.total),
            "issuer_id": parseInt(issuers[0].value)
        }, (status,response)=>{
            if(status != 200) return alert(`installments method info error: ${response}`);
            setPayerCosts(response[0].payer_costs);
            setFormValues({
                ...formValues,
                installments:response[0].payer_costs[0].installments
            })
        });
    }

    const handleSubmit = e=>{
        e.preventDefault();
        window.Mercadopago.createToken(e.target, (status,response)=>{
            if(status == 200 || status == 201){
                setFormValues({
                    ...formValues,
                    docType:document.getElementById('docType').value,
                    token:response.id
                })
            }
            return false;
        });
    };

    const enviarData = ()=>{
        props.closeModal();
        document.getElementsByTagName('body')[0].style.overflowY = 'scroll';
        Swal.fire('En proceso','Estamos trabajando para habilitar esta funcionalidad','warning');
        console.log(formValues);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Detalles del comprador</h3>
            <div className="form-group row">
                <div className="col-4 my-2">
                    <label htmlFor="docType">Tipo de doc.</label>
                    <select className="form-control" id="docType" name="docType" data-checkout="docType" type="text">
                    </select>
                </div>
                <div className="col-8 my-2">
                    <label htmlFor="docNumber">Número de documento</label>
                    <input className="form-control" id="docNumber" name="docNumber" data-checkout="docNumber" value={formValues.docNumber} type="text" onChange={handleChange}/>
                </div>
            </div>
            <h3>Detalles de la tarjeta</h3>
            <div className="form-group row">
                <div className="col-12 my-2">
                    <label htmlFor="cardNumber">Número de la tarjeta</label>
                    <input type="number" id="cardNumber" data-checkout="cardNumber"
                    onselectstart="return false" onPaste={()=>false}
                    onCopy={()=>false} onCut={()=>false}
                    onDrag={()=>false} onDrop={()=>false} autoComplete="off" onChange={handleChange} className="form-control"/>
                </div>
                <div className="col-12 my-2">
                    <label htmlFor="cardholderName">Titular de la tarjeta</label>
                    <input className="form-control" id="cardholderName" data-checkout="cardholderName" type="text"/>
                </div>
                <div className="col-6 my-2">
                    <label htmlFor="">Vencimiento</label>
                    <div className="row px-3">
                        <input className="form-control col-5 mr-auto" type="number" placeholder="Mes" id="cardExpirationMonth" data-checkout="cardExpirationMonth"
                            onselectstart="return false" onPaste={()=>false}
                            onCopy={()=>false} onCut={()=>false}
                            onDrag={()=>false} onDrop={()=>false} autoComplete="off" maxLength={2}/>
                        <input className="form-control col-5" type="number" placeholder="Año" id="cardExpirationYear" data-checkout="cardExpirationYear"
                            oonselectstart="return false" onPaste={()=>false}
                            onCopy={()=>false} onCut={()=>false}
                            onDrag={()=>false} onDrop={()=>false} autoComplete="off" maxLength={2}/>
                    </div>
                </div>
                <div className="col-6 my-2">
                    <label htmlFor="securityCode">Código de seguridad</label>
                    <input id="securityCode" data-checkout="securityCode" type="number"
                    onselectstart="return false" onPaste={()=>false}
                    onCopy={()=>false} onCut={()=>false}
                    onDrag={()=>false} onDrop={()=>false} autoComplete="off" className="form-control"/>
                </div>
                <div id="issuerInput" className="col-6 my-2">
                    <label htmlFor="issuer">Entidad emisora</label>
                    <select id="issuer" name="issuer" data-checkout="issuer" defaultValue={formValues.issuer} onChange={handleChange} className="form-control">
                        <option value="">Seleccione Banco emisor</option>
                        {issuers.map((issuer,key)=>(
                            <option value={issuer.id} key={key}>{issuer.name}</option>
                        ))}
                    </select>
                </div>
                <div className="col-6 my-2">
                    <label htmlFor="installments">Cuotas</label>
                    <select type="text" id="installments" name="installments" defaultValue={formValues.installments} onChange={handleChange} className="form-control">
                        <option value="">Seleccione cuotas</option>
                        {payerCosts.map((installment,key)=>(
                            <option value={installment.installments} key={key}>{installment.recommended_message}</option>
                        ))}
                    </select>
                </div>
                <div className="col-12 text-center">
                    <br/>
                    <button className="boton bg-yellow" type="submit">Pagar</button>
                    <br/>
                </div>
            </div>
        </form>
    );
}
 
const mapStateToProps = ({usuarioReducer,ventaReducer})=>{
    return {
        usuarioReducer,
        ventaReducer
    }
}

export default connect(mapStateToProps,{})(FormVenta);