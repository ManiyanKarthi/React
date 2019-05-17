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

class ViewPlan extends React.Component{
constructor(props) {
    super(props);
     var showResults=false;
    
    this.state = {showResults:showResults,gridData:[],gridflag:false};
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit= (locationvalue,projectvalue,status) => {

          let fetchurl = '/planning/fetchAllData?type=BUSINESSIMPACT';
       
          fetch(fetchurl).then(res => res.json()).then(data =>{
              var maparry=[];

                  data = data.filter(data =>{
                            if(!maparry.includes(data.project+data.location+data.STATUS)) {
                                maparry.push(data.project+data.location+data.STATUS)
                                return  true;
                            } else {
                              return  false;
                            }
                      });

                  if(status!="--Select--"){
                       data = data.filter(data =>{
                        return  data.STATUS===status
                      });
                  }
                   
                  if(projectvalue!="All"){
                       data = data.filter(data =>{
                        return  data.project===projectvalue
                      });
                  }

                   if(locationvalue!="All"){
                       data = data.filter(data =>{
                        return  data.location===locationvalue
                      });
                  }

                      this.setState({gridData:data,gridflag:true});                
              })

    }


    dataFormatEvent = (obj,kk)=> {
       let urlnav =""
            if(kk.STATUS==="Draft"){
                urlnav="#/planning/createplan";
            } else if(kk.STATUS==="Review Pending"){
                urlnav="#/planning/planreview";
            } else if(kk.STATUS==="WaitingforRework"){
                urlnav="#/planning/planreviewpending";
            } else if(kk.STATUS==="Approved"){
                urlnav="#/planning/viewplan";
                  return <a href={urlnav} onClick={() => {localStorage.setItem("locationvalue",kk.location);
                                                            localStorage.setItem("projectvalue",kk.project);
                                                            this.setState({showResults:true}); }} >{obj}</a>;
            } 

            if(urlnav==""){
              return obj;
            } else {
                return <a href={urlnav+'?project='+kk.project+'&location='+kk.location}  >{obj}</a>
            }
        
    }


    render(){

        var table = {};
        table.data=[];
        var obj = TableColumnMapping.ViewBCPlan;
        obj[0].dataFormatClick=this.dataFormatEvent;
        table.columnList = obj;
        table.exportCSV = false;

        table.insertRow = false;
        table.deleteRow = false;
         
            return (
                 <div style={{"display":"realtive","paddingBottom":"100px"}}>
                   <PlanningHeader  title={"View Plan"} headerRight={this.state.showResults?true:false} />
                     {this.state.showResults ?<div style={{"padding":"15px"}}>
                          <BusinessImpact addflag={false} deleteflag={false}  headerRight={false} status={"Approved"} />
                          <RiskAssessment addflag={false} deleteflag={false} headerRight={false} status={"Approved"} />
                          <RecoveryObjectives addflag={false} deleteflag={false} headerRight={false} status={"Approved"} />
                        <AwayTeam addflag={false} deleteflag={false} headerRight={false} status={"Approved"}  />
                        <SeatingInformation addflag={false} deleteflag={false} headerRight={false} status={"Approved"} />
                        <CommunicationPlan addflag={false} deleteflag={false} headerRight={false}  status={"Approved"}  />
                        <CommunicationsTree  addflag={false} deleteflag={false} headerRight={false}  status={"Approved"} />
                        <HardWareSpecifications  addflag={false} deleteflag={false} headerRight={false} status={"Approved"} />
                        <SoftwareSpecifications addflag={false} deleteflag={false} headerRight={false}  status={"Approved"} />
                        <TestPlanning addflag={false} deleteflag={false} headerRight={false} status={"Approved"} />
                        
                    </div> : <div>
                            <Projectlocation  onSubmit={this.onSubmit} all={true} status={true} />
                            {this.state.gridflag?<BootstrapCustomTable table={table} data={this.state.gridData} />:null}
                          </div>}
                    
            </div>
            )
        }
}

export default ViewPlan;