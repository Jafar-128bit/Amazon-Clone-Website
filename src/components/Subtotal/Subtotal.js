import './Subtotal.css';
import Currency from "react-currency-format";
import {useStateValue} from "../../Helper/StateProvider";
import { getBasketTotal } from '../../Helper/reducer';
import { useNavigate } from 'react-router-dom';

const Subtotal = () => {
    const navigate = useNavigate();
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
           <button onClick={e => navigate('/payment')}>Proceed To Checkout</button>
       </div>
    );
}

export default Subtotal;
