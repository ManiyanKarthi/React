import React from 'react';
import PlanningHeader from './../common/planningHeader';
import UIFields from './../../component/uicomponent/UIFields';
import BootstrapCustomTable from './../../component/table';
import {GridColumnMapping} from './../../component/configurationdata';
import UIFieldsGeneral from './../../component/uicomponent/UIFieldsGeneral';

var testTypes = ["Communication Testing","Table Top Testing","WAR Testing","RC Testing"];

class ViewTestReport extends React.Component{
constructor(props){
        super(props);
       this.onChangelocationvalue = this.onChangelocationvalue.bind(this);
        this.onChangeprojectvalue = this.onChangeprojectvalue.bind(this);
        this.onChangetypeOftest = this.onChangetypeOftest.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
       this.state= {showResults:false,typeoftest:"--Select--",locationvalue:"--Select--",projectvalue:"--Select--",locOptionlist:[],projectOptionlist:[],projectValidationError:false,locValidationError:false}

    }
 componentWillMount() {
        fetch('/utility/getprojectdetails').then(res => res.json()).then(data =>{
            
                   this.setState({projectOptionlist:data.map(function(obj){
                return obj.projectName+" - "+obj.id
            })}); 
                                
        })
        
         fetch('/utility/getlocationdetails').then(res => res.json()).then(data =>{
                   this.setState({locOptionlist:data.map(function(obj){
                return obj.location+" - "+obj.id
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

        onSubmit = () => {
                this.setState({showResults:true});
                
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

                 var table = {};
        table.data=[];
        table.columnList = GridColumnMapping.ReviewTestPlan;
        table.exportCSV=false;
        table.deleteRow=false;
        table.insertRow=false;

           
        return (
            <div className={"panel"}> 
        <PlanningHeader  title={"View Test Report"} headerRight={false} /> 
         <UIFieldsGeneral mapList={uiMap} />

            <div class="col-md-12" style={{"textAlign":"center","paddingTop":"20px"}} >
                <button class="btn btn-success" onClick={this.onSubmit} >Go!</button>
            </div>
            {this.state.showResults ? <BootstrapCustomTable table={table} data={this.state.data} /> : null }

            </div>
        )
    }
}

export default ViewTestReport;
