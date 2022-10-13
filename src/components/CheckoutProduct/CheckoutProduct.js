import './CheckoutProduct.css';
import starRating from "../../Helper/starRatingRender";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import {useStateValue} from "../../Helper/StateProvider";

const CheckoutProduct = (props) => {
    const [ { basket }, dispatch] = useStateValue();
    const removeFromBasket = () => {
        //remove the item from the basket
        dispatch({
            type: 'REMOVE_FROM_CART',
            id: props.id,
        });
    };
    return (
        <div className="checkoutProduct">
            <img className="checkoutProduct__image" src={props.image} alt="productImage"/>
            <div className="checkoutProduct__info">
                <p className="checkoutProduct__title">{props.title}</p>
                <p className="checkoutProduct__price">
                    <small>₹</small>
                    <strong>{props.price}</strong>
                </p>
                <div className="checkoutProduct__rating">
                    {starRating(props.rating).map((value, index, array) => {
                        return (value === "*" ?
                            <StarIcon key={index} style={{color: "orange"}}/> :
                            <StarBorderIcon key={index} style={{color: "orange"}}/>);
                    })}
                </div>
                {!props.hideButton && (
                    <button onClick={removeFromBasket}>Remove from Cart</button>
                )}
            </div>
        </div>
    );
}

export default CheckoutProduct;
