
import React, { Fragment, useState, useEffect } from 'react'
import Loader from "../layout/Loader"
import { useDispatch, useSelector } from 'react-redux';
import { resetPasswordUser } from "../../../action/AuthAction"
import { useAlert } from 'react-alert';
import { useNavigate, useLocation } from 'react-router-dom';
import "./Registration.css"

const ResetPassword = () => {

    const alert = useAlert()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const location = useLocation();
    const resetToken = new URLSearchParams(location.search).get('token');

    console.log(`Token: ${resetToken}`);


    const { error, loading, success } = useSelector((state) => state.resetPassword)

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);
  
    const handlePasswordChange = (event) => {
      setNewPassword(event.target.value);
      setPasswordMatch(event.target.value === confirmPassword);
    };
  
    const handleConfirmPasswordChange = (event) => {
      setConfirmPassword(event.target.value);
      setPasswordMatch(event.target.value === newPassword);
    };

    const [formErrors, setFormErrors] = useState({ newPassword: "", confirmPassword: "" });


    const validateForm = () => {
        let errors = {};
        let isValid = true;

        if (!newPassword?.trim()) {
            errors.newPassword = "Password is required";
            isValid = false;
        } else if (newPassword?.trim().length < 8) {
            errors.newPassword = "Password must be at least 8 characters long";
            isValid = false;
        }

        if (!confirmPassword?.trim()) {
            errors.confirmPassword = "Confirm password is required";
            isValid = false;
        }
        setFormErrors(errors);
        return isValid;
    };

    const resetPasswordSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            dispatch(resetPasswordUser(resetToken, newPassword))
        }
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
        }

        if(success){
            alert.success("Password reset successfully")

            navigate('/login')
        }

    }, [dispatch, error, alert, success])

    return (
        <Fragment>
  
          <div className='register'>
            <h3 className='main-heading'>RESET PASSWORD</h3>
  
            <form onSubmit={resetPasswordSubmit}>
             
              <div className="form-group">
                  <label htmlFor="password">New Password:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={newPassword}
                    onChange={handlePasswordChange} />
                  {formErrors.newPassword && <div style={{ color: 'red' }}>{formErrors.newPassword}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password:</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange} />
                  {/* {formErrors.confirmPassword && <div style={{ color: 'red' }}>{formErrors.confirmPassword}</div>} */}
                </div>
                <div>
                  {!passwordMatch && <p style={{ color: 'red' }}>Passwords do not match.</p>}
                </div>
                <div className="form-group">
              <button
                type="submit"
                value="Login"
              >SUBMIT</button>
            </div>
            </form>
  
          </div>
  
      
      </Fragment>
    )
}

export default ResetPassword