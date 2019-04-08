import React from 'react';
import BootstrapCustomTable from './../../component/table';
import {TableColumnMapping} from './../../component/configurationdata';
import Projectlocation from './../common/projectlocation';
import PlanningHeader from './../common/planningHeader';
let fetchurl;
var fetchData;
import fetchApi from './../../api/Api';

class CommunicationPlan extends React.Component{

constructor(props) {
    super(props);
     var showResults=false;
    if((localStorage.getItem("locationvalue")!=null) && (localStorage.getItem("locationvalue")!="")){
        showResults=true;
    }
    this.state = {showResults:showResults,changestate:false};
    this.onSubmit = this.onSubmit.bind(this);
    fetchData = this.fetchData.bind(this);
  }
  componentWillMount() {
      fetchData();
  }

  
   fetchData = ()=> {
       var status;
         fetchurl = '/planning/getCommunicationPlan?location='+localStorage.getItem("locationvalue")+'&project='+localStorage.getItem("projectvalue");
        if(this.props.status!=null){
            status = this.props.status;
            fetchurl = '/planning/getCommunicationPlanDraft?location='+localStorage.getItem("locationvalue")+'&project='+localStorage.getItem("projectvalue")+'&status='+status;
        }
        fetch(fetchurl).then(res => res.json()).then(data =>{
                    this.setState({data:data}); 
                                
            })

  }
  
  onSubmit= (locationvalue,projectvalue) => {
        
        localStorage.setItem("locationvalue",locationvalue);
        localStorage.setItem("projectvalue",projectvalue);
           fetchData();
       this.setState({
           showResults:true
       })
    }

    render(){
      
        var table = {};
        table.data=[];
        table.columnList = TableColumnMapping.CommunicationPlan;
        if(this.props.addflag!=null) {
            table.insertRow = this.props.addflag;
        }
         var headerRight=true;
         if(this.props.headerRight!=null) {
            headerRight = this.props.headerRight;
        }
        if(this.props.changestate!=null && this.props.changestate && !(this.state.changestate)) {
            fetchData();
           this.setState({
               changestate:true
           });
        }
        table.options = {
            exportCSVText: 'Export CommunicationPlan',
            deleteText: 'Delete CommunicationPlan',
            insertText:"Add CommunicationPlan",
            saveText: 'Save',
            closeText: 'Close',
            afterDeleteRow: function(rowKeys,obj) {
                alert('CommunicationPlan  Deleted' );
                fetchurl = '/planning/deleteCommunicationPlan';

               fetchApi(fetchurl,JSON.stringify(obj));

            },afterInsertRow: function(obj) {

                   fetchurl = '/planning/addCommunicationPlan?location='+localStorage.getItem("locationvalue")+'&project='+localStorage.getItem("projectvalue");
                   fetch(fetchurl, {
                    method: 'POST',
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(obj)
                }).then(res => res.json()).then(data=> fetchData());
            }
        };
        table.selectRow = {mode: 'checkbox'}
        table.cellEdit = {mode: 'dbclick',blurToSave: true,afterSaveCell: (obj,columnName,newValue) => { 
               if(obj.oldvalue!=newValue) {
                            if(!obj.change){
                                obj[columnName]=obj.oldvalue
                            } else {
                                 if(obj.change){
                                    delete obj.change
                                }
                                                fetchurl = '/planning/updateCommunicationPlan';

                     fetchApi(fetchurl,JSON.stringify(obj));

                            }}

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
        return (
            <div style={{"display":"realtive"}}>
                    {this.state.showResults? <PlanningHeader  title={"Communication Plan"} headerRight={headerRight} /> : null}
                    <div style={{"padding":"15px"}}>
                        {this.state.showResults ? <BootstrapCustomTable table={table} data={this.state.data} /> : <Projectlocation  onSubmit={this.onSubmit} /> }
                    </div>
            </div>
        )
    }
}

export default CommunicationPlan;