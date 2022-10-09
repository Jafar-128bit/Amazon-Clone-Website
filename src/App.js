import './App.css';
import Header from "./components/Header/Header";
import Home from './components/Home/Home';
import Checkout from './components/Checkout/Checkout';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./components/Login/Login";
import {useEffect} from "react";
import { auth } from "./config";
import {useStateValue} from "./Helper/StateProvider";

function App() {
    const [{ }, dispatch] = useStateValue();
    useEffect(() => {
        //will only run once when the app component loads..
        //creating listener which track the signIn account...
        auth.onAuthStateChanged(authUser => {
            //console.log('The user is >>', authUser);
            if (authUser) dispatch({type: 'SET_USER', user: authUser,});
            else dispatch({type: 'SET_USER', user: null,});
        });
    },[]);
  return (
      //BEM Convention for styling the code
      <BrowserRouter>
          <div className="app">
              <Routes>
                  <Route path="/login" element={<Login/>}/>
                  <Route path="/checkout" element={<><Header/><Checkout/></>}/>
                  <Route path="/" element={<><Header/><Home/></>}/>
              </Routes>
          </div>
      </BrowserRouter>
  );
}

export default App;
