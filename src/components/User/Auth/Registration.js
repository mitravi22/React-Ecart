import React, { Fragment, useState, useEffect } from 'react'
import "./Registration.css"
import { Link } from 'react-router-dom';
import Loader from "../layout/Loader"
import { useDispatch, useSelector } from 'react-redux';
import { registrationUser } from '../../../action/AuthAction';
import { useAlert } from 'react-alert';


const Registration = () => {

  const alert = useAlert()
  const dispatch = useDispatch()
  const { error, loading, isAuthenticated } = useSelector((state) => state.userRegistration)

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordMatch(event.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setPasswordMatch(event.target.value === password);
  };

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    gender: "",

  })

  const { firstName, lastName, email, mobileNumber, gender } = user;

  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
    gender: ""
  });

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!user.firstName?.trim()) {
      errors.firstName = "First name is required";
      isValid = false;
    } else if (!/^[A-Za-z]{3,29}$/.test(user.firstName)) {
      errors.firstName = "Only alphabet is allowed and atleast fill three letter"
      isValid = false
    }

    if (!user.lastName?.trim()) {
      errors.lastName = "Last name is required";
      isValid = false;
    } else if (!/^[A-Za-z]{3,29}$/.test(user.lastName)) {
      errors.lastName = "Only alphabet is allowed and atleast fill three letter"
      isValid = false
    }

    if (!user.email?.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      errors.email = "Invalid email address";
      isValid = false;
    }


    if (!user.mobileNumber?.trim()) {
      errors.mobileNumber = "Mobile number is required";
      isValid = false;
    } else if (!/^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/.test(user.mobileNumber)) {
      errors.mobileNumber = "Enter correct contact no.";
      isValid = false;
    }

    if (!password?.trim()) {
      errors.password = "Password is required";
      isValid = false;
    } else if (password?.trim().length < 8) {
      errors.password = "Password must be at least 8 characters long";
      isValid = false;
    }

    if (!confirmPassword?.trim()) {
      errors.confirmPassword = "Confirm password is required";
      isValid = false;
    } else if (confirmPassword !== password) {
      errors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    if (!user.gender?.trim()) {
      errors.gender = "Gender is required";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  // const [file, setAvtar] = useState()
  // const [avtarPreview, setAvtarPreview] = useState("assets/img/boy.png")

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData()

    myForm.set("firstName", firstName)
    myForm.set("lastName", lastName)
    myForm.set("email", email)
    myForm.set("mobileNumber", mobileNumber)
    myForm.set("password", password)
    myForm.set("confirmPassword", confirmPassword)
    // myForm.set("file", file)
    myForm.set("gender", gender)

    if (validateForm()) {
      setRegistrationSuccess(true);
      dispatch(registrationUser(myForm));
    }

  }

  const registerDataChange = (e) => {

    setUser({ ...user, [e.target.name]: e.target.value })

  }

  // For Image
  // const registerDataChange = (e) => {
  //   if (e.target.name === 'file') {

  //     const reader = new FileReader();

  //     reader.onload = () => {
  //       if (reader.readyState === 2) {
  //         setAvtarPreview(reader.result);
  //         setAvtar(reader.result)
  //       }
  //     }

  //     reader.readAsDataURL(e.target.files[0])

  //   } else {

  //     setUser({ ...user, [e.target.name]: e.target.value })
  //   }
  // }

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch()
    }
    // if (isAuthenticated) {
    //   history.push("/profile")
    // }
  }, [dispatch, error, alert, isAuthenticated])


  return (
    <Fragment>
      {loading ? <Loader /> : <Fragment>
        {
          !registrationSuccess ? <Fragment>
            <div className='register'>
              <h2 className='main-heading'>REGISTRATION</h2>
              <h3>If you have an account with us, Please <Link className="link" to='/login'>Login</Link></h3>
              <form encType='multipart/form-data'
                onSubmit={registerSubmit}>
                <div className="form-group">
                  <label htmlFor="firstName">First Name:</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={user.firstName}
                    onChange={registerDataChange} />
                  {formErrors.firstName && <div style={{ color: 'red' }}>{formErrors.firstName}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Last Name:</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={user.lastName}
                    onChange={registerDataChange} />
                  {formErrors.lastName && <div style={{ color: 'red' }}>{formErrors.lastName}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={user.email}
                    onChange={registerDataChange} />
                  {formErrors.email && <div style={{ color: 'red' }}>{formErrors.email}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="mobile">Mobile No.:</label>
                  <input
                    type="number"
                    id="mobile"
                    name="mobileNumber"
                    value={user.mobileNumber}
                    onChange={registerDataChange} />
                  {formErrors.mobileNumber && <div style={{ color: 'red' }}>{formErrors.mobileNumber}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange} />
                  {formErrors.password && <div style={{ color: 'red' }}>{formErrors.password}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password:</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange} />
                  {formErrors.confirmPassword && <div style={{ color: 'red' }}>{formErrors.confirmPassword}</div>}
                </div>
                <div>
                  {!passwordMatch && <p style={{ color: 'red' }}>Passwords do not match.</p>}
                </div>

                {/* <div className="registerImage">
            <label htmlFor="confirmPassword">Select Image:</label>
            <img className='image-link' src={avtarPreview} alt='Avtar Preview' />
            <input
              type="file"
              name="file"
              accept='image/*'
              onChange={registerDataChange}
            />
          </div> */}

                <div>
                  <label htmlFor="gender">
                    <input
                      type="radio"
                      name='gender'
                      value="male"
                      checked={user.gender === 'male'}
                      onChange={registerDataChange} />
                    Male
                  </label>
                  <br />
                  <label>
                    <input
                      type="radio"
                      name='gender'
                      value="female"
                      checked={user.gender === 'female'}
                      onChange={registerDataChange} />
                    Female
                  </label>
                  {formErrors.gender && <div style={{ color: 'red' }}>{formErrors.gender}</div>}
                </div>

                <br />

                <div className="form-group">
                  <button
                    type="submit"
                    value="Submit"

                  >Register</button>
                </div>
              </form>

            </div>

          </Fragment> : <Fragment>

            <div className='success'>

              <h1 className='main-heading'>User Registration successful!</h1>
              <div>
                <p>Verification link has been sent to your email</p>
                <p>You can proceed for login after verification <Link className="link" to='/login'>Login</Link> </p>
              </div>


            </div>

          </Fragment>
        }
      </Fragment>
      }
    </Fragment>
  )
}

export default Registration