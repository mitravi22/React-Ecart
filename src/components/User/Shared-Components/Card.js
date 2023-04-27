import {React,Fragment } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from "react-router-dom";

const Card = ({products,imageTag})=>{
   return(<div className="single-product">
    <Fragment>
      <div className="product-img">
        {(imageTag && imageTag.toLowerCase() == 'sale')&&<span className="pro-label sale-label">Sale</span>}
        {(imageTag && imageTag.toLowerCase() == 'new')&&<span className="pro-label new-label">New</span>}
        <NavLink
          to={`/products-details?id=${products.id}`}
        >
          <img
            src={
              products?.ProductImages?.length
                ? products.ProductImages[0].path
                : ""
            }
            alt={products?.ProductFlat?.name}
          />
        </NavLink>
      </div>
      <div className="product-info clearfix text-center">
        <div className="fix">
          <h4 className="post-title">
            {products?.ProductFlat?.name}
          </h4>
          <div className="product-price">
            <span className="price-1">
              ${products?.ProductFlat?.price}
            </span>
          </div>
        </div>
      </div>
    </Fragment>
  </div>) 

}

export default Card