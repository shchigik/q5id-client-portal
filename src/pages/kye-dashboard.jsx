import React, { Component } from "react";

const pageTitle = "KYE Dashboard";

class KyeDashboard extends Component {

    constructor(props){
        super(props);
    
        this.state = {
          users: [],
          isLoaded: false,
        };
      }

    componentDidMount() {
        // let intervalID = setInterval(() => {
        fetch("http://localhost:8080/user/")
          .then((res) => res.json())
          .then((json) => {
            this.setState({
              isLoaded: true,
              users: json,
            });
          });
        // }, 10000);
      }

      render() {
        const { isLoaded, users } = this.state;
        let inviteStatus;
    
        
    
        if (!isLoaded) {
          return <div> loading ... </div>;
        } else {
          return (                
                <div className="dashboard_container">
                  <div className="top_bar">
                    <div className="page_title">
                      <div className="hamburger_toggle" onClick={hamburgerToggle} >
                        <span className="hamburger_icon"></span>
                      </div>
                      <h3>KYE Dashboard</h3>
                    </div>
                  <div className="profile_avatar">
                    <img src={users.icon_url} width="50" height="50" />
                    <h3>
                      {users.company_name}
                    </h3>
                  </div>
                  </div>
    
                  <div>
                    <table>
                    <tbody>
                      <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Date Created</th>
                        <th>Date Expires</th>
                        <th>Status</th>
                        <th>Re-Send</th>
                      </tr>
                      {users.kyerequests.map((key_invlines) => {
                        if (key_invlines.status === 1) {
                          inviteStatus = "Pending";
                        }
                        if (key_invlines.status === 2) {
                          inviteStatus = "Passed";
                        }
                        if (key_invlines.status === 3) {
                          inviteStatus = "Expired";
                        }
                        if (key_invlines.status === 4) {
                          inviteStatus = "Denied";
                        }
                        return (
                          <tr>
                            <td>{key_invlines.first_name}</td>
                            <td>{key_invlines.last_name}</td>
                            <td>{key_invlines.email}</td>
                            <td>{key_invlines.date_created}</td>
                            <td>{key_invlines.date_expires}</td>
                            <td><span className={inviteStatus} title={inviteStatus}></span></td>
                            <td>
                              <a href="#">Send</a>
                            </td>
                          </tr>
                        );
                      })}
                      </tbody>
                    </table>
                    <div className="wrap">
                      <a href="#" className="add new_kye_invite" title="Create new Invite" onClick={addRequest}>+</a>
                    </div>
                    
                  </div>
                  <div className="invite_wrap">
                  <div className="inp-group">
                  </div>
                </div>
                </div>
                
                
          );
        }
      }

}async function hamburgerToggle(){
    const mainContainer =  await document.querySelector("body .container");
    if(!mainContainer.classList.contains("open_nav")){
      mainContainer.classList.add('open_nav');
    }else{
      mainContainer.classList.toggle('open_nav');
    }
  }

async function addRequest() {
    const input =  await document.querySelector(".inp-group");
    const inputWrap =  await document.querySelector(".invite_wrap");

    async function removeInput(){
    this.parentNode.remove();
    // console.log(this.before);
    await inputWrap.classList.remove('active');
    }

    async function sendKyeInvite(){
      const allInputs =  await document.querySelectorAll("input:not([type='submit'])");

      let alertMessage = 'You entered ';
      await allInputs.forEach(input =>{
        switch (input.dataset.invite) {
          case "firstName":
            alertMessage += `first name "${input.value}", `;
            break;
          case "lastName":
            alertMessage += `last name "${input.value}", `;
            break;
          case "email":
            alertMessage += `and email "${input.value}".`;
        }
      })
      alert(alertMessage);
      }

    if(input.childNodes.length === 0){
      inputWrap.classList.add('active');

      

      const firstName =  document.createElement("input");
      firstName.type = "text";
      firstName.setAttribute("data-invite", "firstName");
      firstName.required = true;
      firstName.placeholder = "first name";
      
      const lastName = document.createElement("input");
      lastName.type = "text";
      lastName.setAttribute("data-invite", "lastName");
      lastName.required = true;
      lastName.placeholder = "last name";
    
      const email = document.createElement("input");
      email.type = "email";
      email.setAttribute("data-invite", "email");
      email.required = true;
      email.pattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
      email.placeholder = "email";
    
      const btn = document.createElement("a");
      btn.className = "delete";
      btn.innerHTML = "&times";

      const sendInvite = document.createElement("input");
      const sendInviteWrap = document.createElement("div");
      sendInvite.type = "submit";
      sendInvite.disabled = true;
      sendInviteWrap.className = "sendInvite";
      sendInvite.innerHTML = "Send Invite";
      sendInviteWrap.appendChild(sendInvite);
      // console.log({sendInvite});
      
      btn.addEventListener("click", removeInput);
      
      const flex =  document.createElement("form");
      flex.className = "flex";
      // flex.setAttribute("method", "post");

      const KYEInviteTextWrap =  document.createElement("div");
      const KYEInviteTextWrapInner =  document.createElement("div");
      KYEInviteTextWrapInner.className = "invite_text_inner";
      const KYEInviteText =  document.createElement("h3");
      KYEInviteText.innerHTML = "New Invite";
      const KYEInviteTextSub =  document.createElement("p");
      KYEInviteTextSub.innerHTML = "Fill out the form and send verification request to your employee";
      KYEInviteTextWrap.appendChild(KYEInviteTextWrapInner);
      KYEInviteTextWrapInner.appendChild(KYEInviteText);
      KYEInviteTextWrapInner.appendChild(KYEInviteTextSub);

      const inviteWraper = document.createElement("div");
      inviteWraper.className = "invite_outer_wraper";

      input.appendChild(inviteWraper);
      inviteWraper.appendChild(KYEInviteTextWrap);
      inviteWraper.appendChild(btn);
      inviteWraper.appendChild(flex);
      flex.appendChild(firstName);
      flex.appendChild(lastName);
      flex.appendChild(email);
      flex.appendChild(sendInviteWrap);

      flex.addEventListener("change",() => {
        sendInvite.disabled = !flex.checkValidity();
    })
    sendInvite.addEventListener("click", sendKyeInvite);
      
    }else{
      inputWrap.classList.remove('active');
      await document.querySelector(".inp-group > div").remove();
    }

}

export default KyeDashboard;
