// Dynamic Field Creation with javascript
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

// Local Storage fields tracking
/*
localStorage.setItem("lastname", "Smith");
localStorage.getItem("lastname");
*/


// Admin Dashboard
const html = document.documentElement;
const body = document.body;
const menuLinks = document.querySelectorAll(".admin-menu a");
const collapseBtn = document.querySelector(".admin-menu .collapse-btn");
const toggleMobileMenu = document.querySelector(".toggle-mob-menu");
const switchInput = document.querySelector(".switch input");
const switchLabel = document.querySelector(".switch label");
const switchLabelText = switchLabel.querySelector("span:last-child");
const collapsedClass = "collapsed";
const lightModeClass = "light-mode";
const darkModeClass = "dark-mode";

/*TOGGLE HEADER STATE*/
collapseBtn.addEventListener("click", function() {
    body.classList.toggle(collapsedClass);
    this.getAttribute("aria-expanded") == "true" ?
        this.setAttribute("aria-expanded", "false") :
        this.setAttribute("aria-expanded", "true");
    this.getAttribute("aria-label") == "collapse menu" ?
        this.setAttribute("aria-label", "expand menu") :
        this.setAttribute("aria-label", "collapse menu");
});

/*TOGGLE MOBILE MENU*/
toggleMobileMenu.addEventListener("click", function() {
    body.classList.toggle("mob-menu-opened");
    this.getAttribute("aria-expanded") == "true" ?
        this.setAttribute("aria-expanded", "false") :
        this.setAttribute("aria-expanded", "true");
    this.getAttribute("aria-label") == "open menu" ?
        this.setAttribute("aria-label", "close menu") :
        this.setAttribute("aria-label", "open menu");
});

/*SHOW TOOLTIP ON MENU LINK HOVER*/
for (const link of menuLinks) {
    link.addEventListener("mouseenter", function() {
        if (
            body.classList.contains(collapsedClass) &&
            window.matchMedia("(min-width: 768px)").matches
        ) {
            const tooltip = this.querySelector("span").textContent;
            this.setAttribute("title", tooltip);
        } else {
            this.removeAttribute("title");
        }
    });
}

/*TOGGLE LIGHT/DARK MODE*/
if (localStorage.getItem("dark-mode") === "false") {
    html.classList.add(lightModeClass);
    switchInput.checked = false;
    switchLabelText.textContent = "Light";
}
if (localStorage.getItem("dark-mode") === "true") {
    html.classList.add(darkModeClass);
}

switchInput.addEventListener("input", function() {
    html.classList.toggle(lightModeClass);
    html.classList.toggle(darkModeClass);
    if (html.classList.contains(lightModeClass)) {
        switchLabelText.textContent = "Light";
        localStorage.setItem("dark-mode", "false");
    } else {
        switchLabelText.textContent = "Dark";
        localStorage.setItem("dark-mode", "true");
    }
});