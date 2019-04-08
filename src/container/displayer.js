import React from 'react';

import {HashRouter, Route, Switch} from "react-router-dom";
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

class DisplayContainer extends React.Component{
    render(){
        return (
            <div className = {"mainContainer"}>
                <div className={"mainContent"}>
                    <HashRouter>
                        <Switch>
                            <Route path="/utility/project" component={Project} />
                            <Route path="/utility/location" component={Location} />
                            <Route path="/utility/employee" component={Employee} />
                            <Route path="/planning/businessimpact" component={BusinessImpact} />
                            <Route path="/planning/riskassessment" component={RiskAssessment} />
                            <Route path="/planning/recoveryobjective" component={RecoveryObjectives} />
                            <Route path="/planning/awayteam" component={AwayTeam} />
                            <Route path="/planning/seatingarragement" component={SeatingInformation} />
                            <Route path="/planning/communicationtree" component={CommunicationsTree} />
                            <Route path="/planning/escalation" component={CommunicationPlan} />
                            <Route path="/planning/softwarespecifcation" component={SoftwareSpecifications} />
                            <Route path="/planning/hardwarespecification" component={HardWareSpecifications} />
                            <Route path="/planning/testplanning" component={Testplanning} />
                             <Route path="/planning/plansubmit" component={PlanSubmit} />
                            <Route path="/planning/planreview" component={PlanReview} />
                            <Route path="/testing/createtestplan" component={CreateTestPlan} />
                            <Route path="/testing/reviewtestplan" component={ReviewTestPlan} />
                              <Route path="/testing/viewapprovedplan" component={ViewApprovedPlan} />
                              <Route path="/testing/reviewtestreport" component={ReviewTestReport} />
                            <Route path="/testing/createtestreport" component={CreateTestReport} />
                            <Route path="/testing/viewtestreport" component={ViewTestReport} />

                            <Route path="/" component={Home} />
                        </Switch>
                    </HashRouter>
                </div>
            </div>
        )
    }
}

export default DisplayContainer