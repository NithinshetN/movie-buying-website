import { addPaymentId } from "./addPaymentId.js";
import { NotificationComponent } from "../components/notificationComponent.js";
import { registrationComponent } from "../components/registrationComponent.js";
import { HTML_ElEMENTS ,API_ENDPOINTS} from "../utils/config.js";
import { addPurchasedMovies, addRentedMovieID, ifMovieExists } from "./userServices.js";

//Function to handel payment gateway integration 
export const gateWay = async (val) => {
    const token = sessionStorage.getItem('token');

    //checks for token
    if(!token){
        HTML_ElEMENTS.message.append(registrationComponent());
        setTimeout(()=>{
            HTML_ElEMENTS.message.style.display="flex";
        },500)
        return;
    }

    try {
        //Function to validate if the particular movie is previously aquired by the user
        const movieResponse=await ifMovieExists(val.movieId);
        const movieData=await movieResponse.json();

        if(movieData.validation){
            NotificationComponent(movieData.message);
            return;
        }
        //fetch call to create order
        const response = await fetch(API_ENDPOINTS.createOrder.url, {
            method: API_ENDPOINTS.createOrder.method,
            headers: {
                "Content-Type": "application/json", 
                'Authorization': token
            },
            body: JSON.stringify({ amount: val.amount})
        });

        if (!response.ok) {  // Check if the response is successful
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const order = await response.json();  

        //Object with order details
        var options = {
            key: order.razorPayKey, 
            amount: order.amount,
            currency: order.currency,
            name: val.title,
            description: val.description,
            order_id: order.id,  
            handler: async function (response) {
                await addPaymentId(response.razorpay_payment_id);
                val.orderType=="rent"? await addRentedMovieID(val.movieId) : await addPurchasedMovies(val.movieId)
                NotificationComponent("Payment_id: " + response.razorpay_payment_id, "Payment Succesfull");
                rzp.close();
            },
            prefill: {
                name: order.username,
                email: order.email,
            },
            theme: {
                color: '#F37254'
            }
        };

        let rzp = new Razorpay(options);//creates razor pay instance
        rzp.open();

    } catch (error) {
        sessionStorage.clear();
        window.location.reload();
        rzp.close();
        NotificationComponent(error, "Payment Failed");
    }
};