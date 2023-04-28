import React, { useState, useEffect } from 'react'
import { getCartItems, removeQuantity, removeItemsFromCart } from "../../../action/CartAction"
import { addItemsToCart } from "../../../action/CartAction"
import { useDispatch } from "react-redux";
import ConfirmationDialog from "./ConfirmationDialog.js"
// import "./CartItem.css"

const CartItems = ({ items }) => {

  const dispatch = useDispatch();

  const token = localStorage.getItem("userDetails");
  const dataToken = JSON.parse(token)

  const [qnty, setQuantity] = useState(items.quantity);
  const [totalPrice, setTotalPrice] = useState(items.total);
  // const [removeQ, setRemoveQ] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [itemIdToRemove, setItemIdToRemove] = useState()

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

    setShowConfirmDialog(true);
    setItemIdToRemove(id);
  }

  const handleConfirmRemove = () => {
    dispatch(removeItemsFromCart(dataToken.token, itemIdToRemove, dataToken.user.id));
    setShowConfirmDialog(false);
  };

  const handleCancelRemove = () => {
    setShowConfirmDialog(false);
  };


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

      {showConfirmDialog && (
        <ConfirmationDialog
          message="Are you sure you want to remove this item?"
          onConfirm={handleConfirmRemove}
          onCancel={handleCancelRemove}
        />
      )}
    </>
  )
}

export default CartItems