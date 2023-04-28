import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import "./ProductDetails.css"
import { productDetails, clearErrors } from "../../../action/ProductAction"
import { useSelector, useDispatch } from "react-redux";
import ReactStars from "react-rating-stars-component"
import Lodder from "../layout/Loader"
import { useAlert } from "react-alert";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LOGIN_SUCCESS } from '../../../constant/AuthConstant';
import { useLocation } from 'react-router-dom';
import { FaMinus, FaPlus } from "react-icons/fa";
import { addItemsToCart } from "../../../action/CartAction"
import { getCartItems } from "../../../action/CartAction"
import { NavLink } from 'react-router-dom';

const ProductDetails = () => {

  const alert = useAlert()
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');

  const { isAuthenticated } = useSelector((state) => state.userLogin);

  const { product, loading, error } = useSelector((state) => state.product)

  // console.log(product, "ppp")

  const [quantity, setQuantity] = useState(1)

  const handleIncrement = () => {
    if (quantity < 5) {
      setQuantity(quantity + 1)
    }
  }

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  let handleChange = (e) => {
    setQuantity(e.target.value);
  }

  const handleClick = () => {
    toast.error('You want to login ');
  };

  const token = localStorage.getItem("userDetails");
  const dataToken = JSON.parse(token)

  const addToCartHandler = () => {
    dispatch(addItemsToCart(dataToken.token, dataToken.user.id, id, quantity,));
    dispatch(getCartItems(dataToken.token, dataToken.user.id))
    alert.success("Item Added To Cart", {
      timeout: 1000
    });
  };

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    // value: product.rating,
    size: window.innerWidth < 600 ? 20 : 25,
    isHalf: true,
    readOnly: true,
    precision: 0.5,
  };

  useEffect(() => {
    // validateUser()
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
    dispatch(productDetails(id))
  }, [dispatch, id, error, alert, isAuthenticated])

  // function validateUser() {
  //   let userDetails = localStorage.getItem('userDetails');
  //   if (userDetails) {
  //     userDetails = JSON.parse(userDetails);
  //     dispatch({
  //       type: LOGIN_SUCCESS,
  //       payload: userDetails
  //     })
  //   }
  // };
  return (
    <Fragment>
      {loading ? <Lodder /> : (<Fragment>
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
                        <li>
                          <NavLink to="/">Home</NavLink>
                        </li>
                        <li> <NavLink to="/products">Product Page</NavLink></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='ProductDetails'>
          <div>
            {product?.ProductImages && product?.ProductImages?.map((item, i) => (

              <img className='CarouselImage'
                key={item.id}
                src={item.path}
                alt={`${i} Slide`}
              />
            ))}
          </div>
          <div>
            <div className='detailsBlock-1'>
              <h2>{product?.ProductFlat?.name}</h2>
            </div>
            <div className='detailsBlock-2'>
              <ReactStars {...options} />
              <span>(4 Reviews)</span>
            </div>
            <div className='detailsBlock-3'>

              {
                product?.ProductInventory?.qty < 1
                  ? ""
                  : <>
                    <h1>{`₹ ${product?.ProductFlat?.price}`}</h1>
                    <div className='detailsBlock-3-1'>
                      <div className='detailsBlock-3-1-1'>
                        <button onClick={handleDecrement} ><FaMinus /></button>
                        <span className='quantity' onChange={handleChange}>{quantity}</span>
                        <button onClick={handleIncrement}><FaPlus /></button>
                      </div>
                      {
                        isAuthenticated === true
                          ? <div className='butn'>
                            <button
                              onClick={addToCartHandler}
                            >Add to Cart</button>
                          </div>
                          : <div className='butn'>
                            <button
                              onClick={handleClick}
                            >Add to Cart</button>
                          </div>
                      }
                    </div>
                  </>
              }

              <p>
                Status:
                <b className={product?.ProductInventory?.qty < 1 ? "redColor" : "greenColor"}>
                  {product?.ProductInventory?.qty < 1 ? "OutOfStock" : "InStock"}
                </b>
              </p>

            </div>

            <div className='detailsBlock-4'>
              Description : <span dangerouslySetInnerHTML={{ __html: product?.ProductFlat?.description }}></span>
              {/* {product.ProductFlat?.description} */}
            </div>

          </div>
        </div>
      </Fragment>)}
    </Fragment>
  )
}

export default ProductDetails