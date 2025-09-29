// ©2024 Austin App House. All rights reserved.
import React from 'react';

const SectionContainerOneCol = ({ children }) => {
  const items = React.Children.toArray(children);
  return (
    <div className="section_container_one_col">
      {items.map((child, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={index} className="h-paddings-half">
          {child}
        </div>
      ))}
    </div>
  );
};

export default SectionContainerOneCol;


