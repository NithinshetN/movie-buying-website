import { NotificationComponent } from "../components/notificationComponent.js";
import { API_ENDPOINTS, TIMEOUT } from "../utils/config.js"

const token=sessionStorage.getItem("token");

//Function to signin the user
export const login = async (value) => {
    const response = await fetch(`${API_ENDPOINTS.login.url}`, {
        method: API_ENDPOINTS.login.method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(value),
        timeout: TIMEOUT
    })

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error)
    }
    return data;
}

//function to add the user
export const signup = async (value) => {
    const response = await fetch(API_ENDPOINTS.signup.url, {
        method: API_ENDPOINTS.signup.method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(value),
        timeout: TIMEOUT
    })
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error);
    }

    return data;
}

//Function to add the movies to the purchased moviesfield of the user
export const addPurchasedMovies=async (value)=>{
    try{
        const response=await fetch(API_ENDPOINTS.addPurchasedMovieId.url,{
            method:API_ENDPOINTS.addPurchasedMovieId.method,
            headers:{
                "Content-Type":"application/json",
                "Authorization":token
            },
            body:JSON.stringify({
                movieId:value
            })
        })
    }catch(error){
        NotificationComponent(error);
    }
}

//Function to add movies to rended field of the user.
export const addRentedMovieID=async(value)=>{
    try{
        const response=await fetch(API_ENDPOINTS.addRentedMovieID.url,{
            method:API_ENDPOINTS.addRentedMovieID.method,
            headers:{
                "Content-Type":"application/json",
                "Authorization":token
            },
            body:JSON.stringify({
                movieId:value
            })
        })
    }catch(error){
        NotificationComponent(error);
    }
}
//Function to check if the movie is previously aquired by the user.
export const ifMovieExists=async(value)=>{
    try{
        const response=await fetch(API_ENDPOINTS.validateIfMovieExists.url+"/"+value,{
            method:API_ENDPOINTS.validateIfMovieExists.method,
            headers:{
                "Content-Type":"application/json",
                "Authorization":token
            },
        })
        return response;
    }catch(error){
        NotificationComponent(error);
    }
}