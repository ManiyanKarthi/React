import React from 'react';
import { Col ,Row} from 'react-bootstrap';
import PlanningHeader from './../common/planningHeader';
import UIFields from './../../component/uicomponent/UIFields';
import BootstrapCustomTable from './../../component/table';
import {GridColumnMapping} from './../../component/configurationdata';
import UIFieldsGeneral from './../../component/uicomponent/UIFieldsGeneral';
import {TableColumnMapping} from './../../component/configurationdata';

var testTypes = ["Communication-Testing","Table-Top-Testing","WAR-Testing","RC-Testing"];
var statuslst = ["All","Draft","ReviewPending","WaitingforRework","Approved"];

class ViewApprovedPlan extends React.Component{
constructor(props){
        super(props);
       this.onChangelocationvalue = this.onChangelocationvalue.bind(this);
        this.onChangeprojectvalue = this.onChangeprojectvalue.bind(this);
        this.onChangetypeOftest = this.onChangetypeOftest.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
       this.state= {status:"--Select--",showResults:false,typeoftest:"--Select--",locationvalue:"--Select--",projectvalue:"--Select--",locOptionlist:[],projectOptionlist:[],projectValidationError:false,locValidationError:false}

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
        
        if(this.props.location.search!=null){
            var url1 =  this.props.location.search;
            if(url1!=""){
                var objlst = url1.split("?")[1].split("&");
                var locationvalue = objlst[2].split("=")[1];
                var projectvalue = objlst[1].split("=")[1]
                var projectDetails = objlst[2].split("=")[1];
                var typeoftest = objlst[3].split("=")[1];
                this.getplanComments(locationvalue.replace(/%20/g, " "),projectvalue.replace(/%20/g, " "),typeoftest,projectDetails);
                this.getPreviewDatawithProject(objlst[0].split("=")[1],locationvalue.replace(/%20/g, " "),projectvalue.replace(/%20/g, " "));
            }
        }

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
        this.getplanComments(this.state.locationvalue,this.state.projectvalue,this.state.typeoftest,projectDetails);

    }

     getPreviewData = (projectDetails)=>{
        let fetchurl = '/testing/getCommunicationtestplanning?location='+this.state.locationvalue+'&project='+this.state.projectvalue+'&status=Approved'+'&projectDetails='+projectDetails+'&typeoftest='+this.state.typeoftest;
    
        fetch(fetchurl).then(res => res.json()).then(data =>{
                    this.setState({prviewData:data,preview:true,showResults:false,projectDetails:projectDetails});                                
            });
    }

    getPreviewDatawithProject = (projectDetails,locationvalue,projectvalue)=>{
        let fetchurl = '/testing/getCommunicationtestplanning?location='+locationvalue+'&project='+projectvalue+'&projectDetails='+projectDetails+'&typeoftest='+this.state.typeoftest;
    
        fetch(fetchurl).then(res => res.json()).then(data =>{
                    this.setState({prviewData:data,preview:true,showResults:false,projectDetails:projectDetails,locationvalue:locationvalue.replace(/%20/g, " "),projectvalue:projectvalue.replace(/%20/g, " ")});                                
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
                                constraintchampcomments:data[0].constraintchampcomments
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
                                constraintchampcomments:""
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
                                constraintchampcomments:""
                            });
        }

        
    }

        onSubmit = () => {

            let fetchurl = '/testing/getCommunicationtestplanning?location='+this.state.locationvalue+'&project='+this.state.projectvalue+'&typeoftest='+this.state.typeoftest;
                if(this.state.status!="All") {
                    fetchurl = fetchurl+'&status='+this.state.status
                }
           
             
            fetch(fetchurl).then(res => res.json()).then(data =>{
                        this.setState({data:data.map((obj) =>{
                            obj.testPlanDate = obj.planstartdateValue+' - '+obj.planenddateValue;
                           obj.projectDetails= obj.projectDetails;
                            return obj;
                        }),showResults:true,preview:false});                                
                });
                
        }

        dataFormatEvent1 = (obj)=> {
        return <a href={window.location.href.toString().replace(/^.*\/\/[^\/]+/, '')} onClick={this.handleClick} >{obj}</a>
    
    }

        dataFormatEvent = (obj,kk)=> {

            let urlnav =""
                 if(kk.status==="Draft"){
                     urlnav="#/testing/createtestplan";
                 } else if(kk.status==="ReviewPending"){
                     urlnav="#/testing/reviewtestplan";
                 } else if(kk.status==="WaitingforRework") {
                    urlnav="#/testing/modifytestplan";
                 } else if(kk.status==="Approved"){
                     urlnav="#/testing/viewapprovedplan";
                       return <a href={urlnav} onClick={() => {localStorage.setItem("locationvalue",kk.location);
                                                                 localStorage.setItem("projectvalue",kk.project);
                                                                    this.getPreviewData(kk.projectDetails);
                                                                    this.getplanComments(kk.location,kk.project,kk.typeoftest,kk.projectDetails);
                                                                  }} >{obj}</a>;
                 } 
     
                 if(urlnav==""){
                   return obj;
                 } else {
                     return <a href={urlnav+'?project='+kk.project+'&location='+kk.location+'&projectDetails='+kk.projectDetails+'&typeoftest='+kk.typeoftest}  >{obj}</a>
                 }
             
         }

        getcommunicationobj = (data)=> {
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

        
        tablepreview.insertRow =false;
        tablepreview.deleteRow =false;
        tablepreview.search = false;


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
                },{
                    fields:[{  
                        field:true, 
                        label:"Status:",
                        type:"select",
                        validateflag:false,
                        required:false,
                        value:this.state.status,
                        onChange:(ths) => { this.setState({
                            status:ths.currentTarget.value
                        });
                    },
                        selectList:statuslst
                    },{ field:false
                    },{ 
                        field:false 
                    }]
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
        <PlanningHeader  title={"View Test Plan"} headerRight={false} /> 
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
                            
                                {this.state.prviewData.length>0?null:<div style={{"textAlign":"center"}} ><span>No Data to Display</span></div>}
                        </div>
                        }

            </div>
        )
    }
}
export default ViewApprovedPlan;