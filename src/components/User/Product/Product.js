import React, { Fragment, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Dropdown } from 'react-bootstrap';
import Categories from './Categories';
import { getAllProduct, clearErrors } from '../../../action/ProductAction'
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Lodder from "../layout/Loader";

const Product = () => {

  const dispatch = useDispatch();
  const alert = useAlert();

  const { allproduct, error } = useSelector((state) => state.allProduct);

  console.log(allproduct, "all")

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(getAllProduct());
  }, []);

  return (
    <div>
      <div className="wrapper bg-dark-white">

        <div className="heading-banner-area overlay-bg">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="heading-banner">
                  <div className="heading-banner-title">
                    <h2>Products</h2>
                  </div>
                  <div className="breadcumbs pb-15">
                    <ul>
                      <li><NavLink to='/'>Home</NavLink></li>
                      <li>Products</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="product-area pt-80 pb-80 product-style-2">
          <div className="container">

            <div className="row">
              <div className="col-md-3 col-sm-12 col-xs-12">
                <aside className="widget widget-search mb-30">
                  <form action="">
                    <input type="text" placeholder="Search here..." />
                    <button type="submit">
                      <i className="zmdi zmdi-search"></i>
                    </button>
                  </form>
                </aside>

                <Categories />

              </div>

              <div className="col-md-9 col-sm-12 col-xs-12">

                <div className="shop-content mt-tab-30 mt-xs-30">
                  <div className="product-option mb-30 clearfix">

                    <ul className="shop-tab">
                      <li className="active"><a href="#grid-view" data-toggle="tab"><i
                        className="zmdi zmdi-view-module"></i></a></li>
                      <li><a href="#list-view" data-toggle="tab"><i className="zmdi zmdi-view-list"></i></a>
                      </li>
                    </ul>
                    <div className="showing text-right hidden-xs">
                      <p className="mb-0">Showing 01-09 of 17 Results</p>
                    </div>
                  </div>

                  <div className="tab-content">

                    <div className="tab-pane active" id="grid-view">
                      <div className="row">
                        {allproduct && allproduct.length > 0 && (
                          <>
                            {allproduct?.map((products) => (
                              <div key={products.id} className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                <div className="single-product">
                                  <Fragment >
                                    <div className="product-img">
                                      <span className="pro-label new-label">new</span>
                                      <NavLink to={`/products-details/${products.id}`}>
                                        <img
                                          src={
                                            products.ProductImages.length
                                              ? products.ProductImages[0]
                                                .path
                                              : ""
                                          }
                                          alt={products.ProductFlat.name}
                                        />
                                      </NavLink>
                                    </div>
                                    <div className="product-info clearfix text-center">
                                      <div className="fix">
                                        <h4 className="post-title">{products.ProductFlat.name}</h4>
                                        <div className="product-price"><span
                                          className="price-1">${products.ProductFlat.price}</span></div>
                                      </div>
                                    </div>
                                  </Fragment>
                                </div>
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                    </div>



                    <div className="tab-pane" id="list-view">

                      {allproduct && allproduct.length > 0 && (
                        <>
                          {allproduct?.map((products) => (

                            <div key={products.id} className="row shop-list">
                              <div className="col-lg-12">
                                <div className="single-product clearfix">
                                  <div className="product-img">
                                    <span className="pro-label new-label">new</span>
                                    <NavLink to={`/products-details/${products.id}`}>
                                        <img
                                          src={
                                            products.ProductImages.length
                                              ? products.ProductImages[0]
                                                .path
                                              : ""
                                          }
                                          alt={products.ProductFlat.name}
                                        />
                                      </NavLink>
                                  </div>
                                  <div className="product-info">
                                    <div className="fix">
                                      <h4 className="post-title floatleft">{products.ProductFlat.name}</h4>
                                    </div>
                                    <div className="product-price mb-10"><span
                                      className="price-1">${products.ProductFlat.price}</span></div>
                                    <div className="product-description">
                                      <p dangerouslySetInnerHTML={{ __html: products.ProductFlat.description }} />
                                    </div>
                                  </div>
                                </div>
                              </div>

                            </div>
                          ))}

                        </>
                      )}


                    </div>

                  </div>

                  <div className="shop-pagination  text-center">
                    <div className="pagination">
                      <ul>
                        <li><a href="#"><i className="zmdi zmdi-long-arrow-left"></i></a></li>
                        <li><a href="#">01</a></li>
                        <li className="active"><a href="#">02</a></li>
                        <li><a href="#">03</a></li>
                        <li><a href="#">04</a></li>
                        <li><a href="#">05</a></li>
                        <li><a href="#"><i className="zmdi zmdi-long-arrow-right"></i></a></li>
                      </ul>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product