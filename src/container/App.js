import React from 'react';
import './../css/app.css';
import LoginPage from './Login';
import BCPM from './BCPM';
import {HashRouter,Redirect, Route, Switch} from "react-router-dom";

class App extends React.Component {

  constructor(props){
    super(props);

  }

/*  <Route path="/login" component={LoginPage} /> */

  render() {
    return (
      <div className={"reactContainer"}>
        <HashRouter>
          <Switch>
            <Route path="/login" component={LoginPage} />
            <PrivateRoute path="/" component={BCPM} />
             </Switch>
             </HashRouter>
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

export default App;
