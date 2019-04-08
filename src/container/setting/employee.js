import React from 'react';
import BootstrapCustomTable from './../../component/table';
import {TableColumnMapping} from './../../component/configurationdata';
import fetchApi from './../../api/Api';

var fetchData;
var fetchurl;

class EmployeeTable extends React.Component{

constructor(props) {
    super(props);
    this.state = {};
    fetchData= this.fetchData.bind(this);
  }
  componentWillMount() {
       fetchData();
  }

    fetchData = ()=> {
        fetchurl = '/utility/getemployeedetails';

        fetch(fetchurl).then(res => res.json()).then(data =>{
                    this.setState({data:data}); 
                                
            })
     }

    render(){
      
        var table = {};

        table.columnList = TableColumnMapping.EmployeeTable;
        table.columnList[5].editable =  {type: 'select', options: { values: ['Admin','Tester']}} ;
        table.options = {
            exportCSVText: 'Export Employees',
            deleteText: 'Delete Employee',
            insertText:"Add Critical Employee",
            saveText: 'Save',
            closeText: 'Close',
            afterDeleteRow: function(rowKeys,obj) {
                alert('Employee Deleted' );
                                  fetchurl='/utility/deleteemployee';
                                  fetchApi(fetchurl,JSON.stringify(obj));


            },afterInsertRow: function(obj) {

                  fetchurl='/utility/addemployee';
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

              fetchurl='/utility/updateemployee';
                fetchApi(fetchurl,JSON.stringify(obj));

        


        }};
        return (
            <div style={{"display":"realtive"}}>
                <BootstrapCustomTable table={table} data={this.state.data} />
                
            </div>
        )
    }
}

export default EmployeeTable