
import axios from "axios";
import {
    ADD_TO_CART,
    REMOVE_CART,
    GET_TO_CART_ITEMS,
    SAVE_SHIPPING_INFO,
    REMOVE_QUANTITY,
    REMOVE_SINGLE_ITEM
} from "../constant/CartConstant"

// Add to Crat

export const addItemsToCart = (token, customerId, productId, quantity) => async (dispatch) => {


    try {

        const { data } = await axios.post('/api/user-cart/create', { customerId, productId, quantity }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        dispatch({
            type: ADD_TO_CART,
            payload: data
        })
        
    } catch (error) {
        console.log(error);
    }

}

// Get Cart

export const getCartItems = (token, customerId) => async (dispatch, getState) => {

    try {

        const { data } = await axios.get(`/api/user-cart/items/customer/${customerId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        dispatch({
            type: GET_TO_CART_ITEMS,
            payload: data.result.data
        })

    } catch (error) {
        console.error(error);
    }


    // localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

// Remove Quantity 

export const removeQuantity = (token, id) => async (dispatch) => {

    try {
        const { data } = await axios.delete(`/api/user-cart/remove-quantity/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        dispatch({
            type: REMOVE_QUANTITY,
            payload: data,
        });
    } catch (error) {
        console.error(error);
        // Handle error
    }

    // localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}

// Remove Product from cart

export const removeItemsFromCart = (token, id,userId) => async (dispatch) => {

    try {

        const { data } = await axios.delete(`/api/user-cart/remove-product/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    
        dispatch(getCartItems(token, userId))
        
    } catch (error) {
        console.log(error); 
    }

    

    // localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// Remove Cart 

export const removeCart = (token, customerId) => async (dispatch) => {

    try {

        const { data } = await axios.delete(`/api/user-cart/remove-cart/${customerId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    
        dispatch(getCartItems(token, customerId))
        
    } catch (error) {
        console.log(error); 
    }

    

    // localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// SAVE SHIPPING INFO

export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data,
    });

    localStorage.setItem("shippingInfo", JSON.stringify(data));
};