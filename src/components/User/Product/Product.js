import React, { Fragment, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import Categories from "./Categories";
import { getAllProduct, clearErrors } from "../../../action/ProductAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Lodder from "../layout/Loader";
import Dropdow from "./Dropdown"
import Pagination from "react-js-pagination";

const Product = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { allproduct, pageCount, error } = useSelector((state) => state.allProduct);

  // console.log(pageCount, "jjjj")

  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = allproduct?.filter((item) =>
    item.ProductFlat.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

   console.log(filteredData, "all");

 
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectSize, setSize] = useState([])
  const [selectedIds, setSelectedIds] = useState([]);
  const [config, setConfig] = useState({
    page: 1,
    pageSize: 10,
    price: null,
    search: "",
    catId: null,
    color: null,
    size: null,
    filter: null
  });
  const [currentPage, setCurrentPage] = useState(config.page);

  let setFilter = true

  const handleSearch = (e) => {
    // config.filter = setFilter

    setSearchQuery(e.target.value)
    config.search = e.target.value;
    const updatedConfig = { ...config, search: e.target.value };
    setConfig(updatedConfig)
    dispatch(getAllProduct(updatedConfig));
  }

  const handlePrice = (event, priceValue) => {
    // config.filter = setFilter

    let priceStr = `${priceValue[0]},${priceValue[1]}`;
    console.log(priceStr, "prii")
    const updatedConfig = { ...config, price: priceStr };
    setConfig(updatedConfig);
    dispatch(getAllProduct(updatedConfig));
  }

  const handleColor = (event) => {
    // config.filter = setFilter

    const value = event.target.value;
    let colorStr = ""
    const updatedColors = event.target.checked
      ? [...selectedColors, value]
      : selectedColors.filter((color) => color !== value);

    setSelectedColors(updatedColors);
    updatedColors.map(clr=>{
      colorStr =colorStr + encodeURIComponent(clr) +','
    })
    const updatedConfig = { ...config, color: colorStr };
    setConfig(updatedConfig);
    dispatch(getAllProduct(updatedConfig))
  }

  const handleSize = (event) => {
    // config.filter = setFilter

    const value = event.target.value
    if (event.target.checked) {
      setSize([...selectSize, value]);
    } else {
      setSize(selectSize.filter((size) => size !== value));
    }
    let sizeStr = `${value},`
    config.size = sizeStr

    dispatch(getAllProduct(config))
  }

  const handleCategories = (id, isChecked) => {
    // config.filter = setFilter

    if (isChecked) {
      setSelectedIds([...selectedIds, id]);
      // console.log(selectedIds,"oooo");
    } else {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
      // console.log(selectedIds,"pp");
    }

    let categoryStr = `${id},`
    console.log(config, "gg");
    config.catId = categoryStr

    dispatch(getAllProduct(config))
  };

  const setCurrentPageNo = (pageNumber) => {
    console.log(pageNumber);
    const updatedConfig = {...config,page:pageNumber}
    setConfig(updatedConfig);
    setCurrentPage(pageNumber);
    dispatch(getAllProduct(updatedConfig))
  };

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(getAllProduct(config));
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
                      <li>
                        <NavLink to="/">Home</NavLink>
                      </li>
                      <li>Products</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* For Search  */}

        <div className="product-area pt-80 pb-80 product-style-2">
          <div className="container">
            <div className="row">

              <div className="col-md-3 col-sm-12 col-xs-12">
                <aside className="widget widget-search mb-30">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e)}
                    placeholder="Search here..."
                  />
                </aside>

                <Dropdow handleCategories={handleCategories} />
                <Categories
                  handlePrice={handlePrice}
                  handleColor={handleColor}
                  handleSize={handleSize}
                />
              </div>

              <div className="col-md-9 col-sm-12 col-xs-12">
                <div className="shop-content mt-tab-30 mt-xs-30">
                  <div className="product-option mb-30 clearfix">
                    <ul className="shop-tab">
                      <li className="active">
                        <a href="#grid-view" data-toggle="tab">
                          <i className="zmdi zmdi-view-module"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#list-view" data-toggle="tab">
                          <i className="zmdi zmdi-view-list"></i>
                        </a>
                      </li>
                    </ul>
                    <div className="showing text-right hidden-xs">
                      <p className="mb-0">Showing {config.page}-{config.pageSize-1} of {pageCount} Results</p>
                    </div>
                  </div>

                  {/* Grid and List View */}

                  <div className="tab-content">

                    <div className="tab-pane active" id="grid-view">
                      <div className="row">
                        {allproduct && allproduct.length > 0 && (
                          <>
                            {allproduct?.map((products) => (
                              <div
                                key={products.id}
                                className="col-lg-4 col-md-4 col-sm-6 col-xs-12"
                              >
                                <div className="single-product">
                                  <Fragment>
                                    <div className="product-img">
                                      <span className="pro-label new-label">
                                        new
                                      </span>
                                      <NavLink
                                        to={`/products-details?id=${products.id}`}
                                      >
                                        <img
                                          src={
                                            products.ProductImages.length
                                              ? products.ProductImages[0].path
                                              : ""
                                          }
                                          alt={products.ProductFlat.name}
                                        />
                                      </NavLink>
                                    </div>
                                    <div className="product-info clearfix text-center">
                                      <div className="fix">
                                        <h4 className="post-title">
                                          {products.ProductFlat.name}
                                        </h4>
                                        <div className="product-price">
                                          <span className="price-1">
                                            ${products.ProductFlat.price}
                                          </span>
                                        </div>
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
                                    <span className="pro-label new-label">
                                      new
                                    </span>
                                    <NavLink
                                      to={`/products-details?id=${products.id}`}
                                    >
                                      <img
                                        src={
                                          products.ProductImages.length
                                            ? products.ProductImages[0].path
                                            : ""
                                        }
                                        alt={products.ProductFlat.name}
                                      />
                                    </NavLink>
                                  </div>
                                  <div className="product-info">
                                    <div className="fix">
                                      <h4 className="post-title floatleft">
                                        {products.ProductFlat.name}
                                      </h4>
                                    </div>
                                    <div className="product-price mb-10">
                                      <span className="price-1">
                                        ${products.ProductFlat.price}
                                      </span>
                                    </div>
                                    <div className="product-description">
                                      <p
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            products.ProductFlat.description,
                                        }}
                                      />
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

                  {/* Pagination */}

                  {/* <div className="shop-pagination  text-center">
                    <div className="pagination">
                      <ul>
                        <li>
                          <a href="#">
                            <i className="zmdi zmdi-long-arrow-left"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">01</a>
                        </li>
                        <li className="active">
                          <a href="#">02</a>
                        </li>
                        <li>
                          <a href="#">03</a>
                        </li>
                        <li>
                          <a href="#">04</a>
                        </li>
                        <li>
                          <a href="#">05</a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="zmdi zmdi-long-arrow-right"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div> */}



                  <div className="shop-pagination  text-center">
                    <div className="pagination">

                      <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={config.pageSize}
                        totalItemsCount={pageCount}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
