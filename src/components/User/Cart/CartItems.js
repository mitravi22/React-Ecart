import React, { useState, useEffect } from 'react'
import { getCartItems, removeQuantity, removeItemsFromCart } from "../../../action/CartAction"
import { addItemsToCart } from "../../../action/CartAction"
import { useDispatch } from "react-redux";

const CartItems = ({ items }) => {

    const dispatch = useDispatch();

    const token = localStorage.getItem("userDetails");
    const dataToken = JSON.parse(token)

    const [qnty, setQuantity] = useState(items.quantity);
    const [totalPrice, setTotalPrice] = useState(items.total)

    const increaseQuantity = (id) => {

        dispatch(addItemsToCart(dataToken.token, dataToken.user.id, id, 1));
        let newQty = qnty + 1;
        setQuantity(newQty);
        let newTotalPrice = newQty * items.price;
        setTotalPrice(newTotalPrice);
        dispatch(getCartItems(dataToken.token, dataToken.user.id));
    };

    const decreaseQuantity = (id) => {

        dispatch(removeQuantity(dataToken.token, id))
        let newQty = qnty - 1;
        if (newQty >= 1) {
            setQuantity(newQty);
            let newTotalPrice = newQty * items.price;
            setTotalPrice(newTotalPrice);
        }
    };

    const handleQuantityChange = (event) => {
        const newQuantity = parseInt(event.target.value);
        setQuantity(newQuantity);
        let newTotalPrice = newQuantity * items.price;
        setTotalPrice(newTotalPrice);
        dispatch(getCartItems(dataToken.token, dataToken.user.id));
    }

    const handleRemoveCartItem = (id) => {
        dispatch(removeItemsFromCart(dataToken.token, id))
    }


  useEffect(() => {
    dispatch(getCartItems(dataToken.token, dataToken.user.id))
  }, [dispatch])

    return (
        <>
            <div className="quantity-section">

                <button className="minus-btn" onClick={() => { decreaseQuantity(items.id) }} type="button" name="button" >
                    <img src="https://designmodo.com/demo/shopping-cart/minus.svg" alt="" />
                </button>

                <input readOnly type="text" name="name" onChange={handleQuantityChange} value={qnty} />

                <button className="plus-btn" onClick={() => { increaseQuantity(items.productId) }} type="button" name="button">
                    <img src="https://designmodo.com/demo/shopping-cart/plus.svg" alt="" />
                </button>
            </div>

            <input className="total-price" readOnly name="name" value={"₹" + " " + totalPrice} />

            <div className="buttons">
                <span className="delete-btn" onClick={() => { handleRemoveCartItem(items.id) }}></span>
            </div>
        </>
    )
}

export default CartItems