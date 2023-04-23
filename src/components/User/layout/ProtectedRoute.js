
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Navigate, Routes } from "react-router-dom";
import Profile from "../Profile/Profile";


const ProtectedRoute = (props) => {

// console.log(rest,"re"); 
 const { user, isAuthenticated, loading } = useSelector((state) => state.userLogin)
  return (
      <Route path={props.path} element={isAuthenticated?props.element:(
          <Navigate to={{ pathname: "/login" }} />
        )} />
     
  )
}

export default ProtectedRoute