import { NotificationComponent } from "./components/notificationComponent.js";
import { CreateCard } from "./components/cardComponent.js";
import { fetchMoviesData } from "./services/getMovies.js";
import { navbarComponent } from "./components/navbarComponent.js";
import { createElement } from "./utils/domUtils.js";
// import { login ,signup} from "./services/authServices.js";

const mainContent = document.querySelector(".mainContent");
const mainPage = document.querySelector(".mainPage");



const getMovieData = async (val) => {
    try {
        mainContent.innerHTML = null;
        const movieData = await fetchMoviesData(val);
        movieData.forEach(element => {
            mainContent.appendChild(CreateCard(element));
        });
        }catch(error) {
            console.log(error);
        NotificationComponent(error);
    }
};



const nav = navbarComponent(getMovieData);

mainPage.prepend(nav);

// The message popup

getMovieData();


// // let login = document.querySelector("#login");
// let registerForm = document.querySelector("#registration-form");
// let backButton = document.querySelector(".back");
// let signupLink = document.querySelector(".signupLink");
// let loginLink = document.querySelector(".loginLink");

// let signup = document.querySelector(".signup");
// let signin = document.querySelector(".signin");

// signupLink.addEventListener("click", () => {
//     signin.style.display = "none";
//     signup.style.display = "flex";
// })

// loginLink.addEventListener("click", () => {
//     signup.style.display = "none";
//     signin.style.display = "flex";
// })

// login.addEventListener("click", () => {
//     login.style.display = "none";
//     registerForm.style.display = "flex";
// })

// backButton.addEventListener("click", () => {
//     login.style.display = "flex";
//     registerForm.style.display = "none";
// })

// //userLogin
// let images = ["https://www.justwatch.com/images/poster/320834237/s332/the-penguin.webp", "https://www.justwatch.com/images/poster/318387357/s332/deadpool-3.webp", "https://www.justwatch.com/images/poster/317138629/s332/kill-2024.webp", "https://www.justwatch.com/images/poster/120172701/s332/tumbbad.webp", "https://www.justwatch.com/images/poster/87721747/s332/marvels-daredevil.webp"];

// let slideContainer = document.querySelector(".slider-container");
// let i=1;

// let image0=createElement({
//     elementName:"img",
//     classNames:"coverImageTag",
//     attributes:[{
//         key:"src",
//         value:images[0]
//     }]
// })

// slideContainer.append(image0);
// function carousel(val,timeout){
    
//     let image1=createElement({
//         elementName:"img",
//         classNames:"coverImageTag",
//         attributes:[{
//             key:"src",
//             value:images[val]
//         }]
//     });
//     image0.style.animation="slideOut 2s linear";
//     image1.style.animation="slideIn 2s linear";
//     slideContainer.appendChild(image1);
//     setTimeout(()=>{
//         image0.remove();
//         image1.style.animation="slideOut 2s linear";
//     },timeout*1.035)
//     setTimeout(()=>{

//         image1.remove();
//     },timeout*2);
// }

// setTimeout(()=>{
//     setInterval(()=>{
//         i=(i+1)%images.length;
//         carousel(i,5000);
//     },5000)
// },5000)



// async function demo(value){
//     try{
//         await login(value);
//     }catch(error){
//         const errorep={error};
//         console.log(errorep.error.Error);
//         NotificationComponent(error.message,"Error");
//     }
// }

// // demo({
// //     "email":"nithinshets@gmail.com",
// //     "password":"Nithins@22"
// // });

// async function signups(value){
//     try{
//         console.log(await signup(value));
//     }catch(error){
//         NotificationComponent(error.message,"Error");
//     }
// }

// signups({
//     username:"demoDude",
//     admin:false,
//     email:"demoDude@gmail.com",
//     password:"Demo@221",
//     ordersBought:[],
//     ordersRented:[]

// })

