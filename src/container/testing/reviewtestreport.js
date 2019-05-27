import React from 'react';
import { Col ,Row} from 'react-bootstrap';
import PlanningHeader from './../common/planningHeader';
import UIFields from './../../component/uicomponent/UIFields';
import BootstrapCustomTable from './../../component/table';
import {GridColumnMapping} from './../../component/configurationdata';
import UIFieldsGeneral from './../../component/uicomponent/UIFieldsGeneral';
import {TableColumnMapping} from './../../component/configurationdata';
import fetchApi from './../../api/Api';
import {formatAMPM} from './../../component/common/common';
var testTypes = ["Communication-Testing","Table-Top-Testing","WAR-Testing","RC-Testing"];
var successMeasurelst = ["70%","80%","90%","100%"];

class ReviewTestReport extends React.Component{
constructor(props){
        super(props);
       this.onChangelocationvalue = this.onChangelocationvalue.bind(this);
        this.onChangeprojectvalue = this.onChangeprojectvalue.bind(this);
        this.onChangetypeOftest = this.onChangetypeOftest.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
       this.state= {successMesure:true,showResults:false,typeoftest:"--Select--",locationvalue:"--Select--",projectvalue:"--Select--",locOptionlist:[],projectOptionlist:[],projectValidationError:false,locValidationError:false}

    }
 componentWillMount() {
        fetch('/utility/getprojectdetails').then(res => res.json()).then(data =>{
            
                   this.setState({projectOptionlist:data.map(function(obj){
                return obj.projectName+"-"+obj.id
            })}); 
                                
        })
        
         fetch('/utility/getlocationdetails').then(res => res.json()).then(data =>{
                   this.setState({locOptionlist:data.map(function(obj){
                return obj.location+"-"+obj.id
            })}); 
                                
            })
  }
    onChangelocationvalue = (ths)=> {
            this.setState({
                locationvalue:ths.currentTarget.value
            });
    }
      onChangeprojectvalue = (ths)=> {
            this.setState({
                projectvalue:ths.currentTarget.value
            });
    }


     onChangetypeOftest = (ths)=> {
        this.setState({
                typeoftest:ths.currentTarget.value
            });

    }

    handleClick = (obj) => {
        let projectDetails=obj.currentTarget.innerText;

        this.getplanComments(this.state.locationvalue,this.state.projectvalue,this.state.typeoftest,projectDetails);
        this.getPreviewData(obj.currentTarget.innerText);

    }

     getPreviewData = (projectDetails)=>{
 

        let fetchurl = '/testing/getCommunicationtestplanning?location='+this.state.locationvalue+'&project='+this.state.projectvalue+'&reportstatus=ReviewPending'+'&projectDetails='+projectDetails+'&typeoftest='+this.state.typeoftest;
    
        fetch(fetchurl).then(res => res.json()).then(data =>{
                    this.setState({prviewData:data,preview:true,showResults:false,projectDetails:projectDetails});                                
            });
    }

     getplanComments = (location,project,typeoftest,projectDetails) =>{
        if(location!="--Select--" && project!="--Select--") {
             fetch('/testing/getTestplanComments?location='+location+'&project='+project+'&typeoftest='+typeoftest+'&projectDetails='+projectDetails).then(res => res.json()).then(data =>{
             if(data.length>0){
                        this.setState({
                                plancomments:data,
                                inscope:data[0].inscope,
                                outOfscope:data[0].outOfscope,
                                risk:data[0].risk,
                                dependency:data[0].dependency,
                                constraints:data[0].constraints,
                                inscopereviewcomments:data[0].inscopereviewcomments,
                                inscopechampcomments:data[0].inscopechampcomments,
                                outofscopereviewcomments:data[0].outofscopereviewcomments,
                                outofscopechampcomments:data[0].outofscopechampcomments,
                                riskreviewcomments:data[0].riskreviewcomments,
                                riskchampcomments:data[0].riskchampcomments,
                                dependencyreviewcomments:data[0].dependencyreviewcomments,
                                dependencychampcomments:data[0].dependencychampcomments,
                                constraintreviewcomments:data[0].constraintreviewcomments,
                                constraintchampcomments:data[0].constraintchampcomments,
                                successMeasure:data[0].successMeasure,
                            });
                    } else {
                        this.setState({
                                plancomments:data,
                                inscope:"",
                                outOfscope:"",
                                risk:"",
                                dependency:"",
                                constraints:"",
                               inscopereviewcomments:"",
                                inscopechampcomments:"",
                                outofscopereviewcomments:"",
                                outofscopechampcomments:"",
                                riskreviewcomments:"",
                                riskchampcomments:"",
                                dependencyreviewcomments:"",
                                dependencychampcomments:"",
                                constraintreviewcomments:"",
                                constraintchampcomments:"",
                                successMeasure:""
                            });
                    }
             });
        } else {
                this.setState({
                                plancomments:[],
                                inscope:"",
                                outOfscope:"",
                                risk:"",
                                dependency:"",
                                constraints:"",
                                inscopereviewcomments:"",
                                inscopechampcomments:"",
                                outofscopereviewcomments:"",
                                outofscopechampcomments:"",
                                riskreviewcomments:"",
                                riskchampcomments:"",
                                dependencyreviewcomments:"",
                                dependencychampcomments:"",
                                constraintreviewcomments:"",
                                constraintchampcomments:"",
                                successMeasure:""
                            });
        }

        
    }

        onSubmit = () => {
                
             let fetchurl = '/testing/getCommunicationtestplanning?location='+this.state.locationvalue+'&project='+this.state.projectvalue+'&reportstatus=ReviewPending'+'&typeoftest='+this.state.typeoftest;
             this.getplanComments(this.state.locationvalue,this.state.projectvalue);
            fetch(fetchurl).then(res => res.json()).then(data =>{
                        this.setState({data:data.map((obj) =>{
                            obj.testPlanDate = obj.planstartdateValue+' - '+obj.planenddateValue;
                           obj.projectDetails= obj.projectDetails;
                            return obj;
                        }),showResults:true,preview:false});                                
                });
                
        }

          dataFormatEvent = (obj)=> {
            return <a href={window.location.href.toString().replace(/^.*\/\/[^\/]+/, '')} onClick={this.handleClick} >{obj}</a>
        
        }

      
        
   

         updateReviewComments = () => {
            var fetchurl=null;
            let json = {
                project:this.state.projectvalue,
                location:this.state.locationvalue,
                inscope:this.state.inscope,
                outOfscope:this.state.outOfscope,
                risk:this.state.risk,
                dependency:this.state.dependency,
                constraints:this.state.constraints,
                inscopereviewcomments:this.state.inscopereviewcomments,
                inscopechampcomments:this.state.inscopechampcomments,
                outofscopereviewcomments:this.state.outofscopereviewcomments,
                outofscopechampcomments:this.state.outofscopechampcomments,
                riskreviewcomments:this.state.riskreviewcomments,
                riskchampcomments:this.state.riskchampcomments,
                dependencyreviewcomments:this.state.dependencyreviewcomments,
                dependencychampcomments:this.state.dependencychampcomments,
                constraintreviewcomments:this.state.constraintreviewcomments,
                constraintchampcomments:this.state.constraintchampcomments
            }

             if(this.state.plancomments.length===0){

                    fetchurl = '/testing/addtestplancomments';
                        fetchApi(fetchurl,JSON.stringify(json));
                } else {
                    fetchurl = '/testing/updatetestplancomments?_id='+this.state.plancomments[0]._id;
                        fetchApi(fetchurl,JSON.stringify(json));
                }

        }

        
        sendComments= () => {

              let fetchurl = '/testing/updatetestplanstatus?location='+this.state.locationvalue+'&project='+this.state.projectvalue+'&reportstatus=ReviewPending&projectDetails='+this.state.projectDetails;
                fetchApi(fetchurl,JSON.stringify({reportstatus:'Pending'})).then(()=>{
                    this.getPreviewData(this.state.projectDetails)
                    this.updateReviewComments();
                      this.setState({successMesure:false});

                });
                
        } 

        approveReport= () => {

              let fetchurl = '/testing/updatetestplanstatus?location='+this.state.locationvalue+'&project='+this.state.projectvalue+'&reportstatus=ReviewPending&projectDetails='+this.state.projectDetails;
                fetchApi(fetchurl,JSON.stringify({reportstatus:'Approved'})).then(()=> {
                    this.getPreviewData(this.state.projectDetails)
                    this.updateReviewComments();
                    this.setState({successMesure:false});
                });
               
        } 

         testPlanStatus = (obj)=> {
            return obj.split("_")[0]
        }

         getcommunicationobj = (data)=> {

                var kk = [{
                    fields:[{ 
                                field:true, 
                                label:"Actual Start Time:",
                                type:"label",
                                validateflag:false,
                                required:false,
                                value:formatAMPM(data.actualstartdateValue?new Date(data.actualstartdateValue):data.actualstartdateValue)
                            },{ 
                                field:true,
                                label:"Actual End Time:",
                                validateflag:false,
                                required:false,
                                type:"label",
                                value:formatAMPM(data.actualenddateValue?new Date(data.actualenddateValue):data.actualenddateValue)
                            },{
                            field:false
                            },{
                            field:false
                            }] 
                }]
                        
            return kk;
        }

    render(){

         var tablepreview = {};

        tablepreview.data=[];
        tablepreview.columnList = TableColumnMapping.CommunicationCallTreeDetails;
        tablepreview.exportCSV = false;
          tablepreview.columnList[3].hidden =false;
         tablepreview.columnList[4].hidden =false;
        tablepreview.columnList[4].dataFormatClick = (obj)=> {
             if(obj) {
                 return Number(obj)>=1?'Y':'N'
             } else {
                 return 'N';
             }
        };
        tablepreview.insertRow =false;
        tablepreview.deleteRow =false;
        tablepreview.search = false;
        var successMeasure =  [{
                    fields:[{ 
                        field:true,
                        label:"Success Measure",
                        validateflag:false,
                        required:false,
                        type:"select",
                        value:this.state.successMeasure,
                        onChange:(ths)=>{this.setState({
                        successMeasure:ths.currentTarget.value
                         }); },
                        selectList:successMeasurelst
                    },{ field:false
                    },{ 
                        field:false 
                    } ]
                }];


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
                        label:"Type of Test:",
                        type:"select",
                        validateflag:false,
                        required:false,
                        value:this.state.typeoftest,
                        onChange:this.onChangetypeOftest,
                        selectList:testTypes
                    } ]
                }];


                var uiMap2 = [{
            fields:[{ 
                field:true,
                label:"In scope:",
                validateflag:false,
                required:false,
                type:"textArea",
                value:this.state.inscope,
                onChange:(ths)=>{this.setState({
                        inscope:ths.currentTarget.value
                         }); },
                selectList:[]
            },{ 
                field:true,
                label:"Review Comments:",
                validateflag:false,
                required:false,
                type:"textArea",
                value:this.state.inscopereviewcomments,
                onChange:(ths)=>{this.setState({
                        inscopereviewcomments:ths.currentTarget.value
                         }); },
                selectList:[]
            },{ 
                field:true,
                label:"Champion Comments:",
                validateflag:false,
                required:false,
                type:"textArea",
                value:this.state.inscopechampcomments,
                onChange:(ths)=>{this.setState({
                        inscopechampcomments:ths.currentTarget.value
                         }); },
                selectList:[]
            }]
        },{
            fields:[{  
                field:true,
                label:"Out of scope:",
                type:"textArea",
                validateflag:false,
                required:false,
                value:this.state.outOfscope,
                onChange:(ths)=>{this.setState({
                        outOfscope:ths.currentTarget.value
                         }); },
                selectList:[]
            },{ 
                field:true,
                label:"Review Comments:",
                validateflag:false,
                required:false,
                type:"textArea",
                 value:this.state.outofscopereviewcomments,
                onChange:(ths)=>{this.setState({
                        outofscopereviewcomments:ths.currentTarget.value
                         }); },
                selectList:[]
            },{ 
                field:true,
                label:"Champion Comments:",
                validateflag:false,
                required:false,
                type:"textArea",
                value:this.state.outofscopechampcomments,
                onChange:(ths)=>{this.setState({
                        outofscopechampcomments:ths.currentTarget.value
                         }); },
                selectList:[]
            }]
        },{
            fields:[{ 
                field:true, 
                label:"Risk:",
                type:"textArea",
                validateflag:false,
                required:false,
                value:this.state.risk,
                 onChange:(ths)=>{this.setState({
                        risk:ths.currentTarget.value
                         }); },
                selectList:[]
            },{ 
                field:true,
                label:"Review Comments:",
                validateflag:false,
                required:false,
                type:"textArea",
                value:this.state.riskreviewcomments,
                onChange:(ths)=>{this.setState({
                        riskreviewcomments:ths.currentTarget.value
                         }); },
                selectList:[]
            },{ 
                field:true,
                label:"Champion Comments:",
                validateflag:false,
                required:false,
                type:"textArea",
                value:this.state.riskchampcomments,
                 onChange:(ths)=>{this.setState({
                        riskchampcomments:ths.currentTarget.value
                         }); },
                selectList:[]
            }]
        },{
            fields:[{ 
                field:true,
                label:"Dependencies:",
                validateflag:false,
                required:false,
                type:"textArea",
                value:this.state.dependency,
                onChange:(ths)=>{this.setState({
                        dependency:ths.currentTarget.value
                         }); },
                selectList:[]
            },{ 
                field:true,
                label:"Review Comments:",
                validateflag:false,
                required:false,
                type:"textArea",
                value:this.state.dependencyreviewcomments,
                onChange:(ths)=>{this.setState({
                        dependencyreviewcomments:ths.currentTarget.value
                         }); },
                selectList:[]
            },{ 
                field:true,
                label:"Champion Comments:",
                validateflag:false,
                required:false,
                type:"textArea",
                value:this.state.dependencychampcomments,
                 onChange:(ths)=>{this.setState({
                        dependencychampcomments:ths.currentTarget.value
                         }); },
                selectList:[]
            }]
        },{
            fields:[{  
                field:true,
                label:"Constraints:",
                type:"textArea",
                validateflag:false,
                required:false,
                value:this.state.constraints,
                onChange:(ths)=>{this.setState({
                        constraints:ths.currentTarget.value
                         }); },
                selectList:[]
            },{ 
                field:true,
                label:"Review Comments:",
                validateflag:false,
                required:false,
                type:"textArea",
                value:this.state.constraintreviewcomments,
                onChange:(ths)=>{this.setState({
                        constraintreviewcomments:ths.currentTarget.value
                         }); },
                selectList:[]
            },{ 
                field:true,
                label:"Champion Comments:",
                validateflag:false,
                required:false,
                type:"textArea",
                value:this.state.constraintchampcomments,
                onChange:(ths)=>{this.setState({
                        constraintchampcomments:ths.currentTarget.value
                         }); },
                selectList:[]
            }]
        }];

                 var table = {};
        table.data=[];
        var obj = GridColumnMapping.ReviewTestPlan;
        //Event handler 
        obj[0].dataFormatClick=this.dataFormatEvent;
        obj[1].dataFormatClick =this.testPlanStatus;
        table.columnList = obj;
        table.exportCSV=false;
        table.deleteRow=false;
        table.insertRow=false;

           
        return (
            <div className={"panel"}> 
        <PlanningHeader  title={"Review Test Report"} headerRight={false} /> 
         <UIFieldsGeneral mapList={uiMap} />

            <div class="col-md-12" style={{"textAlign":"center","paddingTop":"20px"}} >
                <button class="btn btn-success" onClick={this.onSubmit} >Go!</button>
            </div>
            {this.state.showResults ? <BootstrapCustomTable table={table} data={this.state.data} /> : null }
            {!this.state.preview?
                        null
                        :
                        <div>
                            
                            <div className={"panel"}> 
                            <PlanningHeader  title={"Communication / Call Tree Details:"} headerRight={false} />
                           {this.state.successMesure?<UIFieldsGeneral mapList={successMeasure} />:null}
                            {this.state.prviewData.map((data,i) => {
                                var _id=data._id;
                                 return <div key={i}><UIFieldsGeneral mapList={this.getcommunicationobj(data)} />
                                <div style={{"padding":"15px","display":"realtive"}}>
                                <BootstrapCustomTable table={tablepreview} data={data.employeeData.map((obj,i)=>{
                                        obj._id=_id;
                                    return obj;
                                    })} />
                                 </div></div>;   
                            }
                            )}
                            </div>
                            
                                {this.state.prviewData.length>0?<div class="col-md-12" style={{"textAlign":"center"}}>
                                <button class="btn btn-warning" onClick={this.sendComments} >Send Comments</button>
                                <button class="btn btn-success" onClick={this.approveReport} >Approve Report</button>
                            </div>:<div style={{"textAlign":"center"}} ><span>No Data to Display</span></div>}
                        </div>
                        }

            </div>
        )
    }
}
export default ReviewTestReport;

