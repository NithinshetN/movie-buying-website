import { createElement } from "../utils/domUtils.js";
import { NotificationComponent } from "./notificationComponent.js";
import { login } from "../services/authServices.js";
import { HTML_ElEMENTS } from "../utils/config.js";

export const loginComponent = () => {
    const loginDiv = createElement({
        elementName: "div",
        classNames: "register"
    })

    const heading = createElement({
        elementName: "div",
        classNames: "heading",
        innerHTML: "<h2>Log in</h2>"
    })

    const email = createElement({
        elementName: "input",
        attributes: [{
            key: "type",
            value: "email"
        }, {
            key: "placeholder",
            value: "Email"
        }]
    });

    const password = createElement({
        elementName: "input",
        attributes: [{
            key: "type",
            value: "password"
        }, {
            key: "placeholder",
            value: "Password"
        }]
    })

    const submit = createElement({
        elementName: "button",
        classNames: "btn btn-primary",
        innerText: "Log in",
        eventListener: [{
            action: "click",
            operation: async function () {
                try {
                    if (email.length) {
                        NotificationComponent("email is empty");
                        return;
                    }
                    if (password.length) {
                        NotificationComponent("Password is empty");
                        return;
                    }
                    const credentials = {
                        email: email.value,
                        password: password.value
                    }
                    const token = await login(credentials)
                    sessionStorage.setItem("token", token.token);
                    NotificationComponent("Login succesfull", "Login");
                    loginDiv.parentElement.parentElement.remove();
                    HTML_ElEMENTS.message.style.display = "none";
                    setTimeout(()=>{
                        window.location.reload();
                    },1000)
                } catch (error) {
                    NotificationComponent(error.message, "Error");
                }

            }
        }]
    })

    const showPassword = createElement({
        elementName: "p",
        innerText: "Show password",
        eventListener: [{
            action: "click",
            operation: function () {
                if (password.type === "password") {
                    password.type = "text";
                    this.innerText = "Hide password"
                } else {
                    password.type = "password";
                    this.innerText = "Show password"
                }

            }
        }]
    })
    showPassword.style.cursor = "pointer";

    const span = createElement({
        elementName: "span",
        innerHTML: `<u>Sign up</u>`,
        eventListener: [{
            action: "click",
            operation: function () {
                loginDiv.style.display = "none";
                loginDiv.parentElement.childNodes[1].style.display = "flex";
            }
        }]
    })
    const para = createElement({
        elementName: "p",
        innerText: "New to Play movies?"
    })
    para.appendChild(span);
    loginDiv.append(heading, email, password, showPassword, submit, para);
    return loginDiv;

}