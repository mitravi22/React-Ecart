import React from 'react';

function TreeNode({ node, onCheck }) {
  const handleCheck = (e) => {
    onCheck(node.id, e.target.checked);
  };

  return (
    <div>
      <label>
        <input type="checkbox" onChange={handleCheck} />
        {node.categoryTranslations[0].name}
      </label>
      {node.children && (
        <div style={{ marginLeft: 20 }}>
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} onCheck={onCheck} />
          ))}
        </div>
      )}
    </div>
  );
}

export default TreeNode;
