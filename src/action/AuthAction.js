
import axios from "axios";
import {
    REGISTRATION_REQUEST,
    REGISTRATION_SUCCESS,
    REGISTRATION_FAIL,

    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,

    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,

    FORGET_PASSWORD_REQUEST,
    FORGET_PASSWORD_SUCCESS,
    FORGET_PASSWORD_FAIL,

    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,

    CLEAR_ERROR
  
} from "../constant/AuthConstant";


// Registration Action

export const registrationUser = (userData) => async (dispatch) => {

    try {

        dispatch({
            type: REGISTRATION_REQUEST,
        })

        const config = { headers: {"Content-Type": "application/json"}}

        const { data } = await axios.post('/api/user-auth/register', userData, config);

        console.log(data,"reg")

        dispatch({
            type: REGISTRATION_SUCCESS,
            payload: data
        })

        
    } catch (error) {
        
        dispatch({
            type: REGISTRATION_FAIL,
            payload: error.response.data.message,
        })
    }
}

// Login Action

export const loginUser = (email, password) => async (dispatch) => {

    try {

        dispatch({
            type: LOGIN_REQUEST
        })

        const config = { headers: {"Content-Type": "application/json"}}

        const { data } = await axios.post('/api/user-auth/login', {email,password}, config)
         localStorage.setItem('userDetails',JSON.stringify(data.result))


        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.result
        })

    } catch (error) {

        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message,
        })
    }
}

// Forget Password Action

export const forgetPasswordUser = (email) => async (dispatch) => {

    try {

        dispatch({
            type: FORGET_PASSWORD_REQUEST
        })

        const config = { headers: {"Content-Type": "application/json"}}

        const { data } = await axios.post('/api/user-auth/forgot-password', {email}, config)

        console.log(data, "forget")

        dispatch({
            type: FORGET_PASSWORD_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: FORGET_PASSWORD_FAIL,
            payload: error.response.data.message,
        })
    }
}

// Update Password Action 

export const resetPasswordUser = (token,password) => async (dispatch) => {

    try {

        dispatch({
            type: RESET_PASSWORD_REQUEST
        })

        const config = { headers: {"Content-Type": "application/json"}}

        const { data } = await axios.post('/api/user-auth/reset-password', {password,token}, config)

        dispatch({
            type: RESET_PASSWORD_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: RESET_PASSWORD_FAIL,
            payload: error.response.data.message,
        })
    }
}

// Load User Action 

export const loadUserDetails = (token) => async (dispatch) => {

    try {
        
        dispatch({
            type: LOAD_USER_REQUEST
        })

        const {data} = await axios.get('/api/user-auth/user',{
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data
        })
    } catch (error) {
        
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message
        })
    }
}


// Clear All Error


export const clearErrors = (dispatch) => {

    dispatch({
        type: CLEAR_ERROR
    })
}