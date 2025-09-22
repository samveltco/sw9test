// ©2024 Austin App House. All rights reserved.
import React from 'react';
import Tab from './Tab.jsx';

const Tabs = ({
  tabs, activeTab, handler, workOrderCountByTabs = {}, isCounting,
}) => tabs.map(({ title, value }) => (
  <Tab
    key={value}
    title={title}
    active={activeTab === value}
    handler={handler}
    current={value}
    count={workOrderCountByTabs[value]}
    isCounting={isCounting}
  />
));

export default Tabs;
