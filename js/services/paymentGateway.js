import { NotificationComponent } from "../components/notificationComponent.js";
var url = "http://localhost:3000";
export const gateWay = async (val) => {
    try {
        const response = await fetch(url + "/createOrder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"  // Use proper content type for JSON
            },
            body: JSON.stringify({ amount: val * 100 })
        });

        if (!response.ok) {  // Check if the response is successful
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const order = await response.json();  // No parentheses needed for `response.json()`

        var options = {
            key: order.razorPayKey, // Replace with your actual key
            amount: order.amount,
            currency: order.currency,
            name: "play Movies",
            description: "Payment description",
            order_id: order.id,  // Ensure `order.id` exists in the backend response
            handler: function (response) {
                NotificationComponent("Payment_id: "+response.razorpay_payment_id,"Payment Succesfull");
            },
            prefill: {
                name: 'Customer Name',
                email: 'customer@example.com',
            },
            theme: {
                color: '#F37254'
            }
        };

        var rzp = new Razorpay(options);
        rzp.open();

    } catch (error) {
        NotificationComponent(error,"Payment Failed");
    }
};