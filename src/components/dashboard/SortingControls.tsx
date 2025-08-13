import React from 'react';
import Select from '../forms/Select';
import Button from '../forms/Button';
import FilterPanel from './FilterPanel';
import Pagination from '../common/Pagination';

interface SortingControlsProps {
  sortBy: string;
  onSortChange: (value: string) => void;
  ascending: boolean;
  onAscendingChange: (ascending: boolean) => void;
  showFilter: boolean;
  onToggleFilter: () => void;
  onApplyFilter: () => void;
  onResetFilter: () => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const SortingControls: React.FC<SortingControlsProps> = ({
  sortBy,
  onSortChange,
  ascending,
  onAscendingChange,
  showFilter,
  onToggleFilter,
  onApplyFilter,
  onResetFilter,
  currentPage,
  totalPages,
  onPageChange
}) => {
  const sortOptions = [
    { value: 'start_date', label: 'Start date' },
    { value: 'price', label: 'Price' },
    { value: 'title', label: 'Title' },
    { value: 'created_date', label: 'Created date' }
  ];

  return (
    <div className="filter_paging">
      <div className="sorting_block">
        <label className="sort_select">
          <span className="sort_label icon_sort">Sort by:</span>
          <select 
            name="sort_by" 
            aria-label="sort by"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label className="sort_type">
          <input 
            type="checkbox" 
            name="ascending"
            checked={ascending}
            onChange={(e) => onAscendingChange(e.target.checked)}
          />
          <span className="sort_label">Ascending</span>
        </label>
      </div>

      <div className="filter_block">
        <Button
          variant="standard"
          icon="icon_filter"
          onClick={onToggleFilter}
          aria-label="filter"
        >
          Filter <span className="count_block">(2)</span>
        </Button>
        <Button
          variant="standard"
          icon="icon_clear"
          disabled
          aria-label="reset"
        >
          Reset filter
        </Button>
        
        <FilterPanel
          isVisible={showFilter}
          onClose={onToggleFilter}
          onApply={onApplyFilter}
          onReset={onResetFilter}
        />
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default SortingControls; 