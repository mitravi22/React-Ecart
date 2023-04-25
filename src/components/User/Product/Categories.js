import React, { Fragment, useEffect, useState } from "react";
import "./Categories.css";
import {
  getCategories,
  getColors,
  getSize,
  clearErrors,
} from "../../../action/ProductAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Lodder from "../layout/Loader";
import { DropdownButton, Dropdown, Form } from "react-bootstrap";
import { Slider, FormControlLabel, Checkbox } from "@material-ui/core";
import Dropdow from "./Dropdown"

const Categories = ({ handlePrice, handleColor, handleSize}) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { category, error } = useSelector((state) => state.filters);

  function getCategoriesByParentId(allCategories, parentId) {
    const filteredCategories = allCategories?.filter(
      (category) => category.parentId === parentId
    );

    return filteredCategories?.map((category) => {
      const children = getCategoriesByParentId(allCategories, category.id);
      if (children.length) {
        category.children = children;
      }

      return category;
    });
  }

  const parentCategories = getCategoriesByParentId(category, null);
  //  console.log(parentCategories,"jj");
  const { colors } = useSelector((state) => state.filters);
  const { size } = useSelector((state) => state.filters);

  // const [activeMenu, setActiveMenu] = useState("main");
  // const [hoveredMenu, setHoveredMenu] = useState(null);

  // const handleMouseEnter = (menu) => {
  //   setHoveredMenu(menu);
  // };

  // const handleMouseLeave = () => {
  //   setHoveredMenu(null);
  // };

  // const openSubMenu = (menu) => {
  //   setActiveMenu(menu);
  // };

  // const closeSubMenu = () => {
  //   setActiveMenu("main");
  // };

  const [price, setPrice] = useState([0, 1000]);

  const handleChange = (event, newValue) => {
    setPrice(newValue);
    // handlePrice(price[0],price[1])
  };

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(getCategories());
    dispatch(getColors());
    dispatch(getSize());
  }, []);

  return (
    <Fragment>
      <div>
        {/* <aside className="widget widget-categories  mb-30">
          <div className="widget-title">
            <h4>Categories</h4>
          </div>

          <div className="dropdown" onMouseLeave={closeSubMenu}>
            <ul className="menu">
              {parentCategories?.map((category) => (
                <li
                  key={category.id}
                  className="menu-item"
                  onMouseEnter={() => openSubMenu(category)}
                >
                  {category.categoryTranslations[0].name}
                  {category.children && (
                    <span className="submenu-indicator">&#9654;</span>
                  )}
                </li>
              ))}
            </ul>

            {activeMenu !== "main" && (
              <div>
                <div
                  className="submenu-container"
                  onMouseEnter={() => handleMouseEnter(activeMenu)}
                  onMouseLeave={handleMouseLeave}
                >
                  <ul className="submenu">
                    {activeMenu.children?.map((subcategory) => (
                      <li key={subcategory.id} className="submenu-item">
                        {subcategory.categoryTranslations[0].name}
                        {subcategory.children && (
                          <span className="submenu-indicator">&#9654;</span>
                        )}
                      </li>
                    ))}
                  </ul>

                  {hoveredMenu && hoveredMenu.children && (
                    <div
                      div
                      className="submenu-container"
                      onMouseEnter={() => handleMouseEnter(activeMenu)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <ul className="submenu">
                        {hoveredMenu.children?.map((subsubcategory) => (
                          <>
                            {console.log(subsubcategory, "ll")}
                            <li
                              key={subsubcategory.id}
                              className="submenu-item"
                            >
                              {subsubcategory.children?.map(
                                (subsubsubcategory) => (
                                  <li
                                    key={subsubsubcategory.id}
                                    className="submenu-item"
                                  >
                                    {
                                      subsubsubcategory.categoryTranslations[0]
                                        .name
                                    }
                                  </li>
                                )
                              )}
                            </li>
                          </>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </aside> */}

        <aside className="widget shop-filter mb-30">
          <div className="widget-title">
            <h4>Price</h4>
          </div>
          <div className="widget-info">
            <div className="price_filter">
              <div className="price_slider_amount">
                Your Price: <br></br>${price[0]} ${price[1]}
        
                <Slider
                  value={price}
                  onChange={handleChange}
                  onChangeCommitted={handlePrice}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  min={0}
                  max={1000}
                />
              </div>
              <div id="slider-range"></div>
            </div>
          </div>
        </aside>

        <aside className="widget widget-color mb-30">
          <div className="widget-title">
            <h4>Color</h4>
          </div>
          <div className="widget-info color-filter clearfix">
            {/* 
            {colors?.map((color) => ( 
              <FormControlLabel key={color.id}
              control={<Checkbox onChange={handelColor} value={color.optionValue}  />}
              label={color.adminName}
            />
            ))} */}

            <ul>
              {colors?.map((color) => (
                <li key={color.id}>
                  <label>
                    <input
                      type="checkbox"
                      onChange={handleColor}
                      value= {color.optionValue}
                    />
                    {color.adminName}

                  </label>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <aside className="widget widget-color mb-30">
          <div className="widget-title">
            <h4>SIZE</h4>
          </div>
          <div className="widget-info color-filter clearfix">
            <ul>
              {size?.map((size) => (
                <li key={size.id}>
                  <label>
                    <input type="checkbox" 
                      onChange={handleSize}
                      value= {size.optionValue}
                    />
                    {size.adminName}
                    </label>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </Fragment>
  );
};

export default Categories;
