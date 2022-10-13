import './Header.css';
import amazonLogo from '../../assets/amazon-logo.png';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import {Link} from "react-router-dom";
import {useStateValue} from "../../Helper/StateProvider";
import {auth} from "../../config";

const Header = () => {
    const [{basket, user}, dispatch] = useStateValue();
    const handleAuthentication = () => {
        if (user) auth.signOut();
    };
    return (
        <div className="header">
            <Link to='/'>
                <img className="header-logo" src={amazonLogo} alt="amazonLogo"/>
            </Link>
            <div className="header__search">
                <input className="header__searchInput" type="text"/>
                <SearchOutlinedIcon className="header__searchIcon"/>
            </div>
            <div className="header__nav">
                <Link to={!user && '/login'} style={{textDecoration: "none"}}>
                    <div onClick={handleAuthentication} className="header__option">
                        <span className="header__optionLineOne">
                            {user ? `Hello, ${user?._delegate.email}` : "Hello Guest"}
                        </span>
                        <span className="header__optionLineTwo">
                            {user ? "Sign Out" : "Sign In"}
                        </span>
                    </div>
                </Link>
                <Link to='/orders'  style={{textDecoration: "none"}}>
                    <div className="header__option">
                        <span className="header__optionLineOne">Returns</span>
                        <span className="header__optionLineTwo">& Orders</span>
                    </div>
                </Link>
                <div className="header__option">
                    <span className="header__optionLineOne">Your</span>
                    <span className="header__optionLineTwo">Prime</span>
                </div>
            </div>
            <Link to="/checkout">
                <div className="header__basketOption">
                    <ShoppingBasketIcon/>
                    <span className="header__optionLineTwo header__basketCount">{basket?.length}</span>
                </div>
            </Link>
        </div>
    );
}

export default Header;
