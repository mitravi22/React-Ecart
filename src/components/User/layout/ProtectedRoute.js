
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import {  Route } from "react-router-dom";

const ProtectedRoute = ({ element: Component, ...rest }) => {

  const { user, isAuthenticated, loading } = useSelector((state) => state.loadUser)
  return (
    <Fragment>
      {!loading && (
        <Route
          {...rest}
          render={(props) => {
            if (isAuthenticated === false) {
              <Route path="/login" />
            }
            return <Component {...props} />;
          }}
        />
      )}
    </Fragment>
  )
}

export default ProtectedRoute