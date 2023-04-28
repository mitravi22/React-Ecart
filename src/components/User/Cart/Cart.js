import React, { Fragment, useEffect, useState } from 'react'
import "./Cart.css";
import { getCartItems, removeCart } from "../../../action/CartAction"
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CartItems from "./CartItems"
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import ConfirmationDialog from "./ConfirmationDialog.js"

const Cart = () => {

  const alert = useAlert()
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { cartItems, error } = useSelector((state) => state.cart)
  const cartData = cartItems && cartItems.length > 0 ? cartItems[0]?.CartItems : null
  // console.log(cartData,"lll")

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const token = localStorage.getItem("userDetails");
  const dataToken = JSON.parse(token)

  const handleRemoveAllproduct = () => {
    setShowConfirmDialog(true);

    // dispatch(removeCart(dataToken.token, dataToken.user.id))
    // //  toast.error('Delete All Items From Your Cart');
    // //  navigate('/products');
  }

  const handleConfirmRemove = () => {
    dispatch(removeCart(dataToken.token, dataToken.user.id))
    setShowConfirmDialog(false);
  };

  const handleCancelRemove = () => {
    setShowConfirmDialog(false);
  };

  useEffect(() => {

    if (error) {
      alert.error(error)
    }
    dispatch(getCartItems(dataToken.token, dataToken.user.id))
  }, [dispatch])

  return (

    <Fragment>
      <div className="shopping-cart">
        <div className="title">
          Shopping Cart
          {cartData && <button onClick={handleRemoveAllproduct} > Remove All </button>}
          {showConfirmDialog && (
            <ConfirmationDialog
              message="Are you sure you want to remove this item?"
              onConfirm={handleConfirmRemove}
              onCancel={handleCancelRemove}
            />
          )}
        </div>
        <Fragment>
          {cartData &&
            cartData && cartData.map((items) => (

              <div key={items.id}>
                <div key={items.id} className="item-section">
                  <div className="image-section">
                    <img className='productImg' src={items.Product.ProductImages.length
                      ? items.Product.ProductImages[0].path
                      : ""} alt={items.Product.ProductImages[0].id} />
                  </div>

                  <div className="description">
                    <span>{items.name}</span>
                    <span>₹ {items.price}</span>
                  </div>

                  <CartItems items={items} />

                  {/* <input className="total-price" readOnly name="name" value={items.total} /> */}

                </div>
              </div>

            ))
          }

        </Fragment>

        {cartData && <div className="col-md-6 col-sm-6 col-xs-12">
          <div className="customer-login payment-details mt-30">
            <h4 className="title-1 title-border text-uppercase">payment details</h4>
            <table>
              <tbody>
                <tr>
                  <td className="text-left">Cart Subtotal</td>
                  <td className="text-right">₹{cartItems[0]?.grandTotal} </td>
                </tr>
                <tr>
                  <td className="text-left">Delivery Charge</td>
                  <td className="text-right">₹ 20.00</td>
                </tr>
                <tr>
                  <td className="text-left">Grand Total</td>
                  <td className="text-right">₹ {cartItems[0]?.grandTotal + 20}</td>
                </tr>
              </tbody>
            </table>
            <Link to='/checkout'>
              <button type="submit" data-text="PROCEED TO CHECKOUT" className="button-one submit-button mt-15">PROCEED TO CHECKOUT</button>
            </Link>
          </div>
        </div>}

        {!cartData && (
          <div>
            <h1>Cart is Empty</h1>
            <Link to='/products'>Back</Link>
          </div>
        )}
      </div>
    </Fragment >
  )
}

export default Cart