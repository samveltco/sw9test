import React from 'react';

interface ChecklistFiltersProps {
  items: Array<{ id: string; label: string; checked?: boolean }>;
  onToggle: (id: string, checked: boolean) => void;
}

const ChecklistFilters: React.FC<ChecklistFiltersProps> = ({ items, onToggle }) => {
  return (
    <ul className="check_list">
      {items.map((item) => (
        <li key={item.id} className={item.checked ? 'active' : ''}>
          <div className="check_block">
            <label className="check_btn">
              <input
                type="checkbox"
                checked={!!item.checked}
                onChange={(e) => onToggle(item.id, e.target.checked)}
              />
              {item.label}
            </label>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ChecklistFilters; 