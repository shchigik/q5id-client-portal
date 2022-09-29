import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link
} from "react-router-dom";

import KyeDashboard from "./pages/kye-dashboard";
import KycDashboard from "./pages/kyc-dashboard";

import KYELogo from "./img/svg/q5id_logo_reverse.svg";
import KYELogoSmall from "./img/svg/q5id_logo_small_reverse.svg";
import HelpSvg from "./img/svg/help_dash-01.svg";
import LogoutSvg from "./img/svg/logout-01.svg";
import KYE from "./img/svg/kye-01.svg";
import KYC from "./img/svg/kyc-01.svg";


import {
  IdleTimerProvider,
  IdleTimerConsumer,
  IIdleTimerContext,
  IdleTimerContext,
  useIdleTimerContext,
} from "react-idle-timer";
import Amplify, { Auth, Hub } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "./aws-exports";
Amplify.configure(awsExports);



const onIdle = (e) => {
  signOut();

};


class UserList extends Component {

  render() {

      return (
        
        // <Authenticator slot="sign-in" hideSignUp>
        <Router>
          <div className="container">
          <div className="header">
                  <div className="logo_container">
                    <img className="main_logo" src={KYELogo} />
                    <img className="small_logo" src={KYELogoSmall} />
                  </div>
                  <nav>
                    <ul>
                    <li className="bold">
                        <Link to="/kye-dashboard"><img src={KYE} /><span>KYE Dashboard</span></Link>
                      </li>
                      <li className="bold">
                      <Link to="/kyc-dashboard"><img src={KYC} /><span>KYC Dashboard</span></Link>
                      </li>
                      <li className="nav_bottom_list">
                        <a href="mailto:sales@q5id.com" title="Help"><img src={HelpSvg} /><span>Help</span></a>
                      </li>
                      <li className="bold">
                        <button title="Sign Out" onClick={signOut}><img src={LogoutSvg} /><span>Sign out</span></button>
                      </li>
                    </ul>
                  </nav>
                  
                </div>
            <Routes>
            <Route path="/kye-dashboard" exact element={<KyeDashboard />} />
            <Route path="/kyc-dashboard" exact element={<KycDashboard />} />
          </Routes>
          </div>
          
          </Router>
         // </Authenticator>
      );
  }
}
export default UserList;

Auth.currentSession().then(user => console.log(user));

async function signOut() {
  try {
    await Auth.signOut();
  } catch (error) {
    console.log("error signing out: ", error);
  }
}



setTimeout(function () {
  signOut();
}, 4000);



