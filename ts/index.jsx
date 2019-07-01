import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { render } from 'react-dom';
import {BrowserRouter, Router, Route, Switch} from 'react-router-dom';
import { store } from "./store.jsx";
// import {TaxLotsContainer, MMEAdminContainer, AdminContainer,PerformanceContainer,ReportContainer,
// ConfirmContainer, StatementContainer, ClientReportContainer,AlertsContainer, IsOptionsContainer, 
// IndexContainer, UserContainer, FirmContainer, StyleContainer} from './container/mainContainer';
import {IndexContainer} from './container/mainContainer';
import LoginContainer from './container/loginContainer';
import SignInSide from './container/loginContainer';


const routing = () => (
	<BrowserRouter>
		<Switch> 
            <Route exact path="/demo/"     render={(props) => <SignInSide {...props} /> } />
            <Route exact path="/demo/Home"     render={(props) => <IndexContainer {...props} /> } />

           
    	</Switch>
    </BrowserRouter>
    
);

ReactDOM.render(routing(),document.getElementById("root"));

