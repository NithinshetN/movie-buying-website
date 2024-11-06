import { API_ENDPOINTS, TIMEOUT } from "../utils/config.js"
export const login = async (value) => {
    const response = await fetch(`${API_ENDPOINTS.login}`, {
        method: "POST",
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


export const signup = async (value) => {
    console.log(value);
    const response = await fetch(API_ENDPOINTS.signup, {
        method: 'POST',
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

export const verifyToken = async () => {
    const token = sessionStorage.getItem('token');
    if(!token){
        return {validation:false};
    }
    const response = await fetch(API_ENDPOINTS.token, {
        method:"GET",
        headers: {
            'Authorization': token
        }
    })
    console.log(token);
    console.log(response);
    const data=await response.json()

    if(response.ok){
        return data;
    }else{
        console.log(data);
        throw new Error(data.error.name);
    }
}