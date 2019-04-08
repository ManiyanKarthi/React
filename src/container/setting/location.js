import React from 'react';
import BootstrapCustomTable from './../../component/table';
import {TableColumnMapping} from './../../component/configurationdata';
import fetchApi from './../../api/Api';

var fetchData;
var fetchurl;
class LocationTable extends React.Component{

constructor(props) {
    super(props);
    this.state = {};
        fetchData= this.fetchData.bind(this);

  }
   componentWillMount() {
       fetchData();
  }

    fetchData = ()=> {
        fetchurl = '/utility/getlocationdetails';

        fetch(fetchurl).then(res => res.json()).then(data =>{
                    this.setState({data:data}); 
                                
            })
  }

    render(){
      
        var table = {};

        table.columnList = TableColumnMapping.LocationTable;
        table.options = {
            exportCSVText: 'Export Location',
            deleteText: 'Delete Location',
            insertText:"Add Location",
            saveText: 'Save',
            closeText: 'Close',
            afterDeleteRow: function(rowKeys,obj) {
                alert('Location Deleted' );
                fetchurl='/utility/deletelocation';
                                  fetchApi(fetchurl,JSON.stringify(obj));
               
            },afterInsertRow: function(obj) {

                  fetchurl='/utility/addlocation';
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

             fetchurl='/utility/updatelocation';
                fetchApi(fetchurl,JSON.stringify(obj));

                   

        }};
        return (
            <div style={{"display":"realtive"}}>
                <BootstrapCustomTable table={table} data={this.state.data} />
                
            </div>
        )
    }
}

export default LocationTable