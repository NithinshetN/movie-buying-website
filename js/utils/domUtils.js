export const createElement = ({ elementName, innerText = "", innerHTML = "", classNames = "", attributes = [], eventListner = [] }) => {
    try {
        if (!elementName) throw "Specify Element Name";
        const customElement = document.createElement(elementName);

        if (innerText) customElement.innerText = innerText;
        if (innerHTML) customElement.innerHTML = innerHTML;


        if (classNames.trim()) {
            const classArray = classNames.split(" ");
            classArray.forEach(element => {
                customElement.classList.add(element);
            });
        };

        if (attributes.length > 0) {
            attributes.forEach(({ key, value }) => {
                customElement.setAttribute(key, value)
            })
        }

        if (eventListner.length > 0) {
            eventListner.forEach(({ action, operation}) => {
                customElement.addEventListener(action,operation);
            })
        }
        return customElement;
    } catch (error) {
        console.log(error);
    }

}