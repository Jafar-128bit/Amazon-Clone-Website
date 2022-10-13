import './Order.css';
import Moment from 'react-moment';
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct";
import Currency from "react-currency-format";

const Order = ({value}) => {
    const unixTimestamp = value.data.created;
    return (
        <div className="order">
            <h2>Order</h2>
            <p>
                <Moment unix format="MMMM Do YYYY, h:mma">{unixTimestamp}</Moment>
            </p>
            <p className="order__id">
                <small>{value.id}</small>
            </p>
            {value.data.basket?.map((value, index) => (
                <CheckoutProduct
                    key={index}
                    id={value.id}
                    title={value.title}
                    image={value.image}
                    price={value.price}
                    rating={value.rating}
                    hideButton
                />
            ))}
            <Currency
                renderText={(value) => (
                    <>
                        <h3 className="order__total">Order Total: {value}</h3>
                    </>
                )}
                decimal={2}
                value={value.data.amount / 100}
                displayType={"text"}
                thousandSeparator={','}
                prefix={'₹'}
            />
        </div>
    );
}

export default Order;
