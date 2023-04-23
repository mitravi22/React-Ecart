import React, { Fragment } from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { NavLink } from 'react-router-dom';

const options = {
  items: 4,
  nav: true,
  loop: true,
  navText: ["<div className='nav-btn prev-slide'></div>", "<div className='nav-btn next-slide'></div>"],
  autoplay: true,
  autoplayTimeout: 3000,
  dots: true,
  dotsEach: true,
  dotData: true,
};

const FeaturedProduct = ({ featureProduct }) => {
  return (
    <Fragment>

      <div className="product-area pt-80 pb-30 product-style-2">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center">
                <h2 className="title-border">Featured Products</h2>
              </div>
            </div>
          </div>

          <div className="row cus-row-30">
            <div className="product-slider arrow-left-right">
            {featureProduct && featureProduct.length > 0 && (
              <OwlCarousel margin={10} {...options} >
              {
                featureProduct.map((featured) => (
                  <Fragment key={featured.id}>

                    <div className="single-product">
                      <div className="product-img">
                        <span className="pro-label sale-label">sale</span>
                        <NavLink to={`/products-details?id=${featured.id}`}>
                          <img src={featured.path} alt={featured.name} />
                        </NavLink>
                      </div>

                      <div className="product-info clearfix text-center">
                        <div className="fix">
                          <h4 className="post-title">{featured.name}</h4>
                          <div className="product-price">
                            <span className="price-1">${featured.price}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Fragment>

                ))
              }
            </OwlCarousel>
            )}

            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default FeaturedProduct



