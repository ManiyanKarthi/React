import React from 'react';
import { Col ,Row} from 'react-bootstrap';
import PlanningHeader from './../common/planningHeader';
import UIFields from './../../component/uicomponent/UIFields';
import BootstrapCustomTable from './../../component/table';
import {GridColumnMapping} from './../../component/configurationdata';
import UIFieldsGeneral from './../../component/uicomponent/UIFieldsGeneral';
import {TableColumnMapping} from './../../component/configurationdata';
import fetchApi from './../../api/Api';
var testTypes = ["Communication Testing","Table Top Testing","WAR Testing","RC Testing"];
var successMeasurelst = ["70%","80%","90%","100%"];

class CreateTestReport extends React.Component{
constructor(props){
        super(props);
       this.onChangelocationvalue = this.onChangelocationvalue.bind(this);
        this.onChangeprojectvalue = this.onChangeprojectvalue.bind(this);
        this.onChangetypeOftest = this.onChangetypeOftest.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
       this.state= {createTestReport:false,showResults:false,typeoftest:"--Select--",locationvalue:"--Select--",projectvalue:"--Select--",locOptionlist:[],projectOptionlist:[],projectValidationError:false,locValidationError:false}

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

        
        this.getPreviewData(obj.currentTarget.innerText);

    }

     getPreviewData = (projectDetails)=>{
        let fetchurl = '/testing/getCommunicationtestplanning?location='+this.state.locationvalue+'&project='+this.state.projectvalue+'&reportstatus=Pending'+'&projectDetails='+projectDetails+'&typeoftest='+this.state.typeoftest;
    
        fetch(fetchurl).then(res => res.json()).then(data =>{
                    this.setState({prviewData:data,preview:true,showResults:false,projectDetails:projectDetails});                                
            });
    }

    getplanComments = (location,project) =>{
        if(location!="--Select--" && project!="--Select--") {
             fetch('/testing/getTestplanComments?location='+location+'&project='+project).then(res => res.json()).then(data =>{
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
                
             let fetchurl = '/testing/getCommunicationtestplanning?location='+this.state.locationvalue+'&project='+this.state.projectvalue+'&reportstatus=Pending'+'&typeoftest='+this.state.typeoftest;
             this.getplanComments(this.state.locationvalue,this.state.projectvalue);
            fetch(fetchurl).then(res => res.json()).then(data =>{
                        this.setState({data:data.map((obj) =>{
                            obj.testPlanDate = obj.planstartdateValue+' - '+obj.planenddateValue;
                           obj.projectDetails= obj.projectDetails;
                            return obj;
                        }),showResults:true,preview:false,createTestReport:false});                                
                });
                
        }

          dataFormatEvent = (obj)=> {
            return <a href={window.location.href.toString().replace(/^.*\/\/[^\/]+/, '')} onClick={this.handleClick} >{obj}</a>
        
        }


    

        getcommunicationobj = (data)=> {
            var ObjcomData = data;

                var kk = [{
                    fields:[{ 
                                field:true,
                                label:"Primary Tester:",
                                validateflag:false,
                                required:false,
                                type:"label",
                                value:data.primaryTester
                            },{  
                                field:true,
                                label:"Secondary Tester:",
                                type:"label",
                                validateflag:false,
                                required:false,
                                value:data.secondaryTester
                            },{ 
                                field:true, 
                                label:"Plan Start Time:",
                                type:"label",
                                validateflag:false,
                                required:false,
                                value:data.planstartdateValue
                            }]
                        },{
                            fields:[{ 
                                field:true,
                                label:"Plan End Time:",
                                validateflag:false,
                                required:false,
                                type:"label",
                                value:data.planenddateValue
                            },{ 
                                field:this.state.createTestReport,
                                label:"Actual Start Time:",
                                type:"DatePicker",
                                validateflag:false,
                                required:false,
                                value:data.actualstartdateValue?new Date(data.actualstartdateValue):data.actualstartdateValue,
                                onChange:(ths) =>{
                          
                                    
                                    this.setState({
                                            prviewData:this.state.prviewData.map((obj)=>{
                                                
                                                if(obj._id==ObjcomData._id) {
                                            
                                                    obj.actualstartdateValue = ths
                                                    return obj;
                                                } else {
                                                    return obj;
                                                }

                                            })
                                        })

                                },
                                selectList:[]
                    
                            },{ 
                                field:this.state.createTestReport,
                                 label:"Actual End Time:",
                                type:"DatePicker",
                                validateflag:false,
                                required:false,
                                value:data.actualenddateValue?new Date(data.actualenddateValue):data.actualenddateValue,
                                onChange:(ths) =>{
                                    
                                    this.setState({
                                            prviewData:this.state.prviewData.map((obj)=>{
                                                
                                                if(obj._id==ObjcomData._id) {
                                            
                                                    obj.actualenddateValue = ths
                                                    return obj;
                                                } else {
                                                    return obj;
                                                }

                                            })
                                        })

                                },
                                selectList:[]
                            }]

                        },{
                            fields:[{ 
                                field:this.state.createTestReport,
                                label:"Actual Test Id",
                                validateflag:false,
                                required:false,
                                type:"text",
                                 value:data.actualtestId,
                               onChange:(ths) =>{
                               

                                    this.setState({
                                            prviewData:this.state.prviewData.map((obj)=>{
                                                
                                                if(obj._id==ObjcomData._id) {
                                            
                                                    obj.actualtestId = ths.currentTarget.value;
                                                    return obj;
                                                } else {
                                                    return obj;
                                                }

                                            })
                                        })

                                },
                            },{ 
                                field:false
                    
                            },{ 
                                field:false
                            }]

                        }]
            return kk;
        }
        
        createTestReport = () => {
                
            this.setState({
                createTestReport:true
            })
        }

        saveAllchanges=() =>{

             this.state.prviewData.map((obj)=>{

                        let fetchurl = '/testing/updatecommunicationDetails';
                        obj.reportstatus = 'ReviewPending';
                        fetchApi(fetchurl,JSON.stringify(obj));
                        return obj;

                    });

              let fetchurl = '/testing/updatetestplanstatus?location='+this.state.locationvalue+'&project='+this.state.projectvalue+'&reportstatus=Pending&projectDetails='+this.state.projectDetails;
                fetchApi(fetchurl,JSON.stringify({reportstatus:'ReviewPending'}));
                
                                this.updateReviewComments();

                       
                    
                    alert("Updated successfully");

                    this.getPreviewData(this.state.projectDetails);


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
                constraintchampcomments:this.state.constraintchampcomments,
                successMeasure:this.state.successMeasure
            }

             if(this.state.plancomments.length===0){

                    fetchurl = '/testing/addtestplancomments';
                        fetchApi(fetchurl,JSON.stringify(json));
                } else {
                    fetchurl = '/testing/updatetestplancomments?_id='+this.state.plancomments[0]._id;
                        fetchApi(fetchurl,JSON.stringify(json));
                }

        }

    render(){

         var tablepreview = {};

        tablepreview.data=[];
        tablepreview.columnList = TableColumnMapping.CommunicationCallTreeDetails;
        tablepreview.exportCSV = false;
        tablepreview.cellEdit = {mode: 'dbclick',blurToSave: true,afterSaveCell: (obj,columnName,newValue) => {
            if(obj.oldvalue!=newValue) {
                        if(!obj.change){
                            obj[columnName]=obj.oldvalue
                        } else {
                                if(obj.change){
                                delete obj.change
                            }

                            this.setState({
                                            prviewData:this.state.prviewData.map((obj1)=>{
                                                
                                                if(obj1._id==obj._id) {
                                            
                                                    obj1.NoOfAttempts = obj.NoOfAttempts;
                                                    return obj1;
                                                } else {
                                                    return obj1;
                                                }

                                            })
                                        });
                                //update Node
                        }             
            }
        
    },beforeSaveCell: (row,columnName,newValue,obj) => {
        row.change= false;
        row.oldvalue=row[columnName];
        if(row[columnName]!=newValue) {
            var  r =  confirm("Are you sure you want to update");

            if (r == true) {
                row.change = true;
            } else {
                row.change = false
            }
        }
    }};
     
        if(this.state.createTestReport){
            tablepreview.columnList[3].hidden =false;
        } else {
            tablepreview.columnList[3].hidden =true;
        }
        tablepreview.columnList[4].hidden =true;
        
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

        table.columnList = obj;
        table.exportCSV=false;
        table.deleteRow=false;
        table.insertRow=false;

           
        return (
            <div className={"panel"}> 
        <PlanningHeader  title={"Create Test Report"} headerRight={false} /> 
         <UIFieldsGeneral mapList={uiMap} />

            <div class="col-md-12" style={{"textAlign":"center","paddingTop":"20px"}} >
                <button class="btn btn-success" onClick={this.onSubmit} >Go!</button>
            </div>
            {this.state.showResults ? <BootstrapCustomTable table={table} data={this.state.data} /> : null }
            {!this.state.preview?
                        null
                        :
                        <div>
                            <UIFieldsGeneral mapList={uiMap2} />
                            <div className={"panel"}> 
                            <PlanningHeader  title={"Communication / Call Tree Details:"} headerRight={false} />
                            {this.state.createTestReport?<UIFieldsGeneral mapList={successMeasure} />:null}
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
                                
                                {!this.state.createTestReport?<button class="btn btn-primary" onClick={this.createTestReport} >Create Test Report</button>:<button class="btn btn-primary" onClick={this.saveAllchanges} >Save All Changes</button>}
                            </div>:<div style={{"textAlign":"center"}} ><span>No Data to Display</span></div>}
                        </div>
                        }

            </div>
        )
    }
}
export default CreateTestReport;
