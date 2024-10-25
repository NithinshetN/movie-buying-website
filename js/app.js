import { NotificationComponent } from "./components/notificationComponent.js";
import { CreateCard } from "./components/cardComponent.js";
import { fetchMoviesData } from "./services/getMovies.js";
import { navbarComponent } from "./components/navbarComponent.js";

const mainContent = document.querySelector(".mainContent");
const mainPage=document.querySelector(".mainPage");

const getMovieData = async (val) => {
    mainContent.innerHTML = null;
    const movieData=await fetchMoviesData(val);
    movieData.forEach(element => {
        mainContent.appendChild(CreateCard(element));
    });
}

const nav=navbarComponent(getMovieData);

mainPage.prepend(nav);



// The message popup

getMovieData();


let login = document.querySelector("#login");
let registerForm = document.querySelector("#registration-form");
let backButton = document.querySelector(".back");
let signupLink = document.querySelector(".signupLink");
let loginLink = document.querySelector(".loginLink");

let signup = document.querySelector(".signup");
let signin = document.querySelector(".signin");

signupLink.addEventListener("click", () => {
    signin.style.display = "none";
    signup.style.display = "flex";
})

loginLink.addEventListener("click", () => {
    signup.style.display = "none";
    signin.style.display = "flex";
})

login.addEventListener("click", () => {
    login.style.display = "none";
    registerForm.style.display = "flex";
})

backButton.addEventListener("click", () => {
    login.style.display = "flex";
    registerForm.style.display = "none";
})

//userLogin
let images = ["https://www.justwatch.com/images/poster/320834237/s332/the-penguin.webp", "https://www.justwatch.com/images/poster/318387357/s332/deadpool-3.webp", "https://www.justwatch.com/images/poster/317138629/s332/kill-2024.webp", "https://www.justwatch.com/images/poster/120172701/s332/tumbbad.webp", "https://www.justwatch.com/images/poster/87721747/s332/marvels-daredevil.webp"];

let slideContainer = document.querySelector(".slider-container");

images.forEach(ele => {
    let imgTag = document.createElement("img");
    imgTag.classList.add("coverImageTag");
    console.log(ele);
    imgTag.setAttribute("src", ele)
    slideContainer.appendChild(imgTag);
})


//banner notification
NotificationComponent("messagge and the thinsadl;gjasdljf");
