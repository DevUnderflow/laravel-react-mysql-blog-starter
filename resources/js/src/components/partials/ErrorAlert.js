import React from 'react';

const ErrorAlert = (props) => {

    return props.msg!==''? (
        <div className="alert alert-danger">
            {props.msg}
        </div>
    ) : null
};

export default ErrorAlert;