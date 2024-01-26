import SignUp from "./Components/SignUp"
import Navbar from "./Components/Navbar"
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route , Routes } from 'react-router-dom';
import SignIn from "./Components/SignIn";
import Home from "./Components/Home";
import Todo from "./Components/Todo";
import Footer from "./Components/Footer";
import { authState } from "./store/authState";
import { useNavigate } from "react-router-dom";
import { RecoilRoot, useSetRecoilState } from "recoil";

function App() {

  return (
    <RecoilRoot>
      <Router>
        <InitState/>
        <Navbar/>
          <Routes>
            <Route path="/" Component={Home}/>
            <Route path="/signin" Component={SignIn}/>
            <Route path="/signUp" Component={SignUp}/>
            <Route path="/actions" Component={Todo}/>
          </Routes>
          <Footer/>
      </Router>
       
     </RecoilRoot>
  )
}

function InitState() {
  const setAuth = useSetRecoilState(authState);
  const navigate = useNavigate();

  const init = async () => {
      const token = localStorage.getItem("token");
      try {
          const response = await fetch('http://localhost:3000/user/me', {
              headers: { Authorization: `Bearer ${token}` }
          });
          const data = await response.json();
          if (data.username) {
              setAuth({ token: data.token, username: data.username });
              navigate("/actions");
          } else {
              navigate("/");
          }
      } catch (e) {
          navigate("/");
      }
  }
  useEffect(() => {
      init();
  }, [])
  return <></>
}
export default App

