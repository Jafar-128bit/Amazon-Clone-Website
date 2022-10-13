import './Payment.css';
import {useStateValue} from "../../Helper/StateProvider";
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct";
import {Link, useNavigate} from "react-router-dom";
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {useEffect, useState} from "react";
import {getBasketTotal} from "../../Helper/reducer";
import Currency from "react-currency-format";
import axiosFunction from "../../Helper/axiosFunction";
import {db} from "../../config";

const Payment = () => {
    const [{basket, user}, dispatch] = useStateValue();
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [ processing, setProcessing ] = useState(false);
    const [ succeeded, setSucceeded ] = useState(false);
    const [ clientSecret, setClientSecret ] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        //generate the special stripe secret which allow us to charge a customer
        const getClientSecret = async () => {
            const response = await axiosFunction({
                method: 'post',
                //stripe expects the total in a currencies submits
                url:`/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret);
        };
        getClientSecret();
    },[basket]);
    console.log('THE SECRET IS -->', clientSecret);
    const handleSubmit = async event => {
        //do all the fancy stripe stuffs
        event.preventDefault();
        setProcessing(true);
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            }
        }).then(({paymentIntent}) => {
            // paymentIntent = payment confirmation
            db
                .collection('user')
                .doc(user?.uid)
                .collection('orders')
                .doc(paymentIntent.id)
                .set({
                    basket: basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created,
                });
            setSucceeded(true);
            setError(null);
            setProcessing(false);
            dispatch({
                type: 'EMPTY_CART',
            });
            navigate('/orders', { replace: true });
        })
    };
    const handleChange = event => {
        //Listen for changes in the CardElement
        //and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    };
    return (
        <div className="payment">
            <div className="payment__container">
                <h1>
                    Checkout (<Link
                    to="/checkout"
                    style={{textDecoration: "none"}}
                >{basket?.length} items
                </Link>)
                </h1>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?._delegate.email}</p>
                        <p>123 React Lane</p>
                        <p>Los Angeles, CA</p>
                    </div>
                </div>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review Items and Delivery</h3>
                    </div>
                    <div className="payment__items">
                        {basket?.map((item, index, array) => (
                            <CheckoutProduct
                                key={index}
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>

                            <div className="payment__priceContainer">
                                <Currency
                                    renderText={(value) => (
                                        <h3>Order Total: {value}</h3>
                                    )}
                                    decimal={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={','}
                                    prefix={'₹'}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy Now" }</span>
                                </button>
                            </div>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
