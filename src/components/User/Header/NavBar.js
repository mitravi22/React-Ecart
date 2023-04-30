import React from 'react'
import { Fragment, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { removeItemsFromCart } from "../../../action/CartAction"
import { useDispatch, useSelector } from 'react-redux';
import ConfirmationDialog from "../../../components/User/Cart/ConfirmationDialog.js"

const NavBar = () => {
  const dispatch = useDispatch();

  const { isAuthenticated, userLogin } = useSelector((state) => state.userLogin)
  const { cartItems } = useSelector((state) => state.cart)

  const cartData = cartItems && cartItems.length > 0 ? cartItems[0]?.CartItems : null
  // console.log(cartData, 'cc');

  const token = localStorage.getItem("userDetails");
  const dataToken = JSON.parse(token)

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [itemIdToRemove, setItemIdToRemove] = useState()

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

  return (
    <Fragment>
      <header id="sticky-menu" className="header header-2">
        <div className="header-area">
          <div className="container">
            <div className="row">
              <div className="col-sm-9 col-xs-8">
                <div className="header-left">
                  <div className="logo">
                    <NavLink to="/" ><img src="assets/img/home/ecart-logo.png" alt="" /></NavLink><br />
                  </div>
                  <div className="desktop-menu">
                    <ul>
                      <li><NavLink to='/'>Home</NavLink></li>
                      <li><NavLink to='/products'>Products</NavLink></li>
                      {/* <li><Link to='/products/:id'>Apparels</Link></li>
                      <li><Link to='/products/:id'>Furniture</Link></li>
                      <li><Link to='/products/:id'>Appliances</Link></li> */}
                      <li><NavLink to='/aboutus'>About Us</NavLink></li>
                      <li><NavLink to='/contactus'>Contact</NavLink></li>
                    </ul>
                  </div>
                </div>
              </div>

              {isAuthenticated === true ? <div className="col-sm-3 col-xs-4">
                <div className="mini-cart text-right">
                  <ul>
                    <li>
                      {/* {!cartData
                        ? <Link className="cart-icon"  >
                          <i className="zmdi zmdi-shopping-cart"></i>
                          <span>{cartData?.length === null ? "" : cartData?.length}</span>
                        </Link>

                        : <Link className="cart-icon" to='/cart' >
                          <i className="zmdi zmdi-shopping-cart"></i>
                          <span>{cartData?.length === null ? "" : cartData?.length}</span>
                        </Link>
                      } */}
                      <Link className="cart-icon" to='/cart' >
                        <i className="zmdi zmdi-shopping-cart"></i>
                        <span>{cartData?.length === null ? "" : cartData?.length}</span>
                      </Link>
                      <div className="mini-cart-brief text-left">
                        {!cartData
                          ? <div className="cart-items">
                            <p className="mb-0">
                              You have 0 item in your shopping bag
                            </p>
                          </div>
                          : <>
                            <div className="cart-items">
                              <p className="mb-0">
                                You have <span>{cartData?.length === null ? "" : cartData?.length}</span> in your shopping bag
                              </p>
                            </div>
                            <div className="all-cart-product clearfix">
                              {cartData &&
                                cartData && cartData.map((items) => (
                                  <div key={items.id} className="single-cart clearfix">
                                    <div className="cart-photo">
                                      <img src={items.Product.ProductImages.length
                                        ? items.Product.ProductImages[0].path
                                        : ""} alt={items.Product.ProductImages[0].id} />
                                    </div>
                                    <div className="cart-info">
                                      <h5>{items.name}</h5>
                                      <p className="mb-0">Price : ₹ {items.price}</p>
                                      <p className="mb-0">Qty : {items.quantity}</p>
                                      <span className="cart-delete">
                                        <i className="zmdi zmdi-close" onClick={() => { handleRemoveCartItem(items.id) }}></i>
                                      </span>
                                    </div>
                                   
                                  </div>
                                ))
                              }
                               {showConfirmDialog && (
                                      <ConfirmationDialog
                                        message="Are you sure you want to remove this item?"
                                        onConfirm={handleConfirmRemove}
                                        onCancel={handleCancelRemove}
                                      />
                                    )}

                            </div>
                            <div className="cart-totals">
                              <h5 className="mb-0">
                                Total <span className="floatright">₹ {cartItems[0]?.grandTotal}</span>
                              </h5>
                            </div>
                            <div className="cart-bottom clearfix">
                              <Link
                                to='/cart'
                                className="button-one floatleft text-uppercase"
                                data-text="View cart"
                              >View cart</Link>
                              <Link
                                to='/checkout'
                                className="button-one floatright text-uppercase"
                                data-text="Check out"
                              >Check out</Link>
                            </div>
                          </>
                        }

                      </div>
                    </li>
                  </ul>
                </div>
              </div>
                : ""}

            </div>
          </div>
        </div>
      </header>
    </Fragment>
  )
}

export default NavBar

