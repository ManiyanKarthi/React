import React from 'react';
import BootstrapCustomTable from './../../component/table';
import {TableColumnMapping} from './../../component/configurationdata';
import Projectlocation from './../common/projectlocation';
import PlanningHeader from './../common/planningHeader';
import fetchApi from './../../api/Api';

let fetchurl;
var fetchData;
class RecoveryObjectives extends React.Component{

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
         fetchurl = '/planning/getRecoveryObjectives?location='+localStorage.getItem("locationvalue")+'&project='+localStorage.getItem("projectvalue");
        if(this.props.status!=null){
            status = this.props.status;
            fetchurl = '/planning/getRecoveryObjectivesDraft?location='+localStorage.getItem("locationvalue")+'&project='+localStorage.getItem("projectvalue")+'&status='+status;
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
        table.columnList = TableColumnMapping.RecoveryObjectives;
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
            exportCSVText: 'Export RecoveryObjectives',
            deleteText: 'Delete RecoveryObjectives',
            insertText:"Add RecoveryObjectives",
            saveText: 'Save',
            closeText: 'Close',
            afterDeleteRow: function(rowKeys,obj) {
                alert('RecoveryObjectives Deleted' );
                fetchurl = '/planning/deleteRecoveryObjectives';
                fetchApi(fetchurl,JSON.stringify(obj));

            },afterInsertRow: function(obj) {

                 fetchurl = '/planning/addRecoveryObjectives?location='+localStorage.getItem("locationvalue")+'&project='+localStorage.getItem("projectvalue");

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
                                fetchurl = '/planning/updateRecoveryObjectives';
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
                
                    {this.state.showResults? <PlanningHeader  title={"Recovery Objectives"} headerRight={headerRight} /> : null}
                    <div style={{"padding":"15px"}}>
                        {this.state.showResults ? <BootstrapCustomTable table={table} data={this.state.data} />  : <Projectlocation  onSubmit={this.onSubmit} /> }
                    </div>
            </div>
        )
    }
}

export default RecoveryObjectives;