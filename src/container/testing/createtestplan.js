import React from 'react';
import { Col ,Row} from 'react-bootstrap';
import PlanningHeader from './../common/planningHeader';
import UIFields from './../../component/uicomponent/UIFields';
import UIFieldsGeneral from './../../component/uicomponent/UIFieldsGeneral';
import {formatAMPM} from './../../component/common/common';
import './../../css/app.css';
import BootstrapCustomTable from './../../component/table';
import {TableColumnMapping,monthNames} from './../../component/configurationdata';
import fetchApi from './../../api/Api';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

var testTypes = ["Communication Testing","Table Top Testing","WAR Testing","RC Testing"];
var gridData;
var removeData;
var getPreviewData;


class MyVerticallyCenteredModal extends React.Component {

    constructor(props){
        super(props);
       this.state= {gridData:[],primaryTester:"",secondaryTester:"",primarytestervalue:"",primaryTesterLst:[],secondaryTesterLst:[],selctedgridData:[],planstartdateValue:new Date(),planenddateValue:new Date()}
       gridData = this.gridData.bind(this);
       removeData =this.removeData.bind(this);
       this.addData=this.addData.bind(this);

    }
    componentWillReceiveProps() {
        this.setState({
            selctedgridData:[]
        })
    }
    componentWillMount() {
             
        fetch('/utility/getemployeedetails').then(res => res.json()).then(data =>{
            
            this.setState({gridData: data}); 
                            
        })

            fetch('/utility/getemployeedetails?role=Tester').then(res => res.json()).then(data =>{
                var objList = data.map(function(obj){
                    var newObject ={
                                keyvalue:obj.id,
                                value:obj.fName+","+obj.lName
                            };
                        return newObject;
                    });
                this.setState({primaryTesterLst: objList,secondaryTesterLst: objList}); 
                                    
                })

        }
        
    
    onChangeprimaryTester = (ths)=> {

        this.setState({
                primarytestervalue:ths.currentTarget.selectedOptions[0].innerText+'('+ths.currentTarget.value+')',
                primaryTester:ths.currentTarget.value
            });
    }

      onChangesecondaryTester = (ths)=> {
        this.setState({
                secondaryTestervalue:ths.currentTarget.selectedOptions[0].innerText+'('+ths.currentTarget.value+')',
                secondaryTester:ths.currentTarget.value
            });
    } 

      gridData = (obj) =>{
              let array = this.state.selctedgridData;
          
                 this.setState({
                    selctedgridData:[...array,obj]
                });
            
        
    }

      removeData = (obj) => {
             let array = this.state.selctedgridData;
            var index = array.indexOf(obj)
       
            if (index !== -1) {
                array.splice(index, 1);
            }
             this.setState({
                    selctedgridData:[...array]
                });
    }

    addData = () =>{

    this.props.onHide(this.state.primarytestervalue,this.state.primarytestervalue,this.state.planstartdateValue,this.state.planenddateValue,this.state.selctedgridData);

    }


  render() {
       var uiMap2 = [{
                    fields:[{ 
                        field:true,
                        label:"Primary Tester:",
                        validateflag:false,
                        required:false,
                        type:"select",
                        value:this.state.primaryTester,
                        onChange:this.onChangeprimaryTester,
                        selectList:this.state.primaryTesterLst
                    },{  
                        field:true,
                        label:"Secondary Tester:",
                        type:"select",
                        validateflag:false,
                        required:false,
                        value:this.state.secondaryTester,
                        onChange:this.onChangesecondaryTester,
                        selectList:this.state.secondaryTesterLst
                    },{ 
                        field:true, 
                        label:"Plan Start Time:",
                        type:"DatePicker",
                        validateflag:false,
                        required:false,
                        value:this.state.planstartdateValue,
                        onChange: (ths)=> {
                            this.setState({
                                    planstartdateValue:ths
                                });
                        },
                        selectList:[]
                    } ]
                },{
                    fields:[{ 
                        field:true,
                        label:"Plan End Time:",
                        validateflag:false,
                        required:false,
                        type:"DatePicker",
                        value:this.state.planenddateValue,
                        onChange:(ths)=> {
                            this.setState({
                                    planenddateValue:ths
                                });
                        },
                        selectList:[]
                    },{  
                        field:false
                    },{ 
                        field:false
                    }]
                }];

       var table = {};
        table.data=[];
        table.columnList = TableColumnMapping.CommCallTreewithoutContacted;
        table.exportCSV = false;

        table.insertRow = false;
        table.deleteRow = false;
        table.selectRow = {mode: 'checkbox',onSelect:(obj,selected)=>{
            
            if(selected){
                gridData(obj);
            } else {
                removeData(obj);
            }
           

        },onSelectAll:(selected,obj)=>{
           if(selected){
               this.setState({selctedgridData:obj});
            } else {
                this.setState({selctedgridData:[]});
            }

        }}

    return (
      <Modal
        {...this.props}
        size="lg"
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Add Communication / Call Tree Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
                <UIFieldsGeneral mapList={uiMap2} />
            <div style={{"padding":"15px","display":"realtive"}}>
                <label style={{"fontWeight":"bold"}} > Select an employee: </label>
                <BootstrapCustomTable table={table} data={this.state.gridData} />
            </div>
            </div> 
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.addData}>Save</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}


class CreateTestPlan extends React.Component{
constructor(props){
        super(props);
        this.onChangelocationvalue = this.onChangelocationvalue.bind(this);
        this.onChangeprojectvalue = this.onChangeprojectvalue.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangetypeOftest = this.onChangetypeOftest.bind(this);
        gridData = this.gridData.bind(this);
        removeData =this.removeData.bind(this);
        getPreviewData = this.getPreviewData.bind(this);
        this.getplanComments=this.getplanComments.bind(this);
       this.state= {modalShow: false,plancomments:[],preview:false,gridData:[],selctedgridData:[],secondaryTesterLst:[],primaryTesterLst:[],typeoftest:"--Select--",planstartdateValue:new Date(),planenddateValue:new Date(),locationvalue:"--Select--",projectvalue:"--Select--",locOptionlist:[],projectOptionlist:[]}

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
            

    fetch('/utility/getemployeedetails').then(res => res.json()).then(data =>{
        
        this.setState({gridData: data}); 
                        
    })

        fetch('/utility/getemployeedetails?role=Tester').then(res => res.json()).then(data =>{
            var objList = data.map(function(obj){
                 var newObject ={
                            keyvalue:obj.id,
                            value:obj.fName+","+obj.lName
                        };
                    return newObject;
                });
             this.setState({primaryTesterLst: objList,secondaryTesterLst: objList}); 
                                
            })

    }

    onChangelocationvalue = (ths)=> {
            this.setState({
                locationvalue:ths.currentTarget.value
            });
        this.getplanComments(ths.currentTarget.value,this.state.projectvalue);
          
    }

    onChangeprojectvalue = (ths)=> {
        this.setState({
            projectvalue:ths.currentTarget.value
        });
        
        this.getplanComments(this.state.locationvalue,ths.currentTarget.value);
       
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
                            });
                    } else {
                        this.setState({
                                plancomments:data,
                                inscope:"",
                                outOfscope:"",
                                risk:"",
                                dependency:"",
                                constraints:"",
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
                            });
        }

        
    }

    onChangeDate = (ths)=> {
         this.setState({
                planstartdateValue:ths
            });
    }
  onChangeEndDate = (ths)=> {
         this.setState({
                planenddateValue:ths
            });
    }
    
    gridData = (obj) =>{
              let array = this.state.selctedgridData;
          
                 this.setState({
                    selctedgridData:[...array,obj]
                });
            
        
    }

    removeData = (obj) => {
             let array = this.state.selctedgridData;
            var index = array.indexOf(obj)
       
            if (index !== -1) {
                array.splice(index, 1);
            }
             this.setState({
                    selctedgridData:[...array]
                });
    }

     onChangetypeOftest = (ths)=> {
        this.setState({
                typeoftest:ths.currentTarget.value
            });

    }

    onChangeInscope = (ths)=> {
        this.setState({
                inscope:ths.currentTarget.value
            });

    }

    onChangeOutOfscope = (ths)=> {
        this.setState({
                outOfscope:ths.currentTarget.value
            });

    }

    onChangeConstraint = (ths)=> {
        this.setState({
                constraints:ths.currentTarget.value
            });

    }

    onChangeRisk = (ths)=> {
        this.setState({
                risk:ths.currentTarget.value
            });

    }
    onChangedependency = (ths)=> {
        this.setState({
                dependency:ths.currentTarget.value
            });

    }

    onChangesecondaryTester = (ths)=> {
        this.setState({
                secondaryTestervalue:ths.currentTarget.selectedOptions[0].innerText+'('+ths.currentTarget.value+')',
                secondaryTester:ths.currentTarget.value
            });
    } 

    onChangeprimaryTester = (ths)=> {

        this.setState({
                primarytestervalue:ths.currentTarget.selectedOptions[0].innerText+'('+ths.currentTarget.value+')',
                primaryTester:ths.currentTarget.value
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


    submitforApproval = (ths)=>{

        let json = {
                project:this.state.projectvalue,
                location:this.state.locationvalue,
                inscope:this.state.inscope,
                outOfscope:this.state.outOfscope,
                risk:this.state.risk,
                dependency:this.state.dependency,
                constraints:this.state.constraints,
            }

         if(this.state.plancomments.length===0){

            fetchurl = '/testing/addtestplancomments';
                fetchApi(fetchurl,JSON.stringify(json));
         } else {
              fetchurl = '/testing/updatetestplancomments?_id='+this.state.plancomments[0]._id;
                fetchApi(fetchurl,JSON.stringify(json));
         }


           let fetchurl = '/testing/updatetestplanstatus?location='+this.state.locationvalue+'&project='+this.state.projectvalue+'&status=Draft';
                fetchApi(fetchurl,JSON.stringify({status:'ReviewPending'}));
               getPreviewData();
    }

    getPreviewData = ()=>{
        let fetchurl = '/testing/getCommunicationtestplanning?location='+this.state.locationvalue+'&project='+this.state.projectvalue+'&status=Draft'+'&typeoftest='+this.state.typeoftest;
    
        fetch(fetchurl).then(res => res.json()).then(data =>{
                    this.setState({prviewData:data,preview:true});                                
            });
    }

  handleShow=() => {
    this.setState({ modalShow: true });
  }

    render(){

            let modalClose = (primaryTester,secTester,planstartDate,planEndDate,selctedgridData) => {
                                if(primaryTester){
                                     var json = {
                                        project:this.state.projectvalue,
                                        location:this.state.locationvalue,
                                        typeoftest:this.state.typeoftest,
                                        planstartdateValue:formatAMPM(new Date(planstartDate)),
                                        planenddateValue:formatAMPM(new Date(planEndDate)),
                                        primaryTester:primaryTester,
                                        secondaryTester:secTester,
                                        projectDetails:this.state.projectvalue.toString().split("-")[1].trim()+'_'+this.state.locationvalue.toString().split("-")[1].trim()+'_'+monthNames[new Date(this.state.planstartdateValue).getMonth()]+'_'+new Date(this.state.planstartdateValue).getFullYear(),
                                        employeeData:selctedgridData.map((ths,i)=>{
                                            return {id:ths.id,username:ths.username,primaryNumber:ths.primaryNumber};
                                        })
                                        ,status:"Draft"
                                    }

                                        let fetchurl = '/testing/addtestplan';

                                        if(json.employeeData.length>0){

                                            fetchApi(fetchurl,JSON.stringify(json));
                                        }
                                        getPreviewData();
                                }
                               
                         this.setState({ modalShow: false });
            };

        var table = {};
        table.data=[];
        table.columnList = TableColumnMapping.CommunicationCallTreeDetails;
        table.exportCSV = false;

        table.insertRow = false;
        table.deleteRow = false;
        table.selectRow = {mode: 'checkbox',onSelect:(obj,selected)=>{
            
            if(selected){
                gridData(obj);
            } else {
                removeData(obj);
            }
           

        },onSelectAll:(selected,obj)=>{
           if(selected){
               this.setState({selctedgridData:obj});
            } else {
                this.setState({selctedgridData:[]});
            }

        }}

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
                getPreviewData();

            }
        };
        tablepreview.insertRow =false;
        tablepreview.deleteRow =true;
        tablepreview.selectRow = {mode: 'checkbox'}
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
                        label:"In scope:",
                        validateflag:false,
                        required:false,
                        type:"textArea",
                        value:this.state.inscope,
                        onChange:this.onChangeInscope,
                        selectList:[]
                    },{  
                        field:true,
                        label:"Out of scope:",
                        type:"textArea",
                        validateflag:false,
                        required:false,
                        value:this.state.outOfscope,
                        onChange:this.onChangeOutOfscope,
                        selectList:[]
                    },{ 
                        field:true, 
                        label:"Risk:",
                        type:"textArea",
                        validateflag:false,
                        required:false,
                        value:this.state.risk,
                        onChange:this.onChangeRisk,
                        selectList:[]
                    } ]
                },{
                    fields:[{ 
                        field:true,
                        label:"Dependencies:",
                        validateflag:false,
                        required:false,
                        type:"textArea",
                        value:this.state.dependency,
                        onChange:this.onChangedependency,
                        selectList:[]
                    },{  
                        field:true,
                        label:"Constraints:",
                        type:"textArea",
                        validateflag:false,
                        required:false,
                        value:this.state.constraints,
                        onChange:this.onChangeConstraint,
                        selectList:[]
                    },{  
                        field:false
                    } ]
                }];
           

        return (
           
            <div className={"panel"}> 
                 <MyVerticallyCenteredModal
                    show={this.state.modalShow}
                    onHide={modalClose}
                    />
                   
                    <PlanningHeader  title={"Create Test Plan"} headerRight={false} /> 
                   
                    <UIFieldsGeneral mapList={uiMap} />

                <div class="col-md-12" style={{"textAlign":"center","paddingTop": "20px"}}>
                    <button class="btn btn-success" onClick={this.getPreviewData} >Preview</button>
                </div>
                <div className={"panel"}> 
                        
                        {!this.state.preview?
                            null
                        :
                        <div>
                            <div class="row">
                                <div class="col-md-3.6">
                                        <PlanningHeader  title={"Communication / Call Tree Details:"} headerRight={false} /> 
                                </div>
                                <div class="col-md-6"  style={{"paddingLeft": "20px"}} >
                                            <Button variant="primary" onClick={this.handleShow}>
                                            Add
                                            </Button>
                                </div> 
                            </div>  
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
                            {this.state.prviewData.length>0?<div class="col-md-12" style={{"textAlign":"center"}}>
                                <button class="btn btn-success" onClick={this.submitforApproval} >Submit for Approval</button>
                            </div>:<div style={{"textAlign":"center"}} ><span>No Data to Display</span></div>}
                        </div>
                        }
                </div>   
            </div>
        )
    }
}

export default CreateTestPlan;