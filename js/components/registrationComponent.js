import { createElement } from "../utils/domUtils.js";
import { sliderContainer } from "./sliderComponent.js";
import { loginComponent } from "./loginComponent.js";
import { signupComponent } from "./signupComponent.js";

export const registrationComponent = () => {
    const registraion = createElement({
        elementName: "div",
        classNames: "registration"
    })

    const coverInput = createElement({
        elementName: "div",
        classNames: "coverInput"
    });

    coverInput.append(loginComponent(), signupComponent());

    registraion.append(sliderContainer(), coverInput);
    return registraion;
}