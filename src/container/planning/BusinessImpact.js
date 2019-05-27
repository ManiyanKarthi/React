import React from 'react';
import BootstrapCustomTable from './../../component/table';
import {TableColumnMapping,TableReferenceMapping} from './../../component/configurationdata';
import Projectlocation from './../common/projectlocation';
import PlanningHeader from './../common/planningHeader';
import fetchApi from './../../api/Api';


let fetchurl;
var fetchData;

class BusinessImpact extends React.Component{

constructor(props) {
    super(props);
   
    if((localStorage.getItem("locationvalue")!=null) && (localStorage.getItem("locationvalue")!="")){

        this.state = {showResults:true,changestate:false};
    } else {
        this.state = {showResults:false,changestate:false};
    }

    this.onSubmit = this.onSubmit.bind(this);
        fetchData = this.fetchData.bind(this);

  }

  componentWillMount() {
        fetchData();
  }


   fetchData = ()=> {
       fetchurl = '/planning/getbusinessimpact?location='+localStorage.getItem("locationvalue")+'&project='+localStorage.getItem("projectvalue");
        if(this.props.status!=null){
            fetchurl = '/planning/getbusinessimpactDraft?location='+localStorage.getItem("locationvalue")+'&project='+localStorage.getItem("projectvalue")+'&status='+this.props.status;
        }

        fetch(fetchurl).then(res => res.json()).then(data =>{
                    this.setState({data:data}); 
                                
            })

  }


  onSubmit= (locationvalue,projectvalue) => {
        
        localStorage.setItem("locationvalue",locationvalue);
        localStorage.setItem("projectvalue",projectvalue);
          this.fetchData();

       this.setState({
           showResults:true
       })
    }

    componentWillReceiveProps(){
         if(this.props.fetchdata!=null && this.props.fetchdata) {
            if((localStorage.getItem("locationvalue")!=null) && (localStorage.getItem("locationvalue")!="")){
                this.setState({
                    showResults:true
                })
            }
                this.fetchData();
        }
          if(this.props.changestate!=null && this.props.changestate && !(this.state.changestate)) {
            fetchData();
           this.setState({
               changestate:true
           });
        }
        
    }

    render(){
      
        var table = {};
        table.data=[];
        table.columnList = TableColumnMapping.BussinessImpact;
        if(this.props.addflag!=null) {
            table.insertRow = this.props.addflag;
        }
         if(this.props.deleteflag!=null) {
            table.deleteRow = this.props.deleteflag;
        }
        var headerRight=true;
         if(this.props.headerRight!=null) {
            headerRight = this.props.headerRight;
        }
        
        table.columnList[table.columnList.length-1].hidden=true;
        table.columnList[table.columnList.length-1].editable=false;
        table.columnList[table.columnList.length-2].hidden=true;
        table.columnList[table.columnList.length-2].editable=false;

         if(this.props.status!=null) {
                if(this.props.status=="WaitingforRework") {
                    table.columnList[table.columnList.length-1].hidden=false;
                    table.columnList[table.columnList.length-1].editable={type:'textarea'};
                     table.columnList[table.columnList.length-2].hidden=false;
                    table.columnList[table.columnList.length-2].editable=false;
                } else if(this.props.status=="Review Pending") {
                    table.columnList[table.columnList.length-1].hidden=false;
                    table.columnList[table.columnList.length-1].editable=false;
                     table.columnList[table.columnList.length-2].hidden=false;
                    table.columnList[table.columnList.length-2].editable={type:'textarea'};
                } 
        }
       

       
        

        table.columnList[1].editable =  {type: 'select', options: { values:TableReferenceMapping.BusinessimpactTime}} ;
        table.options = {
            exportCSVText: 'Export BusinessImpact',
            deleteText: 'Delete BusinessImpact',
            insertText:"Add BusinessImpact",
            saveText: 'Save',
            closeText: 'Close',
            afterDeleteRow: function(rowKeys,obj) {
                
                    fetchurl = '/planning/deletebusinessimpact';

              fetchApi(fetchurl,JSON.stringify(obj)).then(()=>{alert('BusinessImpact  Deleted' ); });

            },afterInsertRow: function(obj) {
                fetchurl = '/planning/addbusinessimpact?location='+localStorage.getItem("locationvalue")+'&project='+localStorage.getItem("projectvalue");

                fetchApi(fetchurl,JSON.stringify(obj)).then(data=> fetchData());

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
                                fetchurl="/planning/updatebusinessimpact"
                              fetchApi(fetchurl,JSON.stringify(obj));
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
        return (
            <div style={{"display":"realtive"}}>
                    {this.state.showResults? <PlanningHeader  title={"Bussiness Impact"} headerRight={headerRight} /> : null}
                    <div style={{"padding":"15px"}}>
                        {this.state.showResults ? <BootstrapCustomTable table={table} data={this.state.data} /> : this.props.fetchdata!=null && this.props.fetchdata ?null:<Projectlocation  onSubmit={this.onSubmit} /> }
                    </div>
            </div>
        )
    }
}

export default BusinessImpact;