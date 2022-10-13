import './App.css';
import Header from "./components/Header/Header";
import Home from './components/Home/Home';
import Checkout from './components/Checkout/Checkout';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./components/Login/Login";
import {useEffect} from "react";
import {auth} from "./config";
import {useStateValue} from "./Helper/StateProvider";
import Payment from "./components/Payment/Payment";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import Orders from "./components/Orders/Orders";

const promise = loadStripe("pk_test_51Lrb1hSF9l1ytUzyxEyEZXP0DIewK2bNfr7gxaZJktbsiDUYwLtINj9BpQK7wW4ygRuDJBKdVb3G83P1d9NGFNQz00MSCvQh0W");

function App() {
    const [{}, dispatch] = useStateValue();
    useEffect(() => {
        //will only run once when the app component loads..
        //creating listener which track the signIn account...
        auth.onAuthStateChanged(authUser => {
            //console.log('The user is >>', authUser);
            if (authUser) dispatch({type: 'SET_USER', user: authUser,});
            else dispatch({type: 'SET_USER', user: null,});
        });
    }, []);
  return (
      //BEM Convention for styling the code
      <BrowserRouter>
          <div className="app">
              <Routes>
                  <Route path="/login" element={<Login/>}/>
                  <Route path="/orders" element={<><Header/><Orders/></>}/>
                  <Route path="/checkout" element={<><Header/><Checkout/></>}/>
                  <Route path="/payment" element={<>
                      <Header/>
                      <Elements stripe={promise}>
                          <Payment/>
                      </Elements>
                  </>}/>
                  <Route path="/" element={<><Header/><Home/></>}/>
              </Routes>
          </div>
      </BrowserRouter>
  );
}

export default App;
