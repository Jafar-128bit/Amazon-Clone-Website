import './Checkout.css';
import Subtotal from "../Subtotal/Subtotal";
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct";
import {useStateValue} from "../../Helper/StateProvider";

const Checkout = () => {
    const [ { basket, user }, dispatch] = useStateValue();
    return (
        <div className="checkout">
            <div className="checkout__left">
                <img className="checkout__ad"
                     src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/audio/blaupunkt/branddays/sept/desktop/1.png"
                     alt="adds"/>
                <div>
                    <h1>Hello, {user?._delegate.email}</h1>
                    <h2 className="checkout__title">
                        Your Shopping basket
                    </h2>
                </div>
                {basket?.map((item, index, array) => {
                    return (
                        <CheckoutProduct
                            key={index}
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                        />
                    );
                })}
            </div>
            <div className="checkout__right">
                <Subtotal/>
            </div>
        </div>
    )
}

export default Checkout;
