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
            </div>
        )
    }
}

export default HeaderContainer