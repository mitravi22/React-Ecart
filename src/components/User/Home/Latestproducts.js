import React, { Fragment, useEffect } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./LatestProduct.css";
import { getLatestProducts } from "../../../action/HomeAction";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { NavLink } from "react-router-dom";

const options = {
  items: 4,
  nav: true,
  loop: true,
  navText: [
    "<div className='nav-btn prev-slide'></div>",
    "<div className='nav-btn next-slide'></div>",
  ],
  autoplay: true,
  autoplayTimeout: 3000,
  dots: true,
  dotsEach: true,
  dotData: true,
};

const Latestproducts = ({ latest }) => {
  const alert = useAlert();

  const dispatch = useDispatch();

  // const { latest, error } = useSelector((state) => state.latest);
 // console.log(latest, "latest");

  const handleButtonClick = (param) => {
    if (param === "newArrival") {
      dispatch(getLatestProducts("newArrival"));
    } else if (param === "bestSeller") {
      dispatch(getLatestProducts("bestSeller"));
    } else if (param === "mostView") {
      dispatch(getLatestProducts("mostView"));
    }
  };

  return (
    <Fragment>
      <div className="purchase-online-area pt-80 product-style-2">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center">
                <h2 className="title-border">Latest Products</h2>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12  text-left">
              <ul className="tab-menu clearfix">
                <li className="active">
                  <a
                    data-toggle="tab"
                    onClick={() => handleButtonClick("newArrival")}
                  >
                    New Arrivals
                  </a>
                </li>
                <li>
                  <a
                    data-toggle="tab"
                    onClick={() => handleButtonClick("bestSeller")}
                  >
                    Best Seller{" "}
                  </a>
                </li>
                <li>
                  <a
                    data-toggle="tab"
                    onClick={() => handleButtonClick("mostView")}
                  >
                    Most View{" "}
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-lg-12">
              <div className="tab-content">
                <div className="tab-pane active" id="new-arrivals">
                  <div className="row">
                    {latest && latest.length > 0 && (
                      <>
                        <OwlCarousel margin={10} {...options}>
                          {latest.map((latestproduct) => (
                            < Fragment key={latestproduct.id}>
                              <div key={latestproduct.id}>
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 latestproduct">
                                  <div className="single-product">
                                    <div className="product-img">
                                      <NavLink
                                        to={`/products-details/${latestproduct.id}`}
                                      >
                                        <img
                                          src={
                                            latestproduct.ProductImages.length
                                              ? latestproduct.ProductImages[0]
                                                  .path
                                              : ""
                                          }
                                          alt={latestproduct.ProductFlat.name}
                                        />
                                      </NavLink>
                                    </div>
                                    <div className="product-info">
                                      <div className="fix">
                                        <h4 className="post-title">
                                          {latestproduct.ProductFlat.name}
                                        </h4>
                                        <div className="product-price">
                                          <span className="price-1">
                                            ${latestproduct.ProductFlat.price}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Fragment>
                          ))}
                        </OwlCarousel>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Latestproducts;
