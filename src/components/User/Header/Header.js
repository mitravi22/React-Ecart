import React, { Fragment, useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import NavBar from './NavBar'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LOGOUT_USER_SUCCESS } from '../../../constant/AuthConstant';
import { Dropdown } from 'react-bootstrap';

const Header = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { error, loading, isAuthenticated, userLogin } = useSelector((state) => state.userLogin);
  // console.log(isAuthenticated,"ath");
  //  if(isAuthenticated === true){
  //   console.log("login");
  //  }else{
  //   console.log("logout");
  //  }

  const handelLogOut = () => {
    localStorage.removeItem('userDetails')
    dispatch({
      type: LOGOUT_USER_SUCCESS,
    })
  }

  useEffect(() => {

    if (isAuthenticated === false) {
      navigate('/login')
    }

  }, [dispatch, isAuthenticated])

  return (
    <Fragment>
      <div className="wrapper bg-dark-white">
        <div className="top-header">
          <div className="container">
            <div className="th-main">
              <div className="th-left">
                <ul>
                  <li><NavLink className="link" to="mailto:mhhasanul@gmail.com">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12.6666 2.66675H3.33331C2.80288 2.66675 2.29417 2.87746 1.9191 3.25253C1.54403 3.62761 1.33331 4.13631 1.33331 4.66675V11.3334C1.33331 11.8638 1.54403 12.3726 1.9191 12.7476C2.29417 13.1227 2.80288 13.3334 3.33331 13.3334H12.6666C13.1971 13.3334 13.7058 13.1227 14.0809 12.7476C14.4559 12.3726 14.6666 11.8638 14.6666 11.3334V4.66675C14.6666 4.13631 14.4559 3.62761 14.0809 3.25253C13.7058 2.87746 13.1971 2.66675 12.6666 2.66675ZM3.33331 4.00008H12.6666C12.8435 4.00008 13.013 4.07032 13.1381 4.19534C13.2631 4.32037 13.3333 4.48994 13.3333 4.66675L7.99998 7.92008L2.66665 4.66675C2.66665 4.48994 2.73688 4.32037 2.86191 4.19534C2.98693 4.07032 3.1565 4.00008 3.33331 4.00008ZM13.3333 11.3334C13.3333 11.5102 13.2631 11.6798 13.1381 11.8048C13.013 11.9298 12.8435 12.0001 12.6666 12.0001H3.33331C3.1565 12.0001 2.98693 11.9298 2.86191 11.8048C2.73688 11.6798 2.66665 11.5102 2.66665 11.3334V6.18675L7.65331 9.23341C7.75466 9.29193 7.86962 9.32273 7.98665 9.32273C8.10367 9.32273 8.21863 9.29193 8.31998 9.23341L13.3333 6.18675V11.3334Z"
                        fill="white" />
                    </svg>
                    &nbsp;&nbsp;mhhasanul@gmail.com</NavLink></li>
                  <li><NavLink className="link" to="tel:(12345)67890"><svg xmlns="http://www.w3.org/2000/svg"
                    width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M11.044 14.6659H11.0627C11.4147 14.6659 11.7473 14.5273 11.9993 14.2753L13.8073 12.4673C13.8693 12.4054 13.9185 12.3319 13.952 12.251C13.9855 12.1702 14.0028 12.0835 14.0028 11.9959C14.0028 11.9084 13.9855 11.8217 13.952 11.7408C13.9185 11.6599 13.8693 11.5864 13.8073 11.5246L11.1407 8.85792C11.0788 8.79595 11.0053 8.7468 10.9245 8.71326C10.8436 8.67972 10.7569 8.66245 10.6693 8.66245C10.5818 8.66245 10.4951 8.67972 10.4142 8.71326C10.3333 8.7468 10.2599 8.79595 10.198 8.85792L9.13534 9.92059C8.64267 9.77392 7.72334 9.44059 7.14067 8.85792C6.558 8.27525 6.22467 7.35592 6.078 6.86325L7.14067 5.80059C7.20263 5.73873 7.25179 5.66526 7.28533 5.58438C7.31887 5.5035 7.33614 5.41681 7.33614 5.32925C7.33614 5.2417 7.31887 5.155 7.28533 5.07412C7.25179 4.99325 7.20263 4.91978 7.14067 4.85792L4.474 2.19125C4.34655 2.07095 4.17793 2.00394 4.00267 2.00394C3.82741 2.00394 3.65879 2.07095 3.53134 2.19125L1.724 3.99925C1.47067 4.25259 1.328 4.60059 1.33334 4.95592C1.34867 5.90525 1.6 9.20259 4.19867 11.8013C6.79734 14.3999 10.0947 14.6506 11.044 14.6659ZM4.00334 3.60525L5.72733 5.32925L4.86534 6.19125C4.78689 6.26948 4.72927 6.36609 4.69771 6.47229C4.66616 6.57848 4.66167 6.69088 4.68467 6.79925C4.70067 6.87592 5.092 8.69392 6.19867 9.80059C7.30534 10.9073 9.12334 11.2986 9.2 11.3146C9.30837 11.3377 9.4208 11.3333 9.52702 11.3017C9.63324 11.2702 9.72984 11.2125 9.808 11.1339L10.67 10.2719L12.394 11.9959L11.0567 13.3326C10.2247 13.3186 7.378 13.0953 5.14134 10.8579C2.89734 8.61392 2.68 5.75725 2.66667 4.94192L4.00334 3.60525ZM13.3327 7.33259H14.666C14.666 3.91259 12.084 1.33325 8.65934 1.33325V2.66659C11.3673 2.66659 13.3327 4.62858 13.3327 7.33259Z"
                      fill="white" />
                    <path
                      d="M8.66599 5.33333C10.068 5.33333 10.666 5.93133 10.666 7.33333H11.9993C11.9993 5.18333 10.816 4 8.66599 4V5.33333Z"
                      fill="white" />
                  </svg>&nbsp;&nbsp;(12345)67890</NavLink></li>
                </ul>
              </div>
              <div className="th-right">
                <ul>
                  <li>
                    {isAuthenticated === true ?
                      <Dropdown>
                        <Dropdown.Toggle  className="link" style={{color: "#ffba5a"}} as={NavLink} id="my-dropdown"> Profile</Dropdown.Toggle>
                        <Dropdown.Menu>
                          <ul>
                            <li> <Dropdown.Item as={NavLink} to="/my-account">My Account</Dropdown.Item>
                            </li>
                            <li>
                              <Dropdown.Item as={NavLink} to="/my-address">My Address</Dropdown.Item>
                            </li>
                            <li>
                              <Dropdown.Item as={NavLink} to="/my-oreders">My Orders</Dropdown.Item>
                            </li>
                          </ul>
                        </Dropdown.Menu>
                      </Dropdown>
                      :
                      <NavLink className="link" to='/registration'> Register</NavLink>}
                  </li>
                  <li><NavLink className="link">/</NavLink></li>
                  <li>{isAuthenticated === true ? <NavLink className="link" to='' onClick={handelLogOut}> LogOut
                  </NavLink> : <NavLink className="link" to='/login'> LogIn</NavLink>}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NavBar />

    </Fragment>
  )
}

export default Header