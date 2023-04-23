
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
// import { updateSampleSection } from './sample-base';
import { TreeViewComponent } from '@syncfusion/ej2-react-navigations';

// import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { PropertyPane } from './propertpan';
import { TreeView, TreeItem } from '@material-ui/lab';
import { ExpandMore, ChevronRight } from '@material-ui/icons';
import TreeNode from "./TreeNode";


const Dropdow = () => {

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
     console.log(parentCategories,"jj");
    const { colors } = useSelector((state) => state.filters);
    const { size } = useSelector((state) => state.filters);
  
    const [activeMenu, setActiveMenu] = useState("main");
    const [hoveredMenu, setHoveredMenu] = useState(null);
    const [price, setPrice] = useState(40);
  
    const handleMouseEnter = (menu) => {
      setHoveredMenu(menu);
    };
  
    const handleMouseLeave = () => {
      setHoveredMenu(null);
    };
  
    const openSubMenu = (menu) => {
      setActiveMenu(menu);
    };
  
    const closeSubMenu = () => {
      setActiveMenu("main");
    };
  
    const handlePrice = (e) => {
      setPrice(e.target.value);
    }
  
    useEffect(() => {
      if (error) {
        dispatch(clearErrors());
      }
      dispatch(getCategories());
      dispatch(getColors());
      dispatch(getSize());
    }, []);

    function renderTreeItems(nodes) {
      console.log(nodes,"nodejjsjsjsjsj");
      if(nodes){
        return nodes.map(node => (
        <TreeItem key={node.id} nodeId={node.id} label={node.name}>
          {Array.isArray(node.children) ? renderTreeItems(node.children) : null}
        </TreeItem>
      ));
      }
      
    }
    const [selectedIds, setSelectedIds] = useState([]);

    const handleCheck = (id, isChecked) => {
      if (isChecked) {
        setSelectedIds((prevSelectedIds) => [...prevSelectedIds, id]);
        console.log(selectedIds,"sdsd");
      } else {
        setSelectedIds((prevSelectedIds) =>
          prevSelectedIds.filter((prevId) => prevId !== id)
        ); 
         console.log(selectedIds,"sdsd");
      }
    
    };
    
  return (
    <div>

<aside className="widget widget-categories  mb-30">
          <div className="widget-title">
            <h4>Categories</h4>
          </div>
          {/* <div>
      {parentCategories&&parentCategories?.map((rootNode) => (
        <TreeNode
          key={rootNode.id}
          node={rootNode}
          onCheck={handleCheck}
          selectedIds={selectedIds}
        />
      ))}
    </div> */}

          <div className="dropdown" onMouseLeave={closeSubMenu}>
            <ul className="menu">
              <div>
      {parentCategories&&parentCategories?.map((rootNode) => (
        <TreeNode
          key={rootNode.id}
          node={rootNode}
          onCheck={handleCheck}
          selectedIds={selectedIds}
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




