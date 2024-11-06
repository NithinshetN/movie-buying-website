import { createElement } from "../utils/domUtils.js";
import { NotificationComponent } from "./notificationComponent.js";
import { signup } from "../services/authServices.js";
import { HTML_ElEMENTS } from "../utils/config.js";

export const signupComponent = () => {
    const loginDiv = createElement({
        elementName: "div",
        classNames: "register signup"
    })

    const heading = createElement({
        elementName: "div",
        classNames: "heading",
        innerHTML: "<h2>Create an account</h2>"
    })

    const username = createElement({
        elementName: "input",
        attributes: [{
            key: "type",
            value: "text"
        }, {
            key: "placeholder",
            value: "Username"
        }]
    });

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
        innerHTML: `<i class="fa-solid fa-eye" style="z-index:1;"></i>`,
        attributes: [{
            key: "type",
            value: "password"
        }, {
            key: "placeholder",
            value: "Password"
        }]
    })

    const confirmPassword = createElement({
        elementName: "input",
        attributes: [{
            key: "type",
            value: "password"
        },
        {
            key: "placeholder",
            value: "Confirm Password"
        }]
    });

    const para = createElement({
        elementName: "p",
        innerText: "Already have an account?"
    });

    const span = createElement({
        elementName: "span",
        innerHTML: "<u>Login</u>",
        eventListener: [{
            action: "click",
            operation: function () {
                loginDiv.style.display = "none";
                loginDiv.parentElement.childNodes[0].style.display = "flex";
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
                    confirmPassword.type = "text";
                    this.innerText = "Hide password"
                } else{
                    password.type = "password";
                    confirmPassword.type = "password";
                    this.innerText = "Show password"
                }

            }
        }]
    })
    showPassword.style.cursor = "pointer";
    const submit = createElement({
        elementName: "button",
        classNames: "btn btn-primary",
        innerText: "Create account",
        eventListener: [{
            action: "click",
            operation: async function () {
                if (password.value !== confirmPassword.value) {
                    NotificationComponent("password and confirm password does not match", "Error");
                    return;
                }
                const credentials = {
                    username: username.value,
                    admin: false,
                    email: email.value,
                    password: password.value,
                    ordersBought: [],
                    ordersRented: []
                }
                try {
                    const token = await signup(credentials)
                    sessionStorage.setItem("token", token.token);
                    NotificationComponent("User Created Succesfully", "Sign up");
                    loginDiv.parentElement.parentElement.remove();
                    HTML_ElEMENTS.message.style.display = "none";
                    setTimeout(()=>{
                        window.location.reload();
                    },1000)
                } catch (error) {
                    NotificationComponent(error.message, "Error")
                }
            }
        }]
    })
    para.appendChild(span);
    loginDiv.append(heading, username, email, password, confirmPassword, showPassword, para, submit);
    return loginDiv;
}