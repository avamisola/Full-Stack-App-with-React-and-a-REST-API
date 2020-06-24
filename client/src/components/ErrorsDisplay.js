import React from 'react';

//display validation errors
function ErrorsDisplay(props) {
    let errorList = null;
    const errors = props.errors;
    if (errors.length) {
        errorList = (
        <div>
            <h2 className="validation--errors--label">Validation errors</h2>
            <div className="validation-errors">
            <ul>
                { errors.map((item,i) => <li key={i}>{item}</li>) }
            </ul>
            </div>
        </div>
        );
    }
    return errorList;
}

export default ErrorsDisplay;