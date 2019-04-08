import React from 'react';
import './SopraForm.css';

const SopraForm = ({formData, formTitle, children}) => {
    return(
        <div className = {"form-style"}>
            <SopraFormHeader formTitle = {formTitle}> </SopraFormHeader>
            <SopraFormBody childrenDetail = {children}></SopraFormBody>
        </div>
        )
} 

function SopraFormHeader(headerData){
    return(
        <div className = {"header-style"}>
            <h4 className = {"form-tile"}>{headerData.formTitle}</h4>
        </div>
    )
}

function SopraFormBody(detialData){
    return(
        <div className = {"form-body"}>
         {detialData.childrenDetail}
         </div>
    )
}
export default SopraForm;