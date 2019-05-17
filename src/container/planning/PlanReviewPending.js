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

class PlanReviewPending extends React.Component{
constructor(props) {
    super(props);
     var showResults=false;
    
    this.state = {showResults:showResults};
    this.onSubmit = this.onSubmit.bind(this);
     this.onSubmitBcpm = this.onSubmitBcpm.bind(this);

  }

  onSubmit= (locationvalue,projectvalue) => {
        localStorage.setItem("locationvalue",locationvalue);
        localStorage.setItem("projectvalue",projectvalue);
         this.setState({showResults:true}); 
    }

  onSubmitBcpm = () => {
            fetchApi('/planning/plansubmit?location='+localStorage.getItem("locationvalue")+'&project='+localStorage.getItem("projectvalue")+'&status=Waiting for Rework');
            alert("Plan Submited Successfully")
            this.setState({showResults:false})
    }


    componentWillMount() {
       if(this.props.location.search!=null){
            var url1 =  this.props.location.search;
            if(url1!=""){
                var objlst = url1.split("?")[1].split("&");
                var locationvalue = objlst[1].split("=")[1];
                var projectvalue = objlst[0].split("=")[1]
                localStorage.setItem("locationvalue",locationvalue.replace(/%20/g, " "));
                 localStorage.setItem("projectvalue",projectvalue.replace(/%20/g, " "));
                 this.setState({showResults:true}); 
            }
        }
    }

    render(){
        
            return (
                 <div style={{"display":"realtive","paddingBottom":"100px"}}>
                   <PlanningHeader  title={"Modify Plan"} headerRight={this.state.showResults?true:false} />
                     {this.state.showResults ?<div style={{"padding":"15px"}}>
                          <BusinessImpact addflag={false}  headerRight={false} status={"Waiting for Rework"} />
                          <RiskAssessment addflag={false} headerRight={false} status={"Waiting for Rework"} />
                          <RecoveryObjectives addflag={false} headerRight={false} status={"Waiting for Rework"} />
                        <AwayTeam addflag={false} headerRight={false}  status={"Waiting for Rework"} />
                        <SeatingInformation addflag={false} headerRight={false} status={"Waiting for Rework"} />
                        <CommunicationPlan addflag={false} headerRight={false}   status={"Waiting for Rework"} />
                        <CommunicationsTree  addflag={false} headerRight={false}  status={"Waiting for Rework"} />
                        <HardWareSpecifications  addflag={false} headerRight={false} status={"Waiting for Rework"} />
                        <SoftwareSpecifications addflag={false} headerRight={false}  status={"Waiting for Rework"} />
                        <TestPlanning addflag={false} headerRight={false} status={"Waiting for Rework"} />
                        <Col md = {"7"} style = {{"textAlign":"right"}}>
                            <button onClick={this.onSubmitBcpm} className={"btn btn-primary "}>
                                {"Submit Business Continuity Plan"}
                            </button>
                        </Col>
                    </div> : <Projectlocation  onSubmit={this.onSubmit} /> }
                    
            </div>
            )
        }
}

export default PlanReviewPending;