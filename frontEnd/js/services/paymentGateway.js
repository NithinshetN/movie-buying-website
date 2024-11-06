import { NotificationComponent } from "../components/notificationComponent.js";
import { registrationComponent } from "../components/registrationComponent.js";
import { HTML_ElEMENTS ,API_ENDPOINTS} from "../utils/config.js";

export const gateWay = async (val) => {
    const token = sessionStorage.getItem('token');

    if(!token){
        HTML_ElEMENTS.message.append(registrationComponent());
        setTimeout(()=>{
            HTML_ElEMENTS.message.style.display="flex";
        },500)
        return;
    }

    try {
        const response = await fetch(API_ENDPOINTS.createOrder, {
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
                'Authorization': token
            },
            body: JSON.stringify({ amount: val.amount * 100 })
        });

        if (!response.ok) {  // Check if the response is successful
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const order = await response.json();  


        var options = {
            key: order.razorPayKey, 
            amount: order.amount,
            currency: order.currency,
            name: val.title,
            description: val.description,
            order_id: order.id,  
            handler: function (response) {
                NotificationComponent("Payment_id: " + response.razorpay_payment_id, "Payment Succesfull");
            },
            prefill: {
                name: order.username,
                email: order.email,
            },
            theme: {
                color: '#F37254'
            }
        };

        var rzp = new Razorpay(options);
        rzp.open();

    } catch (error) {
        sessionStorage.clear();
        window.location.reload();
        NotificationComponent(error, "Payment Failed");
    }
};