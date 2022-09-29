import React from 'react';
import {useEffect} from 'react';

export default function App() {
    useEffect(() => {
        const addBtn = document.querySelector(".add");
        const input = document.querySelector(".inp-group");

        function removeInput(){
	        this.parentElement.remove();
        }

function addInput() {
    const firstName = document.createElement("input");
    firstName.type = "text";
    firstName.placeholder = "Employee's First Name";
    
    const lastName = document.createElement("input");
    lastName.type = "text";
    lastName.placeholder = "Employee's Last Name";

    const email = document.createElement("input");
    email.type = "email";
    email.placeholder = "Employee's Email";

    const btn = document.createElement("a");
    btn.className = "delete";
    btn.innerHTML = "&times";
    
    btn.addEventListener("click", removeInput);
    
    const flex = document.createElement("div");
    flex.className = "flex";
    
    input.appendChild(flex);
    flex.appendChild(firstName);
    flex.appendChild(lastName);
    flex.appendChild(email);
    flex.appendChild(btn);
}
addBtn.addEventListener("click", addInput);


    }, []);
    return (
        <>
<div className="wrap">
      <h2>Generate KYE Link</h2> <a href="#" className="add">&plus;</a>
    </div>
    
    </>
    )
}

