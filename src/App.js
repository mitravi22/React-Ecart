
import React, { Fragment, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/User/Header/Header';
import Footer from './components/User/Header/Footer';
import Home from './components/User/Home/Home';
import ProductsDetails from './components/User/Product/ProductsDetails';
import AboutUs from './components/User/AboutUs/AboutUs';
import ContactUs from './components/User/ContactUs/ContactUs';
import Registration from './components/User/Auth/Registration';
import Login from './components/User/Auth/Login';
import ForgetPassword from './components/User/Auth/ForgetPassword';
import ResetPassword from './components/User/Auth/ResetPassword';
import NotFound from './components/User/layout/NotFound';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './components/User/layout/ProtectedRoute';
import MyAddress from './components/User/Profile/MyAddress';
import MyProfile from './components/User/Profile/MyProfile';
import MyOrder from './components/User/Profile/MyOrder';
import Profile from './components/User/Profile/Profile';
import Product from './components/User/Product/Product';
import { useSelector, useDispatch } from "react-redux";
import { LOGIN_SUCCESS } from './constant/AuthConstant';
import Dropdow from './components/User/Product/Dropdown';

function App() {

    const dispatch = useDispatch()

    useEffect(() =>{
        validateUser()
    })

    function validateUser(){
        let userDetails = localStorage.getItem('userDetails');
        if(userDetails){
        userDetails = JSON.parse(userDetails);
        dispatch({
            type:LOGIN_SUCCESS,
            payload:userDetails
        })
        }
    }; 

    return (
        <Router>
            <Header />
            <ToastContainer />
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/products-details' element={<ProductsDetails />} />
                <Route exact path='/products' element={<Product />} />
                <Route exact path='/aboutus' element={<AboutUs />} />
                <Route exact path='/contactus' element={<ContactUs />} />
                <Route exact path='/registration' element={<Registration />} />
                <Route exact path='/login' element={<Login />} />
                <Route exact path='/forgot-password' element={<ForgetPassword />} />
                <Route exact path='/drop' element={<Dropdow />} />
                {/* <ProtectedRoute exact path="/profile" element={<Profile />} /> */}
                <Route exact path='/profile' element={<Profile />} />
                <Route exact path='/my-account' element={<MyProfile />} />
                <Route exact path='/my-address' element={<MyAddress />} />
                <Route exact path='/my-oreders' element={<MyOrder />} /> 
                <Route exact path='/reset-password' element={<ResetPassword />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
