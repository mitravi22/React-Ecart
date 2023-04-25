
import React, { Fragment, useCallback, useEffect, useState } from "react";

import "./Categories.css";
import {
  getCategories,
  getColors,
  getSize,
  clearErrors,
} from "../../../action/ProductAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { TreeViewComponent } from '@syncfusion/ej2-react-navigations';
import { PropertyPane } from './propertpan';
import { TreeView, TreeItem } from '@material-ui/lab';
import { ExpandMore, ChevronRight } from '@material-ui/icons';
import TreeNode from "./TreeNode";

const Dropdow = ({handleCategories}) => {

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

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(getCategories());
  }, []);

  // const [selectedIds, setSelectedIds] = useState([]);

  // const handleCheck =(id, isChecked) => {
  //   if (isChecked) {
  //     setSelectedIds((prevSelectedIds) => [...prevSelectedIds, id]);
  //     console.log(selectedIds, "sdsd");
  //   } else {
  //     setSelectedIds((prevSelectedIds) =>
  //       prevSelectedIds.filter((prevId) => prevId !== id)
  //     );
  //     console.log(selectedIds, "sdsd");
  //   }

  // };

  return (
    <div>

      <aside className="widget widget-categories  mb-30">
        <div className="widget-title">
          <h4>Categories</h4>
        </div>

        <div className="dropdown">
          <ul className="menu">
            <div>
              {parentCategories && parentCategories?.map((rootNode) => (
                <TreeNode
                  key={rootNode.id}
                  node={rootNode}
                  onCheck={ handleCategories }
                  value={rootNode.id}
                />
              ))}
            </div>
          </ul>
        </div>
      </aside>
    </div>
  )
}

export default Dropdow




