import React from 'react';

import {HashRouter,Redirect, Route, Switch} from "react-router-dom";
import Home from './home/Home';
import Project from './setting/project';
import Location from './setting/location';
import Employee from './setting/employee';
import BusinessImpact from './planning/BusinessImpact';
import RiskAssessment from './planning/RiskAssessment';
import RecoveryObjectives from './planning/RecoveryObjectives';
import AwayTeam from './planning/AwayTeam';
import SeatingInformation from './planning/SeatingInformation';
import PlanSubmit from './planning/plansubmit';
import PlanReview from './planning/planreview';
import PlanReviewPending from './planning/PlanReviewPending';
import CommunicationsTree from './planning/CommunicationsTree';
import CommunicationPlan from './planning/CommunicationPlan';
import HardWareSpecifications from './planning/HardWareSpecifications';
import SoftwareSpecifications from './planning/SoftwareSpecifications';
import Testplanning from './planning/TestPlanning';
import CreateTestPlan from './testing/CreateTestPlan';
import CreateTestReport from './testing/CreateTestReport';
import ReviewTestPlan from './testing/ReviewTestPlan';
import ViewApprovedPlan from './testing/viewapprovedplan';
import ViewTestReport from './testing/ViewTestReport';
import ReviewTestReport from './testing/reviewTestReport';
import Search from './search/Search';
import CreatePlan from './planning/CreatePlan';
import ViewPlan from './planning/ViewPlan';
import LoginPage from './Login';

class DisplayContainer extends React.Component{
    render(){
        return (
            <div className = {"mainContainer"}>
                <div className={"mainContent"}>
                    <HashRouter>
                        <Switch>
                            <PrivateRoute exact path="/" component={Home} />
                            <PrivateRoute path="/utility/project" component={Project} />
                            <PrivateRoute path="/utility/location" component={Location} />
                            <PrivateRoute path="/utility/employee" component={Employee} />
                            <PrivateRoute path="/planning/businessimpact" component={BusinessImpact} />
                            <PrivateRoute path="/planning/riskassessment" component={RiskAssessment} />
                            <PrivateRoute path="/planning/recoveryobjective" component={RecoveryObjectives} />
                            <PrivateRoute path="/planning/awayteam" component={AwayTeam} />
                            <PrivateRoute path="/planning/seatingarragement" component={SeatingInformation} />
                            <PrivateRoute path="/planning/communicationtree" component={CommunicationsTree} />
                            <PrivateRoute path="/planning/escalation" component={CommunicationPlan} />
                            <PrivateRoute path="/planning/softwarespecifcation" component={SoftwareSpecifications} />
                            <PrivateRoute path="/planning/hardwarespecification" component={HardWareSpecifications} />
                            <PrivateRoute path="/planning/testplanning" component={Testplanning} />
                            <PrivateRoute path="/planning/plansubmit" component={PlanSubmit} />
                            <PrivateRoute path="/planning/planreview" component={PlanReview} />
                            <PrivateRoute path="/planning/planreviewpending" component={PlanReviewPending} />
                            <PrivateRoute path="/planning/viewplan" component={ViewPlan} /> 
                            <PrivateRoute path="/testing/createtestplan" component={CreateTestPlan} />
                            <PrivateRoute path="/testing/reviewtestplan" component={ReviewTestPlan} />
                            <PrivateRoute path="/testing/viewapprovedplan" component={ViewApprovedPlan} />
                            <PrivateRoute path="/testing/reviewtestreport" component={ReviewTestReport} />
                            <PrivateRoute path="/testing/createtestreport" component={CreateTestReport} />
                            <PrivateRoute path="/testing/viewtestreport" component={ViewTestReport} />
                            <PrivateRoute path="/search" component={Search} />
                            <PrivateRoute path="/planning/createplan" component={CreatePlan} />
                        </Switch>
                    </HashRouter>
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

export default DisplayContainer