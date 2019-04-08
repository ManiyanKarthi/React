import React from 'react';
import './FormGroup.css';

const FormGroup = ({labelText, children}) => {
    return (
    <div className = {"form-group"}>
        <div>
        <label className = {"form-label"}>{labelText}</label>
        </div>
        <div>
          {children}  
        </div>
    </div>
        )
    }

export default FormGroup;