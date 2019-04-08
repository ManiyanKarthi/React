import React from 'react';
import BootstrapCustomTable from './../../component/table';
import {TableColumnMapping} from './../../component/configurationdata';
import Projectlocation from './../common/projectlocation';
import PlanningHeader from './../common/planningHeader';
import fetchApi from './../../api/Api';
import AwayTeam from './AwayTeam';
import BusinessImpact from './BusinessImpact';
import CommunicationPlan from './CommunicationPlan';
import CommunicationsTree from './CommunicationsTree';
import HardWareSpecifications from './HardWareSpecifications';
import RecoveryObjectives from './RecoveryObjectives';
import RiskAssessment from './RiskAssessment';
import SeatingInformation from './SeatingInformation';
import SoftwareSpecifications from './SoftwareSpecifications';
import TestPlanning from './TestPlanning';
import { Col } from 'react-bootstrap';

class PlanReview extends React.Component{
constructor(props) {
    super(props);
     var showResults=false;
    if((localStorage.getItem("locationvalue")!=null) && (localStorage.getItem("locationvalue")!="")){
        showResults=true;
    }
    this.state = {showResults:showResults};
    this.onSubmit = this.onSubmit.bind(this);
     this.onApproveBcpm = this.onApproveBcpm.bind(this);

  }

  onSubmit= (locationvalue,projectvalue) => {
        localStorage.setItem("locationvalue",locationvalue);
        localStorage.setItem("projectvalue",projectvalue);
         this.setState({showResults:true}); 
    }

 onApproveBcpm = () => {
            fetchApi('/planning/plansubmit?location='+localStorage.getItem("locationvalue")+'&project='+localStorage.getItem("projectvalue")+'&status=Active');

}

    render(){
        
            return (
                 <div style={{"display":"realtive","paddingBottom":"100px"}}>
                   <PlanningHeader  title={"Submit"} />
                     {this.state.showResults ?<div style={{"padding":"15px"}}>
                          <BusinessImpact addflag={false}  headerRight={false} status={"Active"} />
                        <AwayTeam addflag={false} headerRight={false}  status={"Active"} />
                        <CommunicationPlan addflag={false} headerRight={false}   status={"Active"} />
                        <CommunicationsTree  addflag={false} headerRight={false}  status={"Active"} />
                        <HardWareSpecifications  addflag={false} headerRight={false} status={"Active"} />
                        <RecoveryObjectives addflag={false} headerRight={false} status={"Active"} />
                        <SoftwareSpecifications addflag={false} headerRight={false}  status={"Active"} />
                        <RiskAssessment addflag={false} headerRight={false} status={"Active"} />
                        <SeatingInformation addflag={false} headerRight={false} status={"Active"} />
                        <TestPlanning addflag={false} headerRight={false} status={"Active"} />
                        <Col md = {"7"} style = {{"textAlign":"right"}}>
                            <button onClick={this.onApproveBcpm} className={"btn btn-success"}>
                                {"Approve Business Continuity Plan"}
                            </button>
                        </Col>
                    </div> : <Projectlocation  onSubmit={this.onSubmit} /> }
                    
            </div>
            )
        }
}

export default PlanReview;