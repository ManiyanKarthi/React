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
            fetchApi('/planning/plansubmit?location='+localStorage.getItem("locationvalue")+'&project='+localStorage.getItem("projectvalue")+'&status=Review Pending');
            alert("Plan Approved")
            this.setState({showResults:false})
}


  sendComments= () => {
        fetchApi('/planning/plansubmit?location='+localStorage.getItem("locationvalue")+'&project='+localStorage.getItem("projectvalue")+'&status=Review Pending&sendcomments=true');
            alert("Plan sent for Review")
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
                   <PlanningHeader  title={"Review Plan"} headerRight={this.state.showResults?true:false} />
                     {this.state.showResults ?<div style={{"padding":"15px"}}>
                          <BusinessImpact addflag={false}  headerRight={false} status={"Review Pending"} />
                          <RiskAssessment addflag={false} headerRight={false} status={"Review Pending"} />
                          <RecoveryObjectives addflag={false} headerRight={false} status={"Review Pending"} />
                        <AwayTeam addflag={false} headerRight={false}  status={"Review Pending"} />
                        <SeatingInformation addflag={false} headerRight={false} status={"Review Pending"} />
                        <CommunicationPlan addflag={false} headerRight={false}   status={"Review Pending"} />
                        <CommunicationsTree  addflag={false} headerRight={false}  status={"Review Pending"} />
                        <HardWareSpecifications  addflag={false} headerRight={false} status={"Review Pending"} />
                        <SoftwareSpecifications addflag={false} headerRight={false}  status={"Review Pending"} />
                        <TestPlanning addflag={false} headerRight={false} status={"Review Pending"} />
                        <Col md = {"7"} style = {{"textAlign":"right"}}>
                            <button class="btn btn-warning" onClick={this.sendComments} >Send Comments</button>
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