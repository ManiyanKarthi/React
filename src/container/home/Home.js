import React from 'react';
import './Home.css';

import BcpLogo from './BCP.jpg'; 

class Home extends React.Component{
    render(){

        localStorage.removeItem("locationvalue");
        localStorage.removeItem("projectvalue");
        return (
            <div className={"panel"}> 
                <div>
                    <img src={BcpLogo} style = {{"width":"100%"}} alt={"Home page"}></img>
                </div>
                <div className = {"display-style"}>
                    <mark>What is a business continuity plan? </mark>
                    <p>Business continuity planning (BCP) is the creation of a
                        strategy through the recognition of threats and risks facing a
                        company, with an eye to ensure that personnel and assets are
                        protected and able to function in the event of a disaster.</p>
                    <mark>Why do we have a business continuity plan?</mark>
                    <p>Business continuity is a proactive plan to avoid and mitigate
                        risks associated with a disruption of operations. It details steps
                        to be taken before, during and after an event to maintain the
                        financial viability of an organization. Disaster recovery is a
                        reactive plan for responding after an event.</p>
                </div>
            </div>
        )
    }
}

export default Home;