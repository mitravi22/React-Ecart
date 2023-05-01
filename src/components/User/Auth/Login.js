import React, { Fragment, useState, useEffect } from 'react'
import "./Registration.css"
import { Link } from 'react-router-dom';
import Loader from "../layout/Loader"
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../action/AuthAction';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const alert = useAlert()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { error, loading, isAuthenticated, userLogin } = useSelector((state) => state.userLogin)

  //  console.log(userLogin,"loooo");

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [formErrors, setFormErrors] = useState({

    loginEmail: "",
    loginPassword: "",

  });

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!loginEmail?.trim()) {
      errors.loginEmail = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(loginEmail)) {
      errors.loginEmail = "Invalid email address";
      isValid = false;
    }

    if (!loginPassword?.trim()) {
      errors.loginPassword = "Password is required";
      isValid = false;
    } else if (loginPassword?.trim().length < 8) {
      errors.loginPassword = "Password must be at least 8 characters long";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(loginUser(loginEmail, loginPassword))
    }
  }

  useEffect(() => {
    if (error) {
      alert.error(error)
    }
  
    if (isAuthenticated === true) {
      navigate('/')
    }

  }, [dispatch, error, alert, isAuthenticated])

  return (
    <Fragment>
      {loading ? <Loader /> : <Fragment>

        <div className='register'>
          <h2 className='main-heading'>LOGIN</h2>
          <h3>If you do not have an account with us, Please <Link className="link" to='/registration'>Register</Link></h3>
          <form onSubmit={loginSubmit}>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                placeholder='Enter Email'
                name="email"
                autoComplete='off'
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)} />
            </div>

            {formErrors.loginEmail && <div style={{ color: 'red' }}>{formErrors.loginEmail}</div>}
            <br />
            
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                placeholder='Enter Password'
                name="password"
                autoComplete='off'
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)} />
            </div>

            {formErrors.loginPassword && <div style={{ color: 'red' }}>{formErrors.loginPassword}</div>}
           <br />
            <div className="form-group">
              <h5><Link className="link" to='/forgot-password'>Forget Password</Link></h5>
            </div>
            <br />
            <div className="form-group">
              <button
                type="submit"
                value="Login"
              >Login</button>
            </div>
          </form>

        </div>

      </Fragment>
      }
    </Fragment>
  )
}

export default Login