
import axios from "axios";
import {
    ADD_TO_CART,
    REMOVE_CART_ITEM ,
    SAVE_SHIPPING_INFO
} from "../constant/CartConstant"

// Add to Crat

export const addItemsToCart = (token,customerId, productId,quantity) => async (dispatch, getState) => {

    const { data } = await axios.post('/api/user-cart/create', {customerId, productId},{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.Stock,
            quantity,
        },
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

// Remove from cart

export const removeItemsFromCart = (id,token) => async (dispatch, getState) => {

    const {data} = await axios.delete(`/api/user-cart/remove-cart/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    dispatch({
        type:  REMOVE_CART_ITEM ,
        payload: data,
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// SAVE SHIPPING INFO

export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data,
    });

    localStorage.setItem("shippingInfo", JSON.stringify(data));
};