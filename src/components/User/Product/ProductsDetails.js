import React, { Fragment, useEffect } from 'react'
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


const ProductDetails = () => {

  const alert = useAlert()
  const dispatch = useDispatch();
  const params = useParams();

  const { isAuthenticated } = useSelector((state) => state.userLogin);

  const { product, loading, error } = useSelector((state) => state.product)

  const handleClick = () => {
    if(isAuthenticated === true){
      toast.success('Product add successfully');
    }else{
      toast.error('You want to login ');
    }
  };

  // console.log(product.ProductFlat?.name,"pro")

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    value: product.rating,
    size: window.innerWidth < 600 ? 20 : 25,
    isHalf: true,
    readOnly: true,
    precision: 0.5,
  };

  useEffect(() => {
    validateUser()
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
    dispatch(productDetails(params.id))
  }, [dispatch, params.id, error, alert, isAuthenticated])

  function validateUser() {
    let userDetails = localStorage.getItem('userDetails');
    if (userDetails) {
      userDetails = JSON.parse(userDetails);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: userDetails
      })
    }
  };
  return (
    <Fragment>
      {loading ? <Lodder /> : (<Fragment>
        <div className='ProductDetails'>
          <div>
            {product.ProductImages && product.ProductImages.map((item, i) => (

              <img className='CarouselImage'
                key={item.id}
                src={item.path}
                alt={`${i} Slide`}
              />
            ))}
          </div>
          <div>
            <div className='detailsBlock-1'>
              <h2>{product.ProductFlat?.name}</h2>
              <p>Product # {product.ProductFlat?._id}</p>
            </div>
            <div className='detailsBlock-2'>
              <ReactStars {...options} />
              <span>(4 Reviews)</span>
            </div>
            <div className='detailsBlock-3'>
              <h1>{`₹ ${product.ProductFlat?.price}`}</h1>
              <div className='detailsBlock-3-1'>
                <div className='detailsBlock-3-1-1'>
                  <button> - </button>
                  <input value="1" type="number" />
                  <button> + </button>
                </div>
                <div className='butn'>
                  <button onClick={handleClick}>Add to Cart</button>
                </div>
              </div>
              <p>
                Status:
                <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                  {product.stock < 1 ? "OutOfStock" : "InStock"}
                </b>
              </p>

            </div>

            <div className='detailsBlock-4'>
              Description : {product.ProductFlat?.description}
            </div>

          </div>
        </div>
      </Fragment>)}
    </Fragment>
  )
}

export default ProductDetails