import React from 'react'
import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const NavBar = () => {

  const { isAuthenticated, userLogin } = useSelector((state) => state.userLogin);
  const {cartItems} = useSelector((state) => state.cart)
  // console.log(cartItems[0].length,"ff");

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
                      <li><Link to='/products/:id'>Apparels</Link></li>
                      <li><Link to='/products/:id'>Furniture</Link></li>
                      <li><Link to='/products/:id'>Appliances</Link></li>
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
                      <Link className="cart-icon" to='/cart' >
                        <i className="zmdi zmdi-shopping-cart"></i>
                        {/* <span>{cartItems[0].length === null ? "" : cartItems[0].length  }</span> */}
                      </Link>
                      <div className="mini-cart-brief text-left">
                        <div className="cart-items">
                          <p className="mb-0">
                            You have <span>03 items</span> in your shopping bag
                          </p>
                        </div>
                        <div className="all-cart-product clearfix">
                          <div className="single-cart clearfix">
                            <div className="cart-photo">
                              <a href="#"
                              ><img src="img/cart/1.jpg" alt=""
                                /></a>
                            </div>
                            <div className="cart-info">
                              <h5><a href="#">dummy product name</a></h5>
                              <p className="mb-0">Price : $ 100.00</p>
                              <p className="mb-0">Qty : 02</p>
                              <span className="cart-delete"
                              ><a href="#"><i className="zmdi zmdi-close"></i></a
                              ></span>
                            </div>
                          </div>
                          <div className="single-cart clearfix">
                            <div className="cart-photo">
                              <a href="#"
                              ><img src="img/cart/2.jpg" alt=""
                                /></a>
                            </div>
                            <div className="cart-info">
                              <h5><a href="#">dummy product name</a></h5>
                              <p className="mb-0">Price : $ 300.00</p>
                              <p className="mb-0">Qty : 01</p>
                              <span className="cart-delete"
                              ><a href="#"><i className="zmdi zmdi-close"></i></a
                              ></span>
                            </div>
                          </div>
                        </div>
                        <div className="cart-totals">
                          <h5 className="mb-0">
                            Total <span className="floatright">$500.00</span>
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

