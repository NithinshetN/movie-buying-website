export const BASE_URL="http://localhost:3000";

const message=document.querySelector(".message");
const mainContent=document.querySelector(".mainContent");
const mainPage = document.querySelector(".mainPage");
const bannerContainer = document.querySelector(".banner-container");

// API endpoints used throughout the application
export const API_ENDPOINTS={
    // User authentication endpoints
    login:{url:`${BASE_URL}/user/signin`,method:"POST"},
    signup:{url:`${BASE_URL}/user/signup`,method:"POST"},

    // Movie-related endpoints
    movies:{url:`${BASE_URL}/movie/movies`,method:"GET"},

     // Order creation and payment-related endpoints
    createOrder:{url:`${BASE_URL}/user/orders`,method:"POST"},
    token:{url:`${BASE_URL}/user/verify-token`},method:"GET",

    //Endpoints to manage user attribute operation
    addPaymentid:{url:`${BASE_URL}/user/movies/payment-id`,method:"PUT"},
    addPurchasedMovieId:{url:`${BASE_URL}/user/movies/purchased`,method:"PUT"},
    addRentedMovieID:{url:`${BASE_URL}/user/movies/rented`,method:"PUT"},

    //Endpoint to validate if movies are added
    validateIfMovieExists:{url:`${BASE_URL}/user/movies/exists`,method:"GET"}
};

export const HTML_ElEMENTS={
    message:message,                //Element to display message or alerts
    mainContent:mainContent,        //mainContent area of the page
    mainPage:mainPage,              //Them main page container
    bannerContainer:bannerContainer //Container for baner
};

export const TIMEOUT=5000;