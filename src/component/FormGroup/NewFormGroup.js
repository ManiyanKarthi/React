import React from 'react';
import { Col } from 'react-bootstrap';


const NewFormGroup = ({labelText, children}) => {
    return (
    <div className = {"row-style"}>
        <Col md = {"3"} style = {{"textAlign":"right"}}>
          <label className = {"form-label"}>{labelText}</label>
        </Col>
        <Col md = {"9"}>
         <div className = {"form-group"}>
          {children}  
        </div>
         </Col>
    </div>
        )
    }

export default NewFormGroup;