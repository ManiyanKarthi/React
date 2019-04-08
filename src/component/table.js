import React from 'react';
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import '../css/app.css'
class BootstrapCustomTable extends React.Component{

    constructor(props){
        super(props);

    var table = { insertRow:true,deleteRow:true,search:true, multiColumnSearch:true, pagination:true, exportCSV:true, version:"4"};

        this.state = {table: Object.assign({}, table, props.table)};

        if(this.state.table.columnList){
            var keypresent = false;
            this.state.table.columnList.map((element, i) => {
                if(element.isKey === true){
                    keypresent = true;
                }
                return null;
            });
            if(keypresent === false){
                this.state.table.columnList.push({"dataField": "hiddenKey","dataTitle" : "id", "isKey":true, hidden:true});
                this.state.table.data.map((element, i) => {
                    element["hiddenKey"] = i;
                    return null;
                })
            }
        }
    }

     componentDidMount() {
       // this.setState({ table:  Object.assign({},{insertRow:true,deleteRow:true,search:true, multiColumnSearch:true, pagination:true, exportCSV:true, version:"4"}, this.props.table)});
    }

    

    render(){
        
        var headerList = [];
            
        headerList = this.state.table.columnList.map((element, i) => {

            if(element.dataFormat){
            return <TableHeaderColumn key={i} isKey={element.isKey===true?true:false}  thStyle={{ whiteSpace: 'normal',"wordWrap":"break-word"}}  
                    hidden={element.hidden===true?true:false}
                    dataSort={element.isKey===true?true:false}
                    dataField={element.dataField}
                    editable={element.editable} dataFormat={element.dataFormatClick} >
                {element.dataTitle}
            </TableHeaderColumn>
            } else {
                 return <TableHeaderColumn key={i} isKey={element.isKey===true?true:false}  thStyle={{ whiteSpace: 'normal',"wordWrap":"break-word"}}  
                    hidden={element.hidden===true?true:false}
                    dataSort={element.isKey===true?true:false}
                    dataField={element.dataField}
                    editable={element.editable}  >
                {element.dataTitle}
            </TableHeaderColumn>
            }
           
        })


        return (
            <BootstrapTable striped scrollX data={this.props.data} 
                        options={this.state.table.options}
                        insertRow={this.state.table.insertRow}
                        deleteRow={this.state.table.deleteRow}
                        selectRow={this.state.table.selectRow}
                        search={this.state.table.search} 
                        multiColumnSearch={ this.state.table.multiColumnSearch}
                        pagination={this.state.table.pagination}
                        cellEdit={this.state.table.cellEdit}
                        exportCSV={this.state.table.exportCSV}
                        version={this.state.table.version}>
                        {
                            headerList
                        }
            </BootstrapTable>
        )
    }

}

export default BootstrapCustomTable