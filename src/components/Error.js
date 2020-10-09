import React from 'react';
const Error = ({message}) => {
    return (
        <div className="alert alert-warning text-center">{message}</div>
    );
}
 
export default Error;