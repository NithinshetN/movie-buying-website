//banner notification
import { HTML_ElEMENTS } from "../utils/config.js";
import { createElement } from "../utils/domUtils.js";

export const NotificationComponent = (message, heading) => {
    const bannerNotification = createElement({
        elementName: "div",
        classNames: "banner-notification",
        eventListener: [{
            action: "mouseover",
            operation: function () {
                span.style.display = "block";
            }
        },
        {
            action: "mouseout",
            operation: function () {
                span.style.display = "none";
            }
        }
        ]
    });
    const notificationPara = createElement({ elementName: "p", innerHTML: message });

    const cssFucntion = () => {
        bannerNotification.style.animation = "notificationOut 0.1s ease-out"
        bannerNotification.style.transform = `translateX(110%)`;
        setTimeout(() => {
            bannerNotification.remove();
        }, 200)
    }
    const span = createElement({
        elementName: "span",
        innerHTML: `<i class="fa-solid fa-x"></i>`,
        eventListener: [{
            action: "click",
            operation: cssFucntion
        }]
    });

    const header = createElement({ elementName: "h5", innerText: heading });

    setTimeout(() => {
        cssFucntion();
    }, 5000)

    if (heading) bannerNotification.append(header)
    bannerNotification.appendChild(span);
    bannerNotification.appendChild(notificationPara);
    HTML_ElEMENTS.bannerContainer.appendChild(bannerNotification);
}