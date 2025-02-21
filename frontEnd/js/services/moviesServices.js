import { API_ENDPOINTS,TIMEOUT } from "../utils/config.js";

//function to fetch movies details
export const fetchMoviesData=async(val)=>{
    let value;
    if (!val) {
        value = ""
    } else {
        value = val
    }
    
    const response = await fetch(`${API_ENDPOINTS.movies.url}/${value}`,{
        method:API_ENDPOINTS.movies.method,
        timeout:TIMEOUT
    });
    
    if(!response.ok){
        throw new Error("Something went wrong!!!");
    }

    return await response.json();
}

