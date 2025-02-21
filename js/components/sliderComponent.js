import { createElement } from "../utils/domUtils.js";
export const sliderContainer = () => {
    let images = ["https://www.justwatch.com/images/poster/320834237/s332/the-penguin.webp", "https://www.justwatch.com/images/poster/318387357/s332/deadpool-3.webp", "https://www.justwatch.com/images/poster/317138629/s332/kill-2024.webp", "https://www.justwatch.com/images/poster/120172701/s332/tumbbad.webp", "https://www.justwatch.com/images/poster/87721747/s332/marvels-daredevil.webp"];
    
    //Creating slider container element
    let slideContainer = createElement({
        elementName: "div",
        classNames: "slider-container"
    });

    //Creating the para html element to remove the slider login/signup container
    let para = createElement({
        elementName: "p",
        classNames: "back",
        innerHTML: `Back to website <i class="fa-solid fa-arrow-right"></i>`,
        eventListener: [{
            action: "click",
            operation: function () {
                slideContainer.parentElement.parentElement.style.display = "none";
                slideContainer.parentElement.remove();
            }
        }]
    })
    let i = 1;

    //creating the image tag for slider-container
    let image0 = createElement({
        elementName: "img",
        classNames: "coverImageTag",
        attributes: [{
            key: "src",
            value: images[0]
        }]
    })

    //appending para and image to slider-container
    slideContainer.append(para, image0);
    function carousel(val, timeout) {

        //Creating seconde image element for carousol
        let image1 = createElement({
            elementName: "img",
            classNames: "coverImageTag",
            attributes: [{
                key: "src",
                value: images[val]
            }]
        });
        image0.style.animation = "slideOut 2s linear";
        image1.style.animation = "slideIn 2s linear";
        slideContainer.appendChild(image1);
        setTimeout(() => {
            image0.remove();
            image1.style.animation = "slideOut 2s linear";
        }, timeout * 1.035)
        setTimeout(() => {

            image1.remove();
        }, timeout * 2);
    }

    //timeout and interval set for carosoul
    setTimeout(() => {
        setInterval(() => {
            i = (i + 1) % images.length;
            carousel(i, 5000);
        }, 5000)
    }, 5000)
    return slideContainer;
}

