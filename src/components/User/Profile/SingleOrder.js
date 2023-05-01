import React, { Fragment, useEffect, useState } from 'react'
import { singleOrder, clearErrors } from "../../../action/MyOrderAction"
import { useSelector, useDispatch } from "react-redux";
import Lodder from "../layout/Loader"
import { useAlert } from "react-alert";
import { useLocation } from 'react-router-dom';

const SingleOrder = () => {

  const alert = useAlert()
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');

  const { order, loading, error } = useSelector((state) => state.order)

  const token = localStorage.getItem("userDetails");
  const dataToken = JSON.parse(token)

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
    dispatch(singleOrder(dataToken.token, id))
  }, [dispatch, id, error, alert])

  return (
    <Fragment>
      {loading ? <Lodder /> : (<Fragment>
        <div style={{ textAlign: "center", margin: "100px" }}>
          <div className="card">
            <div className="card-header">
              <div className="d-inline h4">Order Details</div>
            </div>
            <div className="card-body">
              <dl className="row">
                <dd className="col-sm-4">SKU</dd>
                <dt className="col-sm-8">{order[0]?.OrderItems[0].sku}</dt>
              </dl>
              <dl className="row">
                <dd className="col-sm-4">NAME</dd>
                <dt className="col-sm-8">{order[0]?.OrderItems[0].name}</dt>
              </dl>
              <dl className="row">
                <dd className="col-sm-4">PRICE</dd>
                <dt className="col-sm-8">{order[0]?.OrderItems[0].price}</dt>
              </dl>
              <dl className="row">
                <dd className="col-sm-4">QUANTITY</dd>
                <dt className="col-sm-8">{order[0]?.OrderItems[0].qtyOrdered}</dt>
              </dl>
              <dl className="row">
                <dd className="col-sm-4">SUB TOTAL</dd>
                <dt className="col-sm-8">{order[0]?.OrderItems[0].total}</dt>
              </dl>
              <dl className="row">
                <dd className="col-sm-4">GRAND TOTAL</dd>
                <dt className="col-sm-8">{order[0]?.grandTotal}</dt>
              </dl>
            </div>
          </div>
        </div>
      </Fragment>)}
    </Fragment>

  )
}

export default SingleOrder