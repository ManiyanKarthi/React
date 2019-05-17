import React from 'react';
import { Col } from 'react-bootstrap';
import { faChevronCircleLeft,faChevronCircleRight} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class HeaderContainer extends React.Component{

    constructor(props){
        super(props);
        this.state = {menubarstyle: props.menubarstyle};
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ menubarstyle: nextProps.menubarstyle });
    }

    render(){
         var obj = JSON.parse(localStorage.getItem('user'));

        var fName="";
        var flag=true;
        if(obj.length>0){
            fName = obj[0].fName
        } else{
            flag=false;
        }
       
        var classn = <FontAwesomeIcon icon={faChevronCircleLeft} />;
        if(this.state.menubarstyle === "close"){
            classn = <FontAwesomeIcon icon={faChevronCircleRight} />;
        }
        return (
            <div className={"headerContainer"}>
                <Col md={6} style={{"overflow":"hidden"}}>
                    <button onClick={this.props.toggleMenuBar} className={"toogleButton"}>
                        {classn}
                    </button>
                    &nbsp;&nbsp;
                    <span className={"headerTitle"}>Business continuity plan</span>
                </Col>
                <div class="col-md-6" style={{"textAlign":"right"}} >
                    {flag?
					<div class="dropdown" >
                        {fName}
                        <p><a href="/#/login">Logout</a></p>
					</div>:<p><a href="/#/login">Login</a></p>}
                    </div>
            </div>
        )
    }
}

export default HeaderContainer