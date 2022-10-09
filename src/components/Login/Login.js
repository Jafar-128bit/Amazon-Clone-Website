import './Login.css';
import amazonLogo from '../../assets/amazon-logo-black.png';
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useStateValue} from "../../Helper/StateProvider";
import {auth} from "../../config";

const Login = () => {
    const [{ }, dispatch] = useStateValue();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [warning, setWarning] = useState(1);
    const navigate = useNavigate();
    const signIn = (e) => {
        e.preventDefault();
        //The Code here is just for simple REST API for sign In Authentications
        //Just to show functionality not for production purpose
        if (email.length === 0 && password.length === 0) {
            setWarning(0);
            setTimeout(() => setWarning(1), 2000);
        }
        //I used firebase
        auth.signInWithEmailAndPassword(email, password).then(auth => {
            if (auth.operationType === "signIn") return navigate('/');
        }).catch(error => alert("Wrong Credentials!"))
    };
    const register = (e) => {
        e.preventDefault();
        //The Code here is just for simple REST API for registration
        //Just to show functionality not for production purpose
        if (email.length === 0 && password.length === 0) {
            setWarning(0);
            setTimeout(() => setWarning(1), 2000);
        }
        //I used firebase
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(auth => {
                if (auth.additionalUserInfo.isNewUser === true) {
                    alert("Account Created!");
                    navigate('/');
                }
                else return alert("Error on Account!");
            }).catch(error => alert(error.message));
    };
    return (
        <div className="login">
            <Link to='/'>
                <img className="login__logo" src={amazonLogo} alt="logo"/>
            </Link>
            <div className="login__container">
                <h1>Sign-In</h1>
                <form>
                    <h5>E-mail</h5>
                    <input
                        type="text"
                        placeholder="Enter your email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}/>
                    <h5>Password</h5>
                    <input
                        type="password"
                        placeholder="Your password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button
                        className="login__signInButton"
                        type="submit"
                        onClick={signIn}>Sign-In
                    </button>
                </form>
                <p>
                    By singing in you agree to Amazon's Conditions oof Use & Sale.
                    Please see our Privacy Notice, our
                    Cookies Notice and our Interest-Based Ads Notice.
                </p>
                <button
                    className="login__registerButton"
                    onClick={register}>Create your Amazon account
                </button>
            </div>
            <div className="login__errorMsg">
                {warning === 0 ? <p style={{
                    color: 'red',
                    fontSize: '14px',
                    marginTop: '10px'
                }}>Username or Password is empty!</p> : <></>}
            </div>
        </div>
    );
}

export default Login;
