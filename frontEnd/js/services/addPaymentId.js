import { API_ENDPOINTS,TIMEOUT} from "../utils/config.js"

// Function to add a payment ID to the user
export const addPaymentId=async(value)=>{
    // Retrieve the authentication token from session storage
    const token = sessionStorage.getItem('token');
    // Make an API call to add the payment ID
    const response=await fetch(API_ENDPOINTS.addPaymentid.url,{
        method:API_ENDPOINTS.addPaymentid.method,
        headers:{
            "Content-Type":"application/json",
            "Authorization":token
        },

        body:JSON.stringify({paymentId:value})
    })

    const data = await response.json();

    if(!response.ok){
        throw new Error(data.error)
    }
}