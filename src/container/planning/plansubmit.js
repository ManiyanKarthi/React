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


class PlanSubmit extends React.Component{

constructor(props) {
    super(props);
     var showResults=false;
    if((localStorage.getItem("locationvalue")!=null) && (localStorage.getItem("locationvalue")!="")){
        showResults=true;
    }
    this.state = {showResults:showResults,changestate:false};
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitBcpm= this.onSubmitBcpm.bind(this);
  }

  onSubmit= (locationvalue,projectvalue) => {
        localStorage.setItem("locationvalue",locationvalue);
        localStorage.setItem("projectvalue",projectvalue);
         this.setState({showResults:true}); 
    }

    onSubmitBcpm = () => {
            fetchApi('/planning/plansubmit?location='+localStorage.getItem("locationvalue")+'&project='+localStorage.getItem("projectvalue")+'&status=Draft');
            this.setState({changestate:true})
    }

    render(){
      
        return (
            <div style={{"display":"realtive","paddingBottom":"100px"}}>
                        <PlanningHeader  title={"Submit"} />
                     {this.state.showResults ?<div style={{"padding":"15px"}}>
                          <BusinessImpact addflag={false}  headerRight={false} status={"Draft"} changestate={this.state.changestate} />
                        <AwayTeam addflag={false} headerRight={false}  status={"Draft"}  changestate={this.state.changestate} />
                        <CommunicationPlan addflag={false} headerRight={false}   status={"Draft"} changestate={this.state.changestate}  />
                        <CommunicationsTree  addflag={false} headerRight={false}  status={"Draft"} changestate={this.state.changestate} />
                        <HardWareSpecifications  addflag={false} headerRight={false} status={"Draft"} changestate={this.state.changestate} />
                        <RecoveryObjectives addflag={false} headerRight={false} status={"Draft"} changestate={this.state.changestate} />
                        <SoftwareSpecifications addflag={false} headerRight={false}  status={"Draft"} changestate={this.state.changestate}  />
                        <RiskAssessment addflag={false} headerRight={false} status={"Draft"} changestate={this.state.changestate} />
                        <SeatingInformation addflag={false} headerRight={false} status={"Draft"} changestate={this.state.changestate} />
                        <TestPlanning addflag={false} headerRight={false} status={"Draft"}  changestate={this.state.changestate} />
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

export default PlanSubmit;