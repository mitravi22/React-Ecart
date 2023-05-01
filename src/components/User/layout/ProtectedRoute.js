
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom"
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({component: Component, ...rest}) => {

//  const { userLogin, isAuthenticated, loading } = useSelector((state) => state.userLogin)
//   return (
//     <Fragment>
//       {loading === false &&(
//         <Route {...rest} 
//         render= {props =>{
//           if(isAuthenticated === false){
//             return  <Navigate to="/login"></Navigate>
//           }
//           return <Component {...props} />
//         } }
//         />

//        )} 
//     </Fragment>
//   )
// }

const ProtectedRoute = ({ component: Component, ...rest }) => {

  const { loading, isAuthenticated, userLogin } = useSelector((state) => state.userLogin);

  if (!loading && isAuthenticated === false) {
    return <Link to="/login" />;
  }

  return (
    <Routes>
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Navigate
              to={{
                pathname: '/login',
                state: { from: props.location },
              }}
            />
          )
        }
      />
    </Routes>

  );
};

export default ProtectedRoute