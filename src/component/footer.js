import React from 'react';

class FooterContainer extends React.Component{

    constructor(props){
        super(props);
        this.state = {};
    }

    render(){
        return (
            <div className={"footerContainer"}>
                ©2018 Sopra Steria, all rights reserved
            </div>
        )
    }
}

export default FooterContainer