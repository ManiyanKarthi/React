import React from 'react';
import { Col ,Row} from 'react-bootstrap';
import PlanningHeader from './../common/planningHeader';
import UIFieldsGeneral from './../../component/uicomponent/UIFieldsGeneral';
import BootstrapCustomTable from './../../component/table';
import fetchApi from './../../api/Api';
var data = [{keyvalue:"BussinessImpact",value:"Business Impact"},{keyvalue:"RiskAssessment",value:"Risk Assessment"},"Business Recovery Objectives","Away Team","Seating Information","Communication Plan - Escalation","Communications Tree","HardWare Specifications","Software Specifications","Test Planning"];
var yearlst = ["2019","2018"];
import UISelect from './../../component/uicomponent/UISelect'
import {TableColumnMapping} from './../../component/configurationdata';
import BusinessImpact from './../planning/BusinessImpact';
import CommunicationPlan from './../planning/CommunicationPlan';
import CommunicationsTree from './../planning/CommunicationsTree';
import HardWareSpecifications from './../planning/HardWareSpecifications';
import RecoveryObjectives from './../planning/RecoveryObjectives';
import RiskAssessment from './../planning/RiskAssessment';
import SeatingInformation from './../planning/SeatingInformation';
import SoftwareSpecifications from './../planning/SoftwareSpecifications';
import TestPlanning from './../planning/TestPlanning';
import AwayTeam from './../planning/AwayTeam';
import {GridColumnMapping} from './../../component/configurationdata';

class Search extends React.Component{
constructor(props){
        super(props);
        this.onChangelocationvalue = this.onChangelocationvalue.bind(this);
        this.onChangeprojectvalue = this.onChangeprojectvalue.bind(this);
       this.state= {testingdata:[],fetchdata:true,data:"BussinessImpact",gridData:[],selectedOptiontest:"Test Plan",selectedOption:"Planning",locationvalue:localStorage.getItem("locationvalue"),projectvalue:localStorage.getItem("projectvalue"),locOptionlist:[],projectOptionlist:[]}
        this.radioChange = this.radioChange.bind(this);
                this.radioChangetest = this.radioChangetest.bind(this);

    }

    componentWillMount() {
            fetch('/utility/getprojectdetails').then(res => res.json()).then(data =>{
                
                    this.setState({projectOptionlist:data.map(function(obj){
                    return obj.projectName+"-"+obj.id
                })}); 
                                    
            })
            
            fetch('/utility/getlocationdetails').then(res => res.json()).then(data =>{
                    this.setState({locOptionlist:data.map(function(obj){
                        var newObject ={
                            key:obj._id,
                            value:obj.location+"-"+obj.id
                        };
                    return newObject
                })});                
            })
    }

    onChangelocationvalue = (ths)=> {
         localStorage.setItem("locationvalue",ths.currentTarget.value);
        
            this.setState({
                locationvalue:ths.currentTarget.value
            });          
    }

    onChangeprojectvalue = (ths)=> {
        localStorage.setItem("projectvalue",ths.currentTarget.value);
        this.setState({
            projectvalue:ths.currentTarget.value
        });
               
    }

 radioChange(e) {
    this.setState({
      selectedOption: e.currentTarget.value
    });
  }

  
 radioChangetest(e) {
    this.setState({
      selectedOptiontest: e.currentTarget.value
    });
  }

searchHandler = (ths) =>{

    this.setState({
        fetchdata:true
    })
    if(this.state.selectedOption === "Testing"){
        let fetchurl = '/testing/getCommunicationtestplanning';

            fetch(fetchurl).then(res => res.json()).then(data => data.filter(data => (data.planstartdateValue.indexOf(this.state.year)>-1))).then(data =>{
                        this.setState({testingdata:data.map((obj) =>{
                            obj.testPlanDate = obj.planstartdateValue+' - '+obj.planenddateValue;
                            obj.projectDetails= obj.projectDetails;

                                return obj;
                        }),showResults:true,preview:false,createTestReport:false});                                
                });
    }
}


          dataFormatEvent = (obj,kk)=> {
            let urlnav =""
            if(this.state.selectedOptiontest==="Test Plan"){
                urlnav="#/testing/viewapprovedplan";
            } else {
                urlnav="#/testing/viewtestreport";
            }
            //<a href={urlnav+"?projectDetails="+obj+'&project='+kk.project+'&location='+kk.location}  >{obj}</a>
            return obj;
        
        }

    render(){
         var table = {};
        table.data=[];

        var obj = GridColumnMapping.SearchTestPlanReport;
        obj[0].dataFormatClick=this.dataFormatEvent;
         if(this.state.selectedOptiontest==="Test Plan"){
             obj[3].hidden=true
         } else {
            obj[3].hidden=false;
         }

        table.columnList = obj;
        table.exportCSV=false;
        table.deleteRow=false;
        table.insertRow=false;
        var uiMap = [{
                    fields:[{ 
                        field:true,
                        label:"Project",
                        validateflag:false,
                        required:false,
                        type:"select",
                        value:this.state.projectvalue,
                        onChange:this.onChangeprojectvalue,
                        selectList:this.state.projectOptionlist
                    },{  
                        field:true,
                        label:"Location:",
                        type:"select",
                        validateflag:false,
                        required:false,
                        value:this.state.locationvalue,
                        onChange:this.onChangelocationvalue,
                        selectList:this.state.locOptionlist
                    },{ 
                        field:true, 
                        label:"Data:",
                        type:"select",
                        validateflag:false,
                        required:false,
                        value:this.state.data,
                        onChange:(ths) =>{
                            this.setState({
                                data:ths.currentTarget.value
                            })
                        },
                        selectList:data.map((obj)=> {
                            return obj
                        })
                    } ]
        }]

        return (
            <div className={"panel"}> 
                <PlanningHeader  title={"Search"} headerRight={false} /> 
                    <div class="row control-label" style={{"paddingLeft":"50px"}}>
                        <div class="col-md-2">
                            <input type="radio"
                                value="Planning"
                                checked={this.state.selectedOption === "Planning"}
                                onChange={this.radioChange} />
                                <label class="control-label leftalign">Planning</label>
                        </div>
                        <div class="col-md-3">
                        <input type="radio"
                            value="Testing"
                            checked={this.state.selectedOption === "Testing"}
                            onChange={(this.radioChange)}/>
                            <label class="control-label leftalign">Testing</label>
                         </div>
					</div>
                    {(this.state.selectedOption === "Planning")?<UIFieldsGeneral mapList={uiMap} />:<div class="row control-label" style={{"paddingLeft":"50px"}}>
                        <div class="col-md-2">
                            <input type="radio"
                                value="Test Plan"
                                checked={this.state.selectedOptiontest === "Test Plan"}
                                onChange={this.radioChangetest} />
                                <label class="control-label leftalign">Test Plan</label>
                        </div>
                        <div class="col-md-3">
                        <input type="radio"
                            value="Test Report"
                            checked={this.state.selectedOptiontest === "Test Report"}
                            onChange={(this.radioChangetest)}/>
                            <label class="control-label leftalign">Test Report</label>
                         </div>
                          <div class="col-md-3">
                                <UISelect validateflag={false} value={this.state.year}   onChange={(ths)=>{ this.setState({
                                        year: ths.currentTarget.value
                                        }); }} selectList={yearlst} />
                         </div>
					</div>}
                    <div class="col-md-12 topAlign" style={{"textAlign":"center"}}>
                    <button class="btn btn-success" onClick={this.searchHandler} >Search</button>
                    
                    </div>
                     {(this.state.selectedOption === "Planning")?<div class="topAlign"  style={{"padding":"15px","display":"realtive"}}>
                                {this.state.data==="BussinessImpact"?<BusinessImpact addflag={false} deleteflag={false} fetchdata={this.state.fetchdata} headerRight={false} />:null}
                                {this.state.data==="Away Team"?<AwayTeam addflag={false} headerRight={false} fetchdata={this.state.fetchdata} deleteflag={false}  />:null}
                                {this.state.data==="Communication Plan - Escalation"?<CommunicationPlan deleteflag={false} fetchdata={this.state.fetchdata} addflag={false} headerRight={false}   />:null}
                                {this.state.data==="Communications Tree"?<CommunicationsTree  addflag={false} deleteflag={false} fetchdata={this.state.fetchdata} headerRight={false}  />:null}
                                {this.state.data==="HardWare Specifications"?<HardWareSpecifications  addflag={false} deleteflag={false} fetchdata={this.state.fetchdata} headerRight={false}  />:null}
                                {this.state.data==="Business Recovery Objectives"?<RecoveryObjectives addflag={false} deleteflag={false}  fetchdata={this.state.fetchdata} headerRight={false}  />:null}
                                {this.state.data==="Software Specifications"?<SoftwareSpecifications addflag={false} deleteflag={false} fetchdata={this.state.fetchdata} headerRight={false}  />:null}
                                {this.state.data==="RiskAssessment"?<RiskAssessment addflag={false} headerRight={false} deleteflag={false} fetchdata={this.state.fetchdata}  />:null}
                                {this.state.data==="Seating Information"?<SeatingInformation addflag={false} deleteflag={false}  headerRight={false} fetchdata={this.state.fetchdata} />:null}
                                {this.state.data==="Test Planning"?<TestPlanning addflag={false} deleteflag={false}  headerRight={false} fetchdata={this.state.fetchdata} />:null}
                     </div>:
                     <div>
                        {this.state.selectedOptiontest === "Test Plan"?<BootstrapCustomTable table={table} data={this.state.testingdata} />:<BootstrapCustomTable table={table} data={this.state.testingdata} />}
                    </div> 
                     
                     }
                     
            </div>
        )
    }
}

export default Search;