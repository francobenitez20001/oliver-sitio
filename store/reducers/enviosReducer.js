import { LOADING,ERROR,GUARDAR } from "../types/enviosTypes";

const INITIAL_STATE = {
    tipos:{
        normal:true,
        express:false,
        local:false
    },
    loading:false,
    error:null
}

const enviosReducer = (state = INITIAL_STATE,action)=>{
    switch (action.type) {           
        case GUARDAR:
            switch (action.payload) {
                case 'normal':
                    return {
                        tipos:{
                            normal:true,
                            express:false,
                            local:false 
                        },
                        loading:false,
                        error:null
                    }
                case 'express':
                    return {
                        tipos:{
                            normal:false,
                            express:true,
                            local:false 
                        },
                        loading:false,
                        error:null
                    }
                case 'local':
                    return {
                        tipos:{
                            normal:false,
                            express:false,
                            local:true 
                        },
                        loading:false,
                        error:null
                    }
                default:
                    break;
            }
        case LOADING:
            return {...state,loading:true}
        case ERROR:
            return {...state,loading:false,error:action.payload}
        default:
            return state;
    }
}

export default enviosReducer;