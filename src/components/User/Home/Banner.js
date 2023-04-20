import React, { Fragment } from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import "./LatestProduct.css"

const options = {
  items: 1,
  nav: true,
  navText: ["<div className='nav-btn prev-slide'></div>", "<div className='nav-btn next-slide'></div>"],
  rewind: true,
  autoplay: true,
  autoplayTimeout: 3000,
  slideBy: 1,
  dots: true,
  dotsEach: true,
  dotData: true
};

const Banner = ({ banner }) => {

  return (
    <Fragment>
      <section className="slider-area slider-style-2">
        <div className="bend niceties preview-2">
          <div id="ensign-nivoslider" className="slides">
            <OwlCarousel margin={10} {...options} >
              {
                banner && banner.map((banners) => (
                    <span  key={banners.id}>
                      <img  src={banners.path} alt={banners.title} />
                      <div className="image-text">
                        <h1>{banners.title}</h1>
                        <p>{banners.content}</p>
                      </div>
                    </span>
                ))
              }
            </OwlCarousel>

          </div>
        </div>
      </section>

    </Fragment>
  )
}

export default Banner

{/* <SimpleImageSlider
width={1300}
height={500}
images={images}
showBullets={true}
showNavs={true}
slideDuration={0.5}
autoPlay= {true}
loop={true}
autoPlayDelay={2.0}
/> */}

