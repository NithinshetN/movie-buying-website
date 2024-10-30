import { createElement } from "../utils/domUtils.js";
import { registrationComponent } from "./registrationComponent.js";
let message=document.querySelector(".message");
export const navbarComponent = (getMovieData) => {
    const navbar = createElement({ elementName: "nav", classNames: "navbar", attributes: [{ key: "id", value: "navbar" }] });
    const iconInfo = createElement({ elementName: "div",classNames:"iconInfo", innerHTML: `<i class="fa-solid fa-clapperboard"></i><h3>Play Movies</h3>` });

    const search = createElement({
        elementName: "div",
        classNames: "search",
        innerHTML: `<i class="fa-solid fa-magnifying-glass"></i>`,
        attributes: [{
            key: "id",
            value: "search"
        }]
    })

    const input = createElement({
        elementName: "input",
        attributes: [{
            key: "type",
            value: "text"
        }],
        eventListner: [{
            action: "keydown",
            operation: function (event) {
                    if (event.key === "Enter") {
                        console.log("Hello")
                        getMovieData(this.value);
                    }
            }
        }, {
            action: "input",
            operation: function () {
                if (this.value === "") {
                    getMovieData();
                }
            }
        }]
    })

    const logInbutton = createElement({
        elementName: "button",
        classNames: "btn btn-primary",
        innerText: "Log in",
        attributes: [{
            key: "id",
            value: "login"
        }, {
            key: "type",
            value: "button"
        }],
        eventListner: [{
            action: "click",
            operation: function () {
                // this.style.display = "none";
                message.style.display="flex";
                message.append(registrationComponent());
            }
        }]
    })

    const div=document.createElement("div");

    div.append(logInbutton);
    search.append(input);
    navbar.append(iconInfo,search,div);
    return navbar;
}