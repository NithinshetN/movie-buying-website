import { API_ENDPOINTS, TIMEOUT } from "../utils/config.js"

//Function to verify token and to retrieve user data 
export const verifyToken = async () => {
    const token = sessionStorage.getItem('token');//retreives token from seesion storage
    if(!token){
        return {validation:false};//if token is null than validation is false
    };
    //fetch call 
    const response = await fetch(API_ENDPOINTS.token.url, {
        method:API_ENDPOINTS.token.method,
        headers: {
            'Authorization': token
        }
    });

    const data=await response.json();

    if(response.ok){
        return data;//returns 
    }else{
        throw new Error(data.error.name);
    }
}