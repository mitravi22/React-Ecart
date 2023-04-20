
import axios from "axios";

import {
    CONTACT_US_REQUEST,
    CONTACT_US_SUCCESS,
    CONTACT_US_FAIL
} from "../constant/ContactUs"

export const contactUsAction = (email,name,message) => async (dispatch) => {

    try {

        dispatch({
            type: CONTACT_US_REQUEST,
        })

        const config = { headers: {"Content-Type": "application/json"}}

        const { data } = await axios.post('/api/admin-contact/create',{email,name,message},config );

        console.log(data,"contact")

        dispatch({
            type: CONTACT_US_SUCCESS,
            payload: data
        })

        
    } catch (error) {
        
        dispatch({
            type: CONTACT_US_FAIL,
            payload: error.response.data.message,
        })
    }
}