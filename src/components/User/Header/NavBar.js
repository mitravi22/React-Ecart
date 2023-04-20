import React from 'react'
import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
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
                      <li><NavLink to='/products/'>Apparels</NavLink></li>
                      <li><NavLink to='/products/'>Furniture</NavLink></li>
                      <li><NavLink to='/products/'>Appliances</NavLink></li>
                      <li><NavLink to='/aboutus'>About Us</NavLink></li>
                      <li><NavLink to='/contactus'>Contact</NavLink></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col-sm-3 col-xs-4">
                <div class="mini-cart text-right">
                  <ul>
                    <li>
                      <a class="cart-icon" href="#">
                        <i class="zmdi zmdi-shopping-cart"></i>
                        <span>3</span>
                      </a>
                      <div class="mini-cart-brief text-left">
                        <div class="cart-items">
                          <p class="mb-0">
                            You have <span>03 items</span> in your shopping bag
                          </p>
                        </div>
                        <div class="all-cart-product clearfix">
                          <div class="single-cart clearfix">
                            <div class="cart-photo">
                              <a href="#"
                              ><img src="img/cart/1.jpg" alt=""
                                /></a>
                            </div>
                            <div class="cart-info">
                              <h5><a href="#">dummy product name</a></h5>
                              <p class="mb-0">Price : $ 100.00</p>
                              <p class="mb-0">Qty : 02</p>
                              <span class="cart-delete"
                              ><a href="#"><i class="zmdi zmdi-close"></i></a
                              ></span>
                            </div>
                          </div>
                          <div class="single-cart clearfix">
                            <div class="cart-photo">
                              <a href="#"
                              ><img src="img/cart/2.jpg" alt=""
                                /></a>
                            </div>
                            <div class="cart-info">
                              <h5><a href="#">dummy product name</a></h5>
                              <p class="mb-0">Price : $ 300.00</p>
                              <p class="mb-0">Qty : 01</p>
                              <span class="cart-delete"
                              ><a href="#"><i class="zmdi zmdi-close"></i></a
                              ></span>
                            </div>
                          </div>
                        </div>
                        <div class="cart-totals">
                          <h5 class="mb-0">
                            Total <span class="floatright">$500.00</span>
                          </h5>
                        </div>
                        <div class="cart-bottom clearfix">
                          <a
                            href="#"
                            class="button-one floatleft text-uppercase"
                            data-text="View cart"
                          >View cart</a
                          >
                          <a
                            href="#"
                            class="button-one floatright text-uppercase"
                            data-text="Check out"
                          >Check out</a
                          >
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </Fragment>
  )
}

export default NavBar

