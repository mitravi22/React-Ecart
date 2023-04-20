import React, {useEffect} from 'react'
import "./MyProfile.css"
import { useAlert } from "react-alert";
import {loadUserDetails} from "../../../action/AuthAction"
import { useSelector, useDispatch } from "react-redux";
import { LOGIN_SUCCESS } from '../../../constant/AuthConstant';
import { Link} from 'react-router-dom';

const MyProfile = () => {

  const alert = useAlert()

  const dispatch = useDispatch()

  const {user}  = useSelector((state) => state.loadUser)

  useEffect(() => {
    validateUser()

      const token = localStorage.getItem("userDetails");
      const dataToken = JSON.parse(token)
      // console.log(dataToken.token,"tpkn");
      dispatch(loadUserDetails(dataToken.token));
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
    <div >
      <img className='image-account' src='http://ecart.mangoitsol.com/assets/home_page/img/bg/1.jpg' />
      <h1 className='account'>My Account</h1>
      <div>
        <h3 className='info'>MY PERSONAL INFORMATION</h3>
      </div>
      <div className="table-wrapper">
        <table className='center' style={{ width: "50%" }}>
          <tbody>
            <tr>
              <td>First Name</td>
              <td>{user?.firstName}</td>
            </tr>
            <tr>
              <td>Last Name</td>
              <td>{user?.lastName}</td>
            </tr>
            <tr>
              <td>Gender</td>
              <td>{user?.gender}</td>
            </tr>
            <tr>
              <td>Contact</td>
              <td>{user?.mobileNumber}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{user?.email}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='btnEdit'>
        <button className='profileEdit'>
        <Link to='/profile'>Edit</Link>
        </button>
      
      </div>
    </div>
  )
}

export default MyProfile