import './Subtotal.css';
import Currency from "react-currency-format";
import {useStateValue} from "../../Helper/StateProvider";
import { getBasketTotal } from '../../Helper/reducer';

const Subtotal = () => {
    const [ { basket }, dispatch] = useStateValue();
    return (
       <div className="subtotal">
           <Currency
               renderText={(value) => (
                   <>
                       <p>
                           Subtotal ({basket?.length} items) <strong>{value}</strong>
                       </p>
                       <small className="subtotal__gift">
                           <input type="checkbox"/>
                           This order contains Gift
                       </small>
                   </>
               )}
               decimal={2}
               value={getBasketTotal(basket)}
               displayType={"text"}
               thousandSeparator={','}
               prefix={'₹'}
           />
           <button>Proceed To Checkout</button>
       </div>
    );
}

export default Subtotal;