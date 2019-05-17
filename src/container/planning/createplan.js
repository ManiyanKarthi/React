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
import { Col,Row } from 'react-bootstrap';


class CreatePlan extends React.Component{

constructor(props) {
    super(props);
     var showResults=false;
    
    this.state = {navlength:0,showResults:showResults,changestate:false};
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitBcpm= this.onSubmitBcpm.bind(this);
  }

  onSubmit= (locationvalue,projectvalue) => {
        localStorage.setItem("locationvalue",locationvalue);
        localStorage.setItem("projectvalue",projectvalue);
         this.setState({showResults:true}); 
    }

    nextPlan = () => {
        this.setState({
            navlength:this.state.navlength+1
        });
    }
    previousPlan = () => {
         this.setState({
            navlength:this.state.navlength-1
        });
    }

    onSubmitBcpm = () => {
            fetchApi('/planning/plansubmit?location='+localStorage.getItem("locationvalue")+'&project='+localStorage.getItem("projectvalue")+'&status=Draft');
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
                        <PlanningHeader  title={"Create Plan"} headerRight={this.state.showResults?true:false} />
                     {this.state.showResults ?<div style={{"padding":"15px"}}>

                        {this.state.navlength===0?<BusinessImpact addflag={true}  headerRight={false} status={"Draft"} changestate={this.state.changestate} />:null}
                        {this.state.navlength===1?<RiskAssessment addflag={true} headerRight={false} status={"Draft"} changestate={this.state.changestate} />:null}
                        {this.state.navlength===2?<RecoveryObjectives addflag={true} headerRight={false} status={"Draft"} changestate={this.state.changestate} />:null}
                        {this.state.navlength===3?<AwayTeam addflag={true} headerRight={false}  status={"Draft"}  changestate={this.state.changestate} />:null}
                        {this.state.navlength===4?<SeatingInformation addflag={true} headerRight={false} status={"Draft"} changestate={this.state.changestate} />:null}
                        {this.state.navlength===5?<CommunicationPlan addflag={true} headerRight={false}   status={"Draft"} changestate={this.state.changestate}  />:null}
                        {this.state.navlength===6?<CommunicationsTree  addflag={true} headerRight={false}  status={"Draft"} changestate={this.state.changestate} />:null}
                        {this.state.navlength===7?<SoftwareSpecifications addflag={true} headerRight={false}  status={"Draft"} changestate={this.state.changestate}  />:null}
                        {this.state.navlength===8?<HardWareSpecifications  addflag={true} headerRight={false} status={"Draft"} changestate={this.state.changestate} />:null}
                        {this.state.navlength===9?<TestPlanning addflag={true} headerRight={false} status={"Draft"}  changestate={this.state.changestate} />:null}
                         {this.state.navlength<=9?<Row>
                             <Col md = {"6"} style = {{"textAlign":"left"}}>
                            {this.state.navlength>=1?<button onClick={this.previousPlan} className={"btn btn-primary "}>
                            {"Previous"}
                            </button>:null}
                            </Col>
                             <Col md = {"6"} style = {{"textAlign":"right"}}>
                            {this.state.navlength<9?<button onClick={this.nextPlan} className={"btn btn-primary "}>
                                {"Next"}
                            </button> :null}</Col></Row>:null}


                         {this.state.navlength===9?<Col md = {"7"} style = {{"textAlign":"right"}}>
                            <button onClick={this.onSubmitBcpm} className={"btn btn-primary "}>
                                {"Submit Business Continuity Plan"}
                            </button>
                        </Col>:null}
                    </div> : <Projectlocation  onSubmit={this.onSubmit} /> }
                   

            </div>
        )
    }
}

export default CreatePlan;