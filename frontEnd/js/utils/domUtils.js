//Function to create element which simplifies dynamic element creation takes object with various properties.
export const createElement = ({ elementName, innerText = "", innerHTML = "", classNames = "", attributes = [], eventListener = [] }) => {
    try {
        if (!elementName) throw "Specify Element Name";
        const customElement = document.createElement(elementName);//create element.

        if (innerText) customElement.innerText = innerText;//assigns innerText if present.
        if (innerHTML) customElement.innerHTML = innerHTML;//assigns innerHtml if present.

        //function to add class names to the element
        if (classNames.trim()) {
            const classArray = classNames.split(" ");
            classArray.forEach(element => {
                customElement.classList.add(element);
            });
        };

        //function to add multiple attributes to the element which can be assigned using key value pair in array.
        if (attributes.length > 0) {
            attributes.forEach(({ key, value }) => {
                customElement.setAttribute(key, value)
            })
        }

        //Function to add multiple event listner by specifying action and the function operation in an array. 
        if (eventListener.length > 0) {
            eventListener.forEach(({ action, operation}) => {
                customElement.addEventListener(action,operation);
            })
        }

        return customElement;//returns element with the properties specified.
    } catch (error) {
        console.log(error);
    }

}