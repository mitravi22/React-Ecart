import React, { Fragment, useState, useEffect } from 'react'
import "./MyProfile.css"
import { Link } from 'react-router-dom';
import Loader from "../layout/Loader"
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../../../action/ProfileAction';
import { loadUserDetails } from '../../../action/AuthAction'
import { useAlert } from 'react-alert';
import { useNavigate } from "react-router-dom";
import { UPDATE_PROFILE_RESET } from "../../../constant/ProfileConstant"
import { LOGIN_SUCCESS } from '../../../constant/AuthConstant';

const Profile = () => {

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/my-account");
  };

  const alert = useAlert()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.loadUser)
  const { error, loading, isUpdated } = useSelector((state) => state.profileUpdate)

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNo] = useState("");
  const [gender, setGender] = useState("")

  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    gender: ""
  });

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!firstName?.trim()) {
      errors.firstName = "First name is required";
      isValid = false;
    } else if (!/^[A-Za-z]{3,29}$/.test(firstName)) {
      errors.firstName = "Only alphabet is allowed and atleast fill three letter"
      isValid = false
    }

    if (!lastName?.trim()) {
      errors.lastName = "Last name is required";
      isValid = false;
    } else if (!/^[A-Za-z]{3,29}$/.test(lastName)) {
      errors.lastName = "Only alphabet is allowed and atleast fill three letter"
      isValid = false
    }

    if (!email?.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid email address";
      isValid = false;
    }


    if (!mobileNumber?.trim()) {
      errors.mobileNumber = "Mobile number is required";
      isValid = false;
    } else if (!/^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/.test(mobileNumber)) {
      errors.mobileNumber = "Enter correct contact no.";
      isValid = false;
    }

    if (!gender?.trim()) {
      errors.gender = "Gender is required";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData()

    myForm.set("firstName", firstName)
    myForm.set("lastName", lastName)
    myForm.set("email", email)
    myForm.set("mobileNumber", mobileNumber)
    myForm.set("gender", gender)

    if (validateForm()) {
      
      const token = localStorage.getItem("userDetails");
      const dataToken = JSON.parse(token)

      dispatch(updateUserProfile( dataToken.token, ( firstName, lastName, email, mobileNumber)));
    }

  }

  useEffect(() => {
    validateUser()
    const token = localStorage.getItem("userDetails");
    const dataToken = JSON.parse(token)

    dispatch(loadUserDetails(dataToken.token))

    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setMobileNo(user.mobileNumber);
      setGender(user.gender);
    }
    if (error) {
      alert.error(error)
    }


    if (isUpdated) {
      alert.success("Profile Update Successfully")

      // const token = localStorage.getItem("userDetails");
      // const dataToken = JSON.parse(token)

      // dispatch(loadUserDetails(dataToken.token))

      navigate('/my-account')

      dispatch({
        type: UPDATE_PROFILE_RESET
      })
    }
  }, [])

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
    <Fragment>
      {loading ? <Loader /> : <Fragment>
            <div className='register'>
              <h2 className='main-heading'>PERSONAL INFORMATION</h2>
              <form encType='multipart/form-data'
                onSubmit={updateProfileSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder='Enter First name'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)} />
                  {formErrors.firstName && <div style={{ color: 'red' }}>{formErrors.firstName}</div>}
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder='Enter Last name'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)} />
                  {formErrors.lastName && <div style={{ color: 'red' }}>{formErrors.lastName}</div>}
                </div>

                <div className="form-group">

                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder='Enter Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                  {formErrors.email && <div style={{ color: 'red' }}>{formErrors.email}</div>}
                </div>
                <br />
                <div className="form-group">
                  <input
                    type="number"
                    id="mobile"
                    name="mobileNumber"
                    placeholder='Enter Mobile no.'
                    value={mobileNumber}
                    onChange={(e) => setMobileNo(e.target.value)} />
                  {formErrors.mobileNumber && <div style={{ color: 'red' }}>{formErrors.mobileNumber}</div>}
                </div>

                <div>
                  <label htmlFor="gender">
                    <input
                      type="radio"
                      name='gender'
                      value="male"
                      checked={gender === 'male'}
                      onChange={(e) => setGender(e.target.value)} />
                    Male
                  </label>
                  <br />
                  <label>
                    <input
                      type="radio"
                      name='gender'
                      value="female"
                      checked={gender === 'female'}
                      onChange={(e) => setGender(e.target.value)} />
                    Female
                  </label>
                  {formErrors.gender && <div style={{ color: 'red' }}>{formErrors.gender}</div>}
                </div>

                <br />

                <div className="form-group">
                  <button
                    type="submit"
                    value="Submit">UPDATE</button>
                  <button onClick={handleBack} type="submit"
                    value="Back"
                  >BACK</button>
                </div>
              </form>

            </div>
      </Fragment>
      }
    </Fragment>
  )
}

export default Profile


