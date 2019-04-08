import React from 'react';
import { Col ,Row} from 'react-bootstrap';

var headerRight=true;
class PlanningHeader extends React.Component{

 constructor(props){
        super(props);

    }
 

    render(){

        if(this.props.headerRight!=null){
            headerRight=this.props.headerRight;
        }
           
        return (
                <Row style={{"paddingLeft":"24px"}}>
                    <Col md={headerRight?6:1.5} style={{"overflow":"hidden"}}>
                        <span className={"headerTitle"}> {this.props.title}</span>
                    </Col>
                    {headerRight && localStorage.getItem("locationvalue")!=null ? 
                        <Col md={6} style={{"textAlign":"right", "paddingRight":"25px", "overflow":"hidden"}}>
                                <span style={{"fontWeight": "bold"}}>Project:</span> <span style={{"fontSize": "15px"}}>{localStorage.getItem("projectvalue")}</span>
                                <span style={{"fontWeight": "bold" ,"marginLeft": "10px"}}>Location:</span> <span style={{"fontSize": "15px"}}>{localStorage.getItem("locationvalue")}</span>
                        </Col>:null}

                </Row>
        )
    }
}

export default PlanningHeader;