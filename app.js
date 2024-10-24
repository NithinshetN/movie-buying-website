
const mainContent = document.getElementsByClassName("mainContent");
const inputSearch = document.querySelector("input");
var url = "http://localhost:3000"

inputSearch.addEventListener("input", () => {
    if (inputSearch.value === "") {
        getMovieData();
    }
})

inputSearch.addEventListener("keydown", (ele) => {
    if (ele.key === "Enter") {
        getMovieData(inputSearch.value);
    }
})

const getMovieData = async (val) => {
    let valueData;
    if (!val) {
        valueData = ""
    } else {
        valueData = val
    }
    mainContent[0].innerHTML = null;
    const url1 = await fetch(`${url}/getmovies/${valueData}`);
    const js = await url1.json();
    js.forEach(element => {
        mainContent[0].appendChild(CreateCard(element));
    });

}

const createImage = (details) => {
    const image = document.createElement("div");
    const img = document.createElement("img");
    const link = document.createElement("a");
    const icon = document.createElement("i");

    image.classList.add("image");
    img.classList.add("thumbnail");
    icon.classList.add("fa-regular", "fa-circle-play")

    img.setAttribute("src", details.thumbnail);
    img.setAttribute("alt", details.title);
    link.setAttribute("href", details.trailer);
    link.setAttribute("target", "_blank");

    link.appendChild(icon);
    image.appendChild(img);
    image.appendChild(link);

    return image;
}

const createMovieInfo = (details) => {
    const infoMovie = document.createElement("div");
    const para1 = document.createElement("p");
    const para2 = document.createElement("p");

    para1.innerText = details.currency + " " + details.price[1];
    para2.innerText = details.duration;

    infoMovie.classList.add("movieInfo");
    para1.classList.add("price");
    para2.classList.add("duration")

    infoMovie.appendChild(para1);
    infoMovie.appendChild(para2);

    return infoMovie;
}

const createButton = (details) => {
    const creator = document.createElement("div");
    const button1 = document.createElement("button");
    const button2 = document.createElement("button");

    button1.setAttribute("type", "button");
    button2.setAttribute("type", "button");

    button1.classList.add("btn", "btn-danger");
    button2.classList.add("btn", "btn-success");
    creator.classList.add("buttonClass");

    button1.innerText = "Rent";
    button2.innerText = "Buy";


    console.log(details.price);
    button1.value = details.price[0];
    button2.value = details.price[1];

    button1.addEventListener("click", () => {
        popupFucn(button1.value, details.currency);
    });

    button2.addEventListener("click", () => {
        popupFucn(button2.value, details.currency);
    });

    creator.appendChild(button1);
    creator.appendChild(button2);

    return creator;
}

const CreateCard = (details) => {
    const content = document.createElement("div");
    const title = document.createElement("h2");
    const description = document.createElement("p");
    const hr = document.createElement("hr");

    content.classList.add("content");
    description.classList.add("description");

    title.innerText = details.title;
    description.innerText = details.description;

    const imageDiv = createImage(details);
    const movieDiv = createMovieInfo(details);
    const buttonDiv = createButton(details);

    content.append(imageDiv);
    content.append(title);
    content.append(description);
    content.append(movieDiv);
    content.append(hr);
    content.append(buttonDiv);

    return content;
}

const gateWay = async (val) => {
    try {
        const response = await fetch(url + "/createOrder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"  // Use proper content type for JSON
            },
            body: JSON.stringify({ amount: val * 100 })
        });

        if (!response.ok) {  // Check if the response is successful
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const order = await response.json();  // No parentheses needed for `response.json()`

        var options = {
            key: order.razorPayKey, // Replace with your actual key
            amount: order.amount,
            currency: order.currency,
            name: "play Movies",
            description: "Payment description",
            order_id: order.id,  // Ensure `order.id` exists in the backend response
            handler: function (response) {
                successPop(response.razorpay_payment_id);
            },
            prefill: {
                name: 'Customer Name',
                email: 'customer@example.com',
            },
            theme: {
                color: '#F37254'
            }
        };

        var rzp = new Razorpay(options);
        rzp.open();

    } catch (error) {
        console.error('Error in gateway process:', error);
    }
};

// The message popup
let popup = document.querySelectorAll(".message");
let continueButton = document.getElementById("continue");
let text0 = popup[0].querySelector("p");
let text1 = popup[1].querySelector("p");
let cancel = document.querySelectorAll(".cancel");
let ok = document.querySelector("#ok");

ok.addEventListener("click", () => {
    popup[1].style.display = "none";
})

continueButton.addEventListener("click", () => {
    gateWay(continueButton.value);
    popup[0].style.display = "none";
})

cancel.forEach(ele => {
    ele.addEventListener("click", () => {
        popup[0].style.display = "none";
    })
})

const popupFucn = (value, currency) => {
    popup[0].style.display = "flex";
    continueButton.value = value
    text0.innerHTML = `<p>Final invoice amount:</br><center> ${currency} ${value}.00</center></p>`
}

const successPop = (value) => {
    popup[1].style.display = "flex";
    text1.innerHTML = `<center><p>Payment successful:</br>${value}</p></center>`;
}

getMovieData();


let login=document.querySelector("#login");
let registerForm=document.querySelector("#registration-form");
let backButton=document.querySelector(".back");
let signupLink=document.querySelector(".signupLink");
let loginLink=document.querySelector(".loginLink");

let signup=document.querySelector(".signup");
let signin=document.querySelector(".signin");

signupLink.addEventListener("click",()=>{
    signin.style.display="none";
    signup.style.display="flex";
})

loginLink.addEventListener("click",()=>{
    signup.style.display="none";
    signin.style.display="flex";
})

login.addEventListener("click",()=>{
    login.style.display="none";
    registerForm.style.display="flex";
})

backButton.addEventListener("click",()=>{
    login.style.display="flex";
    registerForm.style.display="none";
})

//userLogin
let images = ["https://www.justwatch.com/images/poster/320834237/s332/the-penguin.webp", "https://www.justwatch.com/images/poster/318387357/s332/deadpool-3.webp", "https://www.justwatch.com/images/poster/317138629/s332/kill-2024.webp", "https://www.justwatch.com/images/poster/120172701/s332/tumbbad.webp", "https://www.justwatch.com/images/poster/87721747/s332/marvels-daredevil.webp"];

let slideContainer=document.querySelector(".slider-container");

images.forEach(ele=>{
    let imgTag=document.createElement("img");
    imgTag.classList.add("coverImageTag");
    console.log(ele);
    imgTag.setAttribute("src",ele)
    slideContainer.appendChild(imgTag);
})

let currentImg=img1;
let nextImg=img2;

let i = 0;

// const set = setInterval(() => {

//     i=(i+1)%images.length;
    
//     // console.log(i);
//     [currentImg,nextImg]=[nextImg,currentImg];

//     nextImg.setAttribute("src",images[i]);
//     nextImg.style.transform="translateX(100%)";

//     setTimeout(() => {
//         currentImg.classList.add("fade-out");
//         nextImg.classList.add("fade-in")
//     }, 50);

//     setTimeout(()=>{
//         currentImg.classList.remove("fade-out");
//         nextImg.classList.remove("fade-in");
//     },50);


//   }, 3500);


// clearInterval(set);

//all userlogin code

