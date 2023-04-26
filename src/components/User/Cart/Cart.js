import React, { Fragment, useEffect, useState } from 'react'
import "./Cart.css";
import { getCartItems } from "../../../action/CartAction"
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {

  const alert = useAlert()
  const dispatch = useDispatch();

  const { cartItems, error } = useSelector((state) => state.cart)
  console.log(cartItems);

  const token = localStorage.getItem("userDetails");
  const dataToken = JSON.parse(token)

  // const [quantity, setQuantity] = useState()

  // const increaseQuantity = (quantity) => {
  //   const newQty = quantity + 1;
  //   setQuantity(newQty)
  // };

  // const decreaseQuantity = (quantity) => {
  //   const newQty = quantity - 1;
  //     setQuantity(newQty)
  // };

  useEffect(() => {

    if (error) {
      alert.error(error)
    }
    dispatch(getCartItems(dataToken.token, dataToken.user.id))
  }, [dispatch, error, alert])

  return (
    <Fragment>

      <div className="shopping-cart">
        <div className="title">
          Shopping Cart
        </div>
        {!cartItems ? <div><h3>No Cart Found</h3></div> :
          <Fragment>
            {
              cartItems[0]?.map((items) => (

                <div key={items.id} className="item-section">
                  <div className="image-section">
                    <img className='productImg' src={items.Product.ProductImages.length
                      ? items.Product.ProductImages[0].path
                      : ""} alt={items.Product.ProductImages[0].id} />
                  </div>

                  <div className="description">
                    <span>{items.name}</span>
                    <span>₹{items.price}</span>
                  </div>

                  <div className="quantity-section">
                    <button className="minus-btn" type="button" name="button">
                      <img src="https://designmodo.com/demo/shopping-cart/minus.svg" alt="" />
                    </button>

                    <input type="text" name="name" value={items.quantity} />

                    <button className="plus-btn" type="button" name="button">
                      <img src="https://designmodo.com/demo/shopping-cart/plus.svg" alt="" />
                    </button>
                  </div>

                  <div className="total-price">₹{items.quantity * items.price}</div>

                  <div className="buttons">
                    <span className="delete-btn"></span>
                  </div>
                </div>
              ))
            }
          </Fragment>

        }
      </div>
    </Fragment >
  )
}

export default Cart