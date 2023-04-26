import React from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function TreeNode({ node, onCheck, onOpenChange }) {
  const handleCheck = (e) => {
    onCheck(node.id, e.target.checked);
  };

  const handleOpen = (node, parentId) => {
    onOpenChange(node, parentId);
  };
  return (
    <div>
      <div style={{display:'flex',alignItems:'center'}}><label>
        <input type="checkbox" onChange={handleCheck} />
        {node.categoryTranslations[0].name}
      </label>
      {node.children && (
        <span
          style={{ cursor: "pointer" }}
          onClick={() => handleOpen(node, node.parentId)}
        >
          {node?.isOpen ? <ExpandMoreIcon  style={{ fontSize: 30 }}/> : <NavigateNextIcon style={{ fontSize: 30 }}/>}
        </span>
      )}</div>
      
      {node.children && node?.isOpen && (
        <div style={{ marginLeft: 20 }}>
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              onCheck={onCheck}
              onOpenChange={onOpenChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TreeNode;