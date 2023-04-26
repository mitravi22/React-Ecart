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
import { ALL_CATEGORY_SUCCESS } from "../../../constant/ProductsConstant";

const Dropdow = ({handleCategories}) => {

  const dispatch = useDispatch();
  const [parentCategories,setParent]=useState([])
  const alert = useAlert();

  const { category, error } = useSelector((state) => state.filters);
  const { allCategories } = useSelector((state) => state.allCategory);

  function getCategoriesByParentId(allCategories, parentId) {
    // console.log("parent");
    const filteredCategories = allCategories?.filter(
      (category) => category.parentId === parentId
    );

    return filteredCategories?.map((category) => {
      const children = getCategoriesByParentId(allCategories, category.id);
      if (children.length) {
        category.children = children;
        category.isOpen = false
      }

      return category;
    });
  }

  //  console.log(parentCategories,"jj");

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(getCategories());
  }, []);

  useEffect(() => {
  dispatch({
    type:ALL_CATEGORY_SUCCESS,
    data:getCategoriesByParentId(category, null)
  }) ;
  }, [category]);

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
  const handleOpenC =(nodeValue,parentId)=>{
    if(parentId){
     console.log(nodeValue,parentId,allCategories);
     let index = allCategories.findIndex(kk => kk.id === parentId);
     let chidlIndex = allCategories[index].children.findIndex(ll=>ll.id == nodeValue.id);
     let pC = JSON.parse(JSON.stringify(allCategories));
      pC[index].children[chidlIndex].isOpen = !nodeValue.isOpen;
      dispatch({
      type:ALL_CATEGORY_SUCCESS,
      data:pC
    })
    }
    else{  
      let index = allCategories.findIndex(kk => kk.id === nodeValue.id);
      let pC = JSON.parse(JSON.stringify(allCategories));
      pC[index].isOpen = !nodeValue.isOpen;
      dispatch({
      type:ALL_CATEGORY_SUCCESS,
      data:pC
    })
  }
    
 
  }

  return (
    <div>

      <aside className="widget widget-categories  mb-30">
        <div className="widget-title">
          <h4>Categories</h4>
        </div>

        <div className="dropdown">
          <ul className="menu">
            <div>
              {allCategories && allCategories?.map((rootNode) => (
      <TreeNode
        key={rootNode.id}
        node={rootNode}
        onCheck={ handleCategories }
        value={rootNode.id}
        onOpenChange = {handleOpenC}
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