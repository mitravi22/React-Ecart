
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Route} from "react-router-dom"
import { Link } from 'react-router-dom';

const ProtectedRoute = ({component: Component, ...rest}) => {

 const { userLogin, isAuthenticated, loading } = useSelector((state) => state.userLogin)
  return (
    <Fragment>
      {loading === false &&(
        <Route {...rest} 
        render= {props =>{
          if(isAuthenticated === false){
            return   <Link to="/login"></Link>
          }
          return <Component {...props} />
        } }
        />

       )} 
    </Fragment>
  )
}

export default ProtectedRoute