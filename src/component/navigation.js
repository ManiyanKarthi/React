import React from 'react';
import {URLmapping} from './configurationdata';
import SopraSteriaLogo from './../image/soprasteria.png';
import SopraSteriaShrikLogo from './../image/soprasterialogo.png';
import { faHome ,faUser,faTags ,faSearch , faTools,faTasks , faAsterisk, faBook} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


class URLSubtab extends React.Component{

    constructor(props){
        super(props);
        this.state = {menubarstyle: props.menubarstyle, menuhover: props.menuhover, showsubmap:props.showsubmap ,currentoption: props.currentoption};
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ menubarstyle: nextProps.menubarstyle, menuhover: nextProps.menuhover, showsubmap: nextProps.showsubmap, currentoption: nextProps.currentoption});
    }

    render(){
        var submaplist = [];
        var styleObj = {};
        var classForChilren="menuChildrens";
        var currentoption = this.state.currentoption;
        if(this.state.showsubmap === "true"){
            classForChilren = "menuChildrens menuChildrensActive";
        }

        if(this.state.menubarstyle === "close" && this.state.menuhover === "out"){
            styleObj = { "display":"none" };
        }

        submaplist = this.props.submapping.map(function(submap, i){
            var activeClass = "";
            if(currentoption === submap.id){
                activeClass = "menuChildActive";
            }
            return <a key={i} className={"menuChild " + activeClass} href={submap.href}>
                <div className={"menuChildIconText"}>
                    {submap.icontext}
                </div>
                <div className={"menuChildText"} style={styleObj}>
                    {submap.text}
                </div>
            </a>;
        });

        return (
            <div className={classForChilren}>
                {submaplist}
            </div>
        );
    }    
}

class URLHeader extends React.Component{
    constructor(props){
        super(props);
        this.state = {mapping:props.mapping, menubarstyle: props.menubarstyle,currentoption: props.currentoption, showsubmap: "false"};
        this.menuOptionClick = this.menuOptionClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ menubarstyle: nextProps.menubarstyle, menuhover: nextProps.menuhover, currentoption: nextProps.currentoption });
    }

    menuOptionClick(){
        var flag = this.state.showsubmap;
        if(flag === "false"){
            this.setState({showsubmap: "true"});
        }
        else {
            this.setState({showsubmap: "false"});
        }
    }

    render(){
        var mapping = this.state.mapping;
        var styleObj = {};
        var tagList = [];
        var innertag = null;
        var activeClass = "";
        if(this.state.currentoption === mapping.id){
            activeClass = "menuOptionActive";
        }
        if(this.state.menubarstyle === "close" && this.state.menuhover === "out"){
            styleObj = { "display":"none" };
        }

        if(mapping.icon=="hotel") {
            tagList.push(<div className={"menuOptionIcon"} key={0}><FontAwesomeIcon icon={faHome} /></div>);
        } else if(mapping.icon=="search") {
            tagList.push(<div className={"menuOptionIcon"} key={0}><FontAwesomeIcon icon={faSearch} /></div>);
        } else if(mapping.icon=="tools") {
            tagList.push(<div className={"menuOptionIcon"} key={0}><FontAwesomeIcon icon={faTools} /></div>);
        } else if(mapping.icon=="tag") {
            tagList.push(<div className={"menuOptionIcon"} key={0}><FontAwesomeIcon icon={faTags} /></div>);
        } else if(mapping.icon=="tasks") {
            tagList.push(<div className={"menuOptionIcon"} key={0}><FontAwesomeIcon icon={faTasks} /></div>);
        } else if(mapping.icon=="solar-panel") {
            tagList.push(<div className={"menuOptionIcon"} key={0}><FontAwesomeIcon icon={faAsterisk} /></div>);
        } else if(mapping.icon=="book") {
            tagList.push(<div className={"menuOptionIcon"} key={0}><FontAwesomeIcon icon={faBook} /></div>);
        } else if(mapping.icon=="phone-volume") {
            tagList.push(<div className={"menuOptionIcon"} key={0}><FontAwesomeIcon icon={faUser} /></div>);
        } 
        
        
        tagList.push(<div className={"menuOptionText"} style={styleObj} key={1}> <span>{mapping.text}</span> </div>);

        if(mapping.mapping.length > 0){
            tagList.push(<div className={"menuOptionDownArrow"} style={styleObj} key={2}> 
                <i className={"fas fa-caret-down rotate180 " + (this.state.showsubmap === "true" ? "rotate180Active" : "")}/> 
            </div>);
            innertag = <div className="menuOption" onClick={this.menuOptionClick}> {tagList} </div>
        }
        else {
            innertag = <a className={"menuOption " + activeClass} href={mapping.href}>{tagList}</a>
        }
        return (<div>
                { innertag }
                <URLSubtab submapping={mapping.mapping} menubarstyle={this.state.menubarstyle} menuhover={this.state.menuhover} 
                    showsubmap={this.state.showsubmap} currentoption={this.state.currentoption}/>
            </div>);
    }
}

class URLHeaderList extends React.Component{
    constructor(props){
        super(props);
        var curoption = this.getCurrentOption();
        this.state = {"menubarstyle":this.props.menubarstyle, "currentoption": curoption, "menuhover": "out"};
        this.onMouseEnterListener = this.onMouseEnterListener.bind(this);
        this.onMouseLeaveListener = this.onMouseLeaveListener.bind(this);
        this.hashChangeListener = this.hashChangeListener.bind(this);
    }

    componentWillMount() {
        window.addEventListener("hashchange", this.hashChangeListener, false);
    }
  
    hashChangeListener(event){
        var curoption = this.getCurrentOption();
        this.setState({currentoption: curoption});
    }

    getCurrentOption(){
        var hash = window.location.hash;
        for(var i=0;i<this.props.urlmappinglist.length;i++){
            var mapping = this.props.urlmappinglist[i];
            if(mapping.href === hash){
                return mapping.id
            }
            for(var j=0;j<mapping.mapping.length;j++){
                var submap = mapping.mapping[j];
                if(submap.href === hash){
                    return submap.id;
                }
            }
        }
    }

    onMouseEnterListener(){
        this.setState({"menuhover":"in"});
    }
  
    onMouseLeaveListener(){
        this.setState({"menuhover":"out"});
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ menubarstyle: nextProps.menubarstyle });
    }

    render(){
        var categoryList = [];
        var styleMenu = {};
        var logoimage = <img src={SopraSteriaLogo} style={{height: "28px"}} alt={"HOME"}/>;
        if(this.state.menubarstyle === "close"){
            if(this.state.menuhover === "in"){
                styleMenu = { "width": this.props.sidemenuopenwidth +"px" };
            }
            else {
                logoimage = <img src={SopraSteriaShrikLogo} style={{height: "28px"}} alt={"HOME"}/>;
            }
        }
        for(var i=0;i<this.props.urlmappinglist.length;i++){
            categoryList.push(<URLHeader key={i} mapping={this.props.urlmappinglist[i]} menubarstyle={this.state.menubarstyle} 
                menuhover={this.state.menuhover} currentoption={this.state.currentoption}/>);
        }

        return (
            <div className={"menuContainer CustomeScroll"} style={styleMenu} onMouseEnter={this.onMouseEnterListener} onMouseLeave={this.onMouseLeaveListener}>
                <div>
                    <div style={{"textAlign":"center"}}>
                        {logoimage}
                    </div>
                    <hr className={"menuHRline"}/>
                </div>
                {categoryList}
            </div>
        );
    }
}

class NavigationContainer extends React.Component{
    constructor(props){
        super(props);
        var mapping = this.dynamicIdAllocate(URLmapping.mapping);
        
        this.state = { urlmapping: mapping, sidemenuwidth: props.sidemenuwidth };
    }

    dynamicIdAllocate(mapping){
        var mapoptionid = 1;
        for(var i in mapping){
            mapping[i].id = mapoptionid;
            mapoptionid++;
            for(var j in mapping[i].mapping){
                mapping[i].mapping[j].id = mapoptionid;
                mapoptionid++;
            }
        }
        return mapping;
    }

    render(){
        return (
            <URLHeaderList urlmappinglist={this.state.urlmapping} sidemenuwidth = {this.state.sidemenuwidth} menubarstyle={this.props.menubarstyle} 
                sidemenuopenwidth={this.props.sidemenuopenwidth}/>
        )
    }
}

export default NavigationContainer