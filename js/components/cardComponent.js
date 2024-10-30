import { createElement } from "../utils/domUtils.js";
import { modalComponent } from "./modal.js";
import { gateWay } from "../services/paymentGateway.js";


const createImage = (details) => {
    const image = createElement({ elementName: "div", classNames: "image" });

    const img = createElement({
        elementName: "img", classNames: "thumbnail", attributes: [{
            key: "src",
            value: details.thumbnail
        }, {
            key: "alt",
            value: details.title
        }]
    });

    const link = createElement({elementName:"a",attributes:[{
        key:"href",
        value:details.trailer
    },{
        key:"target",
        value:"_blank"
    }]});

    const icon =createElement({elementName:"i",classNames:"fa-regular fa-circle-play"});

    link.appendChild(icon);
    image.append(img,link);

    return image;
}

const createMovieInfo = (details) => {
    const infoMovie = createElement({elementName:"div",classNames:"movieInfo"});
    const para1 = createElement({elementName:"p",classNames:"price",innerText:details.currency + " " + details.price[1]});
    const para2 = createElement({elementName:"p",classNames:"duration",innerText:details.duration});

    infoMovie.append(para1,para2)
    return infoMovie;
}

const ButtonContainer = (details) => {
    const creator = document.createElement("div");
    creator.classList.add("buttonClass");

    const button1 = createElement({
        elementName: "button",
        innerText: "Rent",
        classNames: "btn btn-danger",
        eventListner: [{
            action: "click",
            operation: function(){
                modalComponent(`<center>Final invoice amount:</br>${details.currency} ${details.price[0]}.00</br>Click 'Continue' to proceed</center>`, gateWay, details.price[0])
            }
        }]
    })

    const button2 = (createElement({
        elementName: "button",
        innerText: "Buy",
        classNames: "btn btn-success",
        eventListner: [{
            action: "click",
            operation: function(){
                modalComponent(`<center>Final invoice amount:</br>${details.currency} ${details.price[1]}.00</br>Click 'Continue' to proceed</center>`, gateWay, details.price[1]);
            },
        }]
    }));

    creator.append(button1,button2);
    return creator;
}

export const CreateCard = (details) => {
    const content = createElement({elementName:"div",classNames:"content"});
    const title = document.createElement("h2");

    if(details.title.length>14){
        title.innerText=details.title.substr(0,12)+"..";
    }else{
        title.innerText=details.title;
    }
    const description = createElement({elementName:"p",classNames:"description",innerText:details.description});
    const hr = document.createElement("hr");

    const imageDiv = createImage(details);
    const movieDiv = createMovieInfo(details);
    const buttonDiv = ButtonContainer(details);

    content.append(imageDiv,title,description,movieDiv,hr,buttonDiv);
    return content;
}
