import { HTML_ElEMENTS } from "../utils/config.js";
import { createElement } from "../utils/domUtils.js"

export const modalComponent = ({innerdata="",functionComponent="",data={}}) => {
    HTML_ElEMENTS.message.style.display = "flex";
    const popup = createElement({
        elementName: "div",
        classNames: "popup"
    });
    
    const icon = createElement({
        elementName: "i",
        classNames: "fa-regular fa-circle-check",
        attributes: [{
            key:"id",
            value:"tick"
        }]
    });

    const para = createElement(({
        elementName: "p",
        innerHTML: innerdata,
    }))


    const xButton = createElement({
        elementName: "button",
        innerHTML: `<i class="fa-solid fa-x"></i>`,
        classNames: "btn btn-danger cancel",
        attributes: [{
            key:"id",
            value:"remove"
        }],
        eventListener: [{
            action: "click",
            operation: function () {
                HTML_ElEMENTS.message.style.display = "none";
                popup.remove();
            }
        }]
    })

    const cancelButton = createElement({
        elementName: "button",
        innerText: "Cancel",
        classNames: "btn btn-danger cancel",
        eventListener: [{
            action: "click",
            operation: function () {
                HTML_ElEMENTS.message.style.display = "none";
                popup.remove();
            }
        }]
    })


 const continueButton = createElement({
        elementName: "button",
        innerText: "Continue",
        classNames: "btn btn-success",
        eventListener: [{
            action: "click",
            operation: function () {
                functionComponent(data);
                HTML_ElEMENTS.message.style.display = "none";
                popup.remove();
            }
        }]
    })

    popup.append(xButton,icon,para,cancelButton,continueButton);
    HTML_ElEMENTS.message.append(popup);
}