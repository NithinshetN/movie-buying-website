export const BASE_URL="http://localhost:3000";

const message=document.querySelector(".message");
const mainContent=document.querySelector(".mainContent");
const mainPage = document.querySelector(".mainPage");
const bannerContainer = document.querySelector(".banner-container");

export const API_ENDPOINTS={
    login:`${BASE_URL}/login`,
    signup:`${BASE_URL}/signup`,
    movies:`${BASE_URL}/movies`,
    createOrder:`${BASE_URL}/createorder`,
    token:`${BASE_URL}/verifytoken`
}

export const HTML_ElEMENTS={
    message:message,
    mainContent:mainContent,
    mainPage:mainPage,
    bannerContainer:bannerContainer
}

export const TIMEOUT=5000;