import { createElement } from "../utils/domUtils.js"

let message = document.querySelector(".message");

export const modalComponent = (...args) => {
    message.style.display = "flex";
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
        innerHTML: args[0],
    }))


    const xButton = createElement({
        elementName: "button",
        innerHTML: `<i class="fa-solid fa-x"></i>`,
        classNames: "btn btn-danger cancel",
        attributes: [{
            key:"id",
            value:"remove"
        }],
        eventListner: [{
            action: "click",
            operation: function () {
                message.style.display = "none";
                popup.remove();
            }
        }]
    })

    const cancelButton = createElement({
        elementName: "button",
        innerText: "Cancel",
        classNames: "btn btn-danger cancel",
        eventListner: [{
            action: "click",
            operation: function () {
                message.style.display = "none";
                popup.remove();
            }
        }]
    })


 const continueButton = createElement({
        elementName: "button",
        innerText: "Continue",
        classNames: "btn btn-success",
        eventListner: [{
            action: "click",
            operation: function () {
                args[1](args[2]);
                message.style.display = "none";
                popup.remove();
            }
        }]
    })

    popup.append(xButton);
    popup.append(icon);
    popup.append(para);
    popup.append(cancelButton);
    popup.append(continueButton);

    message.append(popup);
}