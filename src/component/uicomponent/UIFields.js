import React from 'react';
import UISelect from './UISelect'
import UITextArea from './UITextArea'
import UIDatePicker from './UIDatePicker';
import UILabel from './UILabel'
import UIText from './UIText'

class UIFields extends React.Component {


    renderSwitch(param,value,validateflag,onChange,selectList) {
        switch(param) {
           
            case 'select':
            return <UISelect validateflag={validateflag} value={value}   onChange={onChange} selectList={selectList} />;
            case 'textArea':
            return <UITextArea validateflag={validateflag} value={value}   onChange={onChange}  />;
             case 'DatePicker':
            return <UIDatePicker validateflag={validateflag} value={value}   onChange={onChange}  />;
             case 'text':
            return <UIText validateflag={validateflag} value={value}   onChange={onChange}  />;
            default:
            return <UILabel value={value}   onChange={onChange}  />;
        }
}

    render() {

        return (
                <div class="row" style={{"paddingTop":"20px"}} >
                        <div class="col-md-2 control-label">{this.props.f1field ?
                            <label style={{"fontWeight": "bold"}} >{this.props.f1label} {this.props.f1required?<span style={{"color": "red"}}>*</span>:null} </label> :
                            null
                        }                           
                        </div>
                        <div class={"col-md-2"}>
                            {this.props.f1field ?
                                        this.renderSwitch(this.props.f1type,this.props.f1value,this.props.f1validateflag,this.props.f1onChange,this.props.f1selectList)
                            :null}
                        </div>
                        <div class="col-md-2 control-label">  {this.props.f2field ?<label style={{"fontWeight": "bold"}} >{this.props.f2label} {this.props.f2required?<span style={{"color": "red"}}>*</span>:null} </label> :null}
                        </div>
                        <div class="col-md-2">
                            {this.props.f2field ?
                                        this.renderSwitch(this.props.f2type,this.props.f2value,this.props.f2validateflag,this.props.f2onChange,this.props.f2selectList)
                            :null}
                           
                        </div>
                        <div class="col-md-2 control-label">{this.props.f3field ?<label style={{"fontWeight": "bold"}} >{this.props.f3label} {this.props.f3required?<span style={{"color": "red"}}>*</span>:null} </label> :null}
                        </div>
                        <div class="col-md-2">
                            {this.props.f3field ?
                                        this.renderSwitch(this.props.f3type,this.props.f3value,this.props.f3validateflag,this.props.f3onChange,this.props.f3selectList)
                            :null}
                        </div>
                </div>   
        )
    }

}


export default UIFields; 