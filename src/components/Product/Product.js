import './Product.css';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import {useStateValue} from "../../Helper/StateProvider";
import starRating from '../../Helper/starRatingRender';

const Product = (props) => {
    const [{ basket }, dispatch] = useStateValue();
    //dispatch the item into the data layer
    const addToCart = () => {
        dispatch({
            type: 'ADD_TO_CART',
            item: {
                id: props.id,
                title: props.title,
                image: props.image,
                price: props.price,
                rating: props.rating,
            },
        });
    }

    return (
        <div className="product">
            <div className="product__info">
                <p>{props.title}</p>
                <p className="product__price">
                    <small>₹</small>
                    <strong>{props.price}</strong>
                </p>
                <div className="product__rating">
                    {starRating(props.rating).map((value, index, array) => {
                        return (value === "*" ?
                            <StarIcon key={index} style={{color: "orange"}}/> :
                            <StarBorderIcon key={index} style={{color: "orange"}}/>);
                    })}
                </div>
            </div>
            <img className="product__image" src={props.image} alt="productImg"/>
            <button className="product__addToCart" onClick={addToCart}>Add to Cart</button>
        </div>
    );
}

export default Product;