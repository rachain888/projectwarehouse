import React , {useState , useEffect} from 'react';
import { BrowserRouter, Switch , Route } from 'react-router-dom';
import Axios from 'axios';
import Home from './components/pages/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Navbar from './components/layouts/Navbar';
import UserContext from './components/context/UserContext'
import "./style.css";
import Dashboard from './components/pages/adminpage/Dashboard'
import Products from './components/pages/adminpage/Products'
export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  })
  
  useEffect(() => {
    const checkLoggedIn = async () => {
      var token = localStorage.getItem('auth-token');
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post('http://localhost:5000/login/tokenIsValid',null,
      {
        headers : { "x-auth-token" : token }
      });
      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:5000/login/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);
  return (
    <BrowserRouter>
    <UserContext.Provider value={{ userData, setUserData}}>
    <Navbar/>
      <Switch>
      <Route exact path="/" component = {Home} />
      <Route exact path="/login" component = {Login} />
      <Route exact path="/register" component = {Register} />
      <Route exact path="/admin" component = {Dashboard} />
      <Route exact path="/product" component = {Products} />
     </Switch>
     </UserContext.Provider>
    </BrowserRouter>
  );
}
