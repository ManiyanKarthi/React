import React from 'react';
import { Col } from 'react-bootstrap';


class Projectlocation extends React.Component{
 constructor(props){
        super(props);
       this.onChangelocationvalue = this.onChangelocationvalue.bind(this);
        this.onChangeprojectvalue = this.onChangeprojectvalue.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
          this.onchangestatus = this.onchangestatus.bind(this);
       this.state= {locationvalue:"--Select--",projectvalue:"--Select--",locOptionlist:[],projectOptionlist:[],projectValidationError:false,locValidationError:false,status:"--Select--",statuslist:["Draft","Review Pending","WaitingforRework","Approved"]}

    }
 componentWillMount() {
        fetch('/utility/getprojectdetails').then(res => res.json()).then(data =>{

                this.props.all?data.push("All"):null;

                   this.setState({projectOptionlist:data.map(function(obj){
                      if(obj=="All"){
                           return obj
                      } else {
                           return obj.projectName+"-"+obj.id
                      }
            })}); 
                                
        })
        
         fetch('/utility/getlocationdetails').then(res => res.json()).then(data =>{

                         this.props.all?data.push("All"):null;
                   this.setState({locOptionlist:data.map(function(obj){
                        if(obj=="All"){
                                return obj
                            } else {
                                return obj.location+"-"+obj.id
                            }
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

    onchangestatus = (ths)=> {
                this.setState({
                    status:ths.currentTarget.value
                }); 
        }

        onSubmit = () => {
             if(this.state.projectvalue=="--Select--"){
                this.setState({
                    projectValidationError:true
                })
            } else if(this.state.locationvalue==="--Select--"){
                this.setState({
                    projectValidationError:false,
                   locValidationError:true
                })
            } else {
                    this.props.onSubmit(this.state.locationvalue,this.state.projectvalue,this.state.status)
            }
                
        }

    render(){
           
        return (
            <div className={"panel text-center"}> 
                <div className={"form-group"} >
                
                    <label className={"control-label col-sm-2 col-md-3"} style={{"fontWeight": "bold"}} >Project Name <span style={{"color": "red"}}>*</span> </label> 
                        <select  style={{ borderColor: this.state.projectValidationError ? "#b94a48" : "#aaa"}}  className={"col-sm-10 col-md-6"} value={this.state.projectvalue} onChange={this.onChangeprojectvalue} >
                             <option>--Select--</option>
                            {this.state.projectOptionlist.map((res,i) => {
                               return <option key={i} >{res}</option>
                            })}
                        </select>
               
                </div>
                  <div className={"form-group"} >
                        <label className={"control-label col-sm-2 col-md-3"} style={{"fontWeight": "bold"}} >Location<span style={{"color": "red"}}>*</span> </label> 
                        <select style={{ borderColor: this.state.locValidationError ? "#b94a48" : "#aaa"}}  className={"col-sm-10 col-md-6 "} value={this.state.locationvalue} onChange={this.onChangelocationvalue} >
                            <option>--Select--</option>
                            {this.state.locOptionlist.map((res,i) => {
                               return <option key={i} >{res}</option>
                            })}
                        </select>
               
                  </div>
                  {this.props.status?<div className={"form-group"} >
                        <label className={"control-label col-sm-2 col-md-3"} style={{"fontWeight": "bold"}} >Status</label> 
                        <select style={{ borderColor: this.state.locValidationError ? "#b94a48" : "#aaa"}}  className={"col-sm-10 col-md-6 "} value={this.state.status} onChange={this.onchangestatus} >
                            <option>--Select--</option>
                            {this.state.statuslist.map((res,i) => {
                               return <option key={i} >{res}</option>
                            })}
                        </select>
               
                  </div>:null}
                  <div className={"form-group"} >
                  <div class={"col-sm-offset-2 col-sm-10 text-center"}>
                        <button type="submit" class={"btn btn-primary btn-md"} onClick={this.onSubmit} >Submit</button>
                    </div>
                   </div>
            </div>
        )
    }
}

export default Projectlocation;