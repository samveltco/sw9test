import React from 'react';

interface Tab {
  key: string;
  label: string;
  count: number;
}

interface TabsFilterProps {
  tabs: Tab[];
  selectedTab: string;
  onTabChange: (tabKey: string) => void;
  onShowModal?: () => void;
}

const TabsFilter: React.FC<TabsFilterProps> = ({
  tabs,
  selectedTab,
  onTabChange,
  onShowModal
}) => {
  return (
    <div className="switch_actions">
      <div className="switch_btns">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={selectedTab === tab.key ? 'selected' : ''}
            aria-label={tab.label}
            onClick={() => onTabChange(tab.key)}
          >
            {tab.label} <span className="count_block">({tab.count})</span>
          </button>
        ))}
      </div>
      
      <div className="actions_list">
        <button aria-label="action1" className="icon_fist"></button>
        <button aria-label="action2" className="icon_palm"></button>
        <button 
          aria-label="action3" 
          className="icon_messages"
          onClick={onShowModal}
        ></button>
        <button aria-label="action4" className="icon_quarters"></button>
        <button aria-label="action5" className="icon_add"></button>
        <button aria-label="action6" className="icon_pencil"></button>
      </div>
      
      <div className="check_block">
        <label className="check_btn">
          <input type="checkbox" name="select_all"/>
        </label>
      </div>
    </div>
  );
};

export default TabsFilter; 