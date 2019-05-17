import React from 'react';
import HeaderContainer from '../component/header';
import NavigationContainer from '../component/navigation';
import FooterContainer from '../component/footer';
import Display from './displayer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'react-bootstrap-table/css/react-bootstrap-table.css';
import './../css/app.css';
import SopraSteriaLogo from './../image/soprasteria.png';
import LoginPage from './Login';
import {HashRouter,Redirect, Route, Switch} from "react-router-dom";

class BCPM extends React.Component {

  constructor(props){
    super(props);
    var menubarstyle = "open";
    if(localStorage.getItem("menubarstyle") != null){
      menubarstyle = localStorage.getItem("menubarstyle");
    }
    this.state = {"sidemenuopenwidth": 250, "sidemenuclosedwidth" : 72, "menubarstyle": menubarstyle ,"project":localStorage.getItem("projectvalue"),"location":localStorage.getItem("locationvalue")};
    this.state.sidemenuwidth = this.getMenuWidth(menubarstyle);
    this.toggleMenuBar = this.toggleMenuBar.bind(this);
    this.toggleMenuVariable = this.toggleMenuVariable.bind(this);
    this.getMenuWidth = this.getMenuWidth.bind(this);
  }

  toggleMenuBar(){
    var menu = this.state.menubarstyle;
    menu = this.toggleMenuVariable(menu);
    localStorage.setItem("menubarstyle", menu);
    this.setState({"menubarstyle":menu, "sidemenuwidth": this.getMenuWidth(menu)});
  }

  toggleMenuVariable(menu){
    if(menu === "open"){
      return "close";
    }
    else {
      return "open";
    }
  }

  getMenuWidth(menu){
    if(menu === "open"){
      return this.state.sidemenuopenwidth;
    }
    else {
      return this.state.sidemenuclosedwidth;
    }
  }

  render() {
    return (
                <div>
                    <div className={"navigationContainer"} style={{"width":this.state.sidemenuwidth+"px"}}>
                      <NavigationContainer sidemenuwidth = {this.state.sidemenuwidth} menubarstyle={this.state.menubarstyle} 
                          sidemenuopenwidth={this.state.sidemenuopenwidth}  />
                    </div>
                    <div className={"bodyContainer"} style={{"left":this.state.sidemenuwidth+"px"}}>
                      <HeaderContainer toggleMenuBar={this.toggleMenuBar} menubarstyle={this.state.menubarstyle} state={this.state} />
                      <Display />
                      <FooterContainer />
                    </div>
                  </div>
    )
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)

export default BCPM;
