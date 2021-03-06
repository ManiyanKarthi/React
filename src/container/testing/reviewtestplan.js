import React from 'react';
import { Col ,Row} from 'react-bootstrap';
import PlanningHeader from './../common/planningHeader';
import UIFields from './../../component/uicomponent/UIFields';
import BootstrapCustomTable from './../../component/table';
import {GridColumnMapping} from './../../component/configurationdata';
import UIFieldsGeneral from './../../component/uicomponent/UIFieldsGeneral';
import {TableColumnMapping} from './../../component/configurationdata';
import fetchApi from './../../api/Api';

var testTypes = ["Communication-Testing","Table-Top-Testing","WAR-Testing","RC-Testing"];
var getPreviewData;

class ReviewTestPlan extends React.Component{
constructor(props){
        super(props);
       this.onChangelocationvalue = this.onChangelocationvalue.bind(this);
        this.onChangeprojectvalue = this.onChangeprojectvalue.bind(this);
        this.onChangetypeOftest = this.onChangetypeOftest.bind(this);
        getPreviewData = this.getPreviewData.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
       this.state= {allData:[],showResults:false,typeoftest:"--Select--",locationvalue:"--Select--",projectvalue:"--Select--",locOptionlist:[],projectOptionlist:[],projectValidationError:false,locValidationError:false}

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
                    var locationvalue = objlst[1].split("=")[1];
                    var projectvalue = objlst[0].split("=")[1];
                    var projectDetails = objlst[2].split("=")[1];
                    var typeoftest = objlst[3].split("=")[1];
                    this.setState({
                        locationvalue:locationvalue.replace(/%20/g, " "),
                        projectvalue:projectvalue.replace(/%20/g, " "),
                        typeoftest:typeoftest.replace(/%20/g, " ")
                    });
                    this.getplanComments(locationvalue.replace(/%20/g, " "),projectvalue.replace(/%20/g, " "),typeoftest.replace(/%20/g, " "),projectDetails);
                    this.getPreviewwithProjectandtypeofTest(projectDetails.replace(/%20/g, " "),typeoftest.replace(/%20/g, " "));
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
    dataFormatEvent = (obj)=> {
        return <a href={window.location.href.toString().replace(/^.*\/\/[^\/]+/, '')} onClick={this.handleClick} >{obj}</a>
    
    }

    handleClick = (obj) => {
        let projectDetails=obj.currentTarget.innerText;

        
        this.getPreviewData(obj.currentTarget.innerText);

        this.getplanComments(this.state.locationvalue,this.state.projectvalue,this.state.typeoftest,projectDetails);

    }

    getPreviewData = (projectDetails)=>{
        let fetchurl = '/testing/getCommunicationtestplanning?location='+this.state.locationvalue+'&project='+this.state.projectvalue+'&status=ReviewPending'+'&projectDetails='+projectDetails+'&typeoftest='+this.state.typeoftest;

        fetch(fetchurl).then(res => res.json()).then(data =>{
                    this.setState({prviewData:data,preview:true,showResults:false,projectDetails:projectDetails});                                
            });
    }

    getPreviewwithProjectandtypeofTest = (projectDetails,typeoftest)=>{
        let fetchurl = '/testing/getCommunicationtestplanning?status=ReviewPending'+'&projectDetails='+projectDetails+'&typeoftest='+typeoftest;
    
        fetch(fetchurl).then(res => res.json()).then(data =>{
                    this.setState({prviewData:data,preview:true,showResults:false,projectDetails:projectDetails});                                
            });
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

        onSubmit = () => {

             let fetchurl = '/testing/getCommunicationtestplanning?location='+this.state.locationvalue+'&project='+this.state.projectvalue+'&status=ReviewPending'+'&typeoftest='+this.state.typeoftest;
            
            this.getplanComments(this.state.locationvalue,this.state.projectvalue);

            fetch(fetchurl).then(res => res.json()).then(data =>{
                        this.setState({allData:data,data:data.map((obj) =>{
                            obj.testPlanDate = obj.planstartdateValue+' - '+obj.planenddateValue;
                           obj.projectDetails= obj.projectDetails;
                            return obj;
                        }),showResults:true,preview:false});    
                                                    
                });
                
        }

        sendComments= () => {

              let fetchurl = '/testing/updatetestplanstatus?location='+this.state.locationvalue+'&project='+this.state.projectvalue+'&status=ReviewPending&projectDetails='+this.state.projectDetails;
                fetchApi(fetchurl,JSON.stringify({status:'WaitingforRework'}));
                getPreviewData(this.state.projectDetails)
                this.updateReviewComments();
        } 

        updateReviewComments = () => {
            var fetchurl=null;
            let json = {
                project:this.state.projectvalue,
                location:this.state.locationvalue,
                typeoftest:this.state.typeoftest,
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

        submitforApproval = () => {

             let fetchurl = '/testing/updatetestplanstatus?location='+this.state.locationvalue+'&project='+this.state.projectvalue+'&status=ReviewPending&projectDetails='+this.state.projectDetails;
                fetchApi(fetchurl,JSON.stringify({status:'Approved',reportstatus:'Pending'})).then(() => {
                    getPreviewData(this.state.projectDetails);
                    this.updateReviewComments();

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


    render(){

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

        var tablepreview = {};

        tablepreview.data=[];
        tablepreview.columnList = TableColumnMapping.CommunicationCallTreeDetails;
        tablepreview.exportCSV = false;

        tablepreview.options = {
            deleteText: 'Remove',
            onDeleteRow: (rowKeys,obj) =>{

            obj.map((obj) => {

                  var deleteObj = obj;
                let deleteId = obj._id;

                

            this.setState({
                prviewData:this.state.prviewData.map((obj)=>{
                    
                    if(obj._id==deleteId) {
                            let array = obj.employeeData;
                            var index = array.indexOf(deleteObj)
                    
                            if (index !== -1) {
                                array.splice(index, 1);
                            }
                            obj.employeeData = array;

                            if(obj.employeeData.length==0){
                                    let fetchurl = '/testing/removecommunicationDetails';

                                    fetchApi(fetchurl,JSON.stringify(obj));
                            } else {
                                let fetchurl = '/testing/updatecommunicationDetails';

                                    fetchApi(fetchurl,JSON.stringify(obj));
                            }

                        return obj;
                    } else {
                        return obj;
                    }

                })
            })
            })
               

                getPreviewData(this.state.projectDetails);

            }
        };
        tablepreview.insertRow =false;
        tablepreview.deleteRow =true;
        tablepreview.selectRow = {mode: 'checkbox'}
        tablepreview.search = false;


           
        return (
            <div className={"panel"}> 
        <PlanningHeader  title={"Review Test Plan"} headerRight={false} /> 
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
                            
                                {this.state.prviewData.length>0?<div class="col-md-12" style={{"textAlign":"center"}}>
                                
                                <button class="btn btn-success" onClick={() =>{this.updateReviewComments(); alert("Saved Successfully") }} >Save</button>
                                <button class="btn btn-warning" onClick={this.sendComments} >Send Comments</button>
                                <button class="btn btn-success" onClick={this.submitforApproval} >Approve</button>
                            </div>:<div style={{"textAlign":"center"}} ><span>No Data to Display</span></div>}
                        </div>
                        }

            </div>
        )
    }
}
export default ReviewTestPlan;