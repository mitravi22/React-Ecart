
import React, { useEffect, useState } from "react";
import { getAllOrder, clearErrors } from '../../../action/MyOrderAction'
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Lodder from "../layout/Loader";
import Pagination from "react-js-pagination";
import { Link, NavLink } from "react-router-dom";
const MyOrder = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { myOrder, error, count } = useSelector((state) => state.myOrder);

  // console.log(myOrder?.rows, "k")

  const token = localStorage.getItem("userDetails");
  const dataToken = JSON.parse(token)

  const [config, setConfig] = useState({
    page: 1,
    pageSize: 10,
  });
  const [currentPage, setCurrentPage] = useState(config.page);

  const setCurrentPageNo = (pageNumber) => {
    const updatedConfig = { ...config, page: pageNumber }
    setConfig(updatedConfig);
    setCurrentPage(pageNumber);
    dispatch(getAllOrder(dataToken.user.id, dataToken.token, updatedConfig))
  };

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(getAllOrder(dataToken.user.id, dataToken.token, config));
  }, [dispatch]);

  return (

    <div id="wrapper">
        <div className="heading-banner-area overlay-bg">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="heading-banner">
                  <div className="heading-banner-title">
                    <h2>My Orders</h2>
                  </div>
                  <div className="breadcumbs pb-15">
                    <ul>
                      <li>
                        <NavLink to="/">Home</NavLink>
                      </li>
                    <li>
                    <NavLink to="/products">Products</NavLink>
                    </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      <div className="container-fluid" id="container-wrapper">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">My Order</h1>
        </div>
        <div className="row">
          <div className="col-lg-12 mb-4">
            <div className="card">
              <div className="table-responsive">
                <table className="table align-items-center table-flush">
                  <thead className="thead-light">
                    <tr>
                      <th>Oreder ID</th>
                      <th>Order Date</th>
                      <th>Total Amount</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myOrder?.rows && myOrder?.rows.length > 0 && (
                      <>
                        {myOrder?.rows.map((orders) =>
                          {
                            const dateObj = new Date(orders.createdAt);
                            const options = {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            };
                            const formattedDate = new Intl.DateTimeFormat("en-US", options).format(dateObj);
                            return (
                              <tr key={orders.id}>
                                <td>{orders.id}</td>
                                <td>{formattedDate}</td>
                                <td>₹ {orders.grandTotal}</td>
                                <td>{orders.status}</td>
                                <td><Link to={`/single-order?id=${orders.id}`} >View</Link></td>
                              </tr>
                            );
                          })}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="shop-pagination  text-center">
          <div className="pagination">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={config.pageSize}
              totalItemsCount={count}
              onChange={setCurrentPageNo}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="First"
              lastPageText="Last"
              itemClass="page-item"
              linkClass="page-link"
              activeLinkClass="pageLinkActive"
            />
          </div>
        </div>

      </div>
    </div>

  )
}

export default MyOrder