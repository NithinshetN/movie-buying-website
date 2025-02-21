import { createElement } from "../utils/domUtils.js";
import { registrationComponent } from "./registrationComponent.js";
import { verifyToken } from "../services/authServices.js";
import { NotificationComponent } from "./notificationComponent.js";
import { HTML_ElEMENTS } from "../utils/config.js";


export const profileDrawer=(name)=>{

    const span = createElement({
        elementName: "span",
        innerHTML: `<i class="fa-solid fa-x"></i>`,
        eventListener: [{
            action: "click",
            operation: function (){
                this.parentElement.remove();
            }
        }]
    });

    const div=createElement({
        elementName:"div",
        classNames:"profileDrawer"
    })

    const profileInfo=createElement({
        elementName:"div",
        classNames:"profileInfo",
        innerHTML:`<i class="fa-solid fa-user"></i> ${name}`
    })

    const logOut=createElement({
        elementName:"div",
        classNames:"logout",
        innerHTML:`<i class="fa fa-sign-out" aria-hidden="true"></i> Log out`,
        eventListener:[{
            action:"click",
            operation:function(){
                sessionStorage.clear();
                setTimeout(()=>{
                    window.location.reload();
                },500)
            }
        }]
    })
    div.append(span,profileInfo,logOut)
    return div;
}


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
        eventListener: [{
            action: "keydown",
            operation: function (event) {
                    if (event.key === "Enter") {
                        HTML_ElEMENTS.mainContent.style.justifyContent="flex-start";
                        getMovieData(this.value);
                    }
            }
        }, {
            action: "input",
            operation: function () {
                if (this.value === "") {
                    HTML_ElEMENTS.mainContent.style.justifyContent="space-around";
                    getMovieData();
                }
            }
        },
        ]
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
        eventListener: [{
            action: "click",
            operation: function () {
                // this.style.display = "none";
                HTML_ElEMENTS.message.style.display="flex";
                HTML_ElEMENTS.message.append(registrationComponent());
            }
        }]
    })

    const profile=createElement({
        elementName:"div",
        classNames:"profile",
        innerHTML:`<i class="fa-solid fa-user"></i>`,
        eventListener:[{
            action:"click",
            operation:function(){
                if(HTML_ElEMENTS.mainContent.children[0].classList.contains("profileDrawer")){
                    HTML_ElEMENTS.mainContent.children[0].remove();
                }else{
                    HTML_ElEMENTS.mainContent.prepend(profileDrawer(this.value.username));
                }
            }
        }]
    })

    
    const div=document.createElement("div");


    (async()=>{
        try{
            const flag=await verifyToken();
            profile.value={username:flag.username,email:flag.email};
            if(flag.validation){
                div.append(profile);
            }else{
                div.append(logInbutton);
            }
        }catch(error){
            div.append(logInbutton);
            NotificationComponent("Sorry something went wrong",error.message);
        }
        
    })();

    search.append(input);
    navbar.append(iconInfo,search,div);
    

    return navbar;
}