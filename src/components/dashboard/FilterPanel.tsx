import React from 'react';
import Select from '../forms/Select';
import Textarea from '../forms/Textarea';

interface FilterPanelProps {
  isVisible: boolean;
  onClose: () => void;
  onApply: () => void;
  onReset: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  isVisible,
  onClose,
  onApply,
  onReset
}) => {
  const createdByOptions = [
    { value: '1', label: 'User 1' },
    { value: '2', label: 'User 2' },
    { value: '3', label: 'User 3' },
  ];

  const statusOptions = [
    { value: '1', label: 'Draft' },
    { value: '2', label: 'Available' },
    { value: '3', label: 'Routed' },
    { value: '4', label: 'Completed' },
    { value: '5', label: 'Paid' },
  ];

  const panelRef = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    if (isVisible && panelRef.current) {
      requestAnimationFrame(() => {
        panelRef.current && panelRef.current.classList.add('opened');
      });
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="filter_inner" ref={panelRef}>
      <div className="filter_head">
        <div className="filter_name icon_filter">
          Filter <span className="count_block">(2)</span>
        </div>
        <button 
          className="reset_btn icon_clear"
          disabled
          onClick={onReset}
          aria-label="reset filter"
          type="button"
        >
          Reset filter
        </button>
        <button 
          className="close_btn icon_close" 
          aria-label="filter close" 
          onClick={onClose}
          type="button"
        ></button>
      </div>
      
      <span className="filter_shadow top_shadow"></span>
      
      <div className="filter_content">
        <div className="filter_fields">
          <Textarea
            label="Win#"
            name="win"
            placeholder="Format WiN's"
            maxLength={500}
            hint={
              <>
                Format WIN's
                <br/>10001123
                <br/>12344343
                <br/>34353534
                <br/>34535535
              </>
            }
          />
          
          <div className="field_row">
            <div className="field_name">
              <label htmlFor="contractor_id">Contractor ID</label>
            </div>
            <div className="field_block">
              <input 
                id="contractor_id" 
                type="text" 
                name="contractor_id" 
                maxLength={50} 
                placeholder="Type her..." 
              />
            </div>
          </div>
          
          <div className="field_row">
            <div className="field_name">
              <label htmlFor="start_date">Start Date</label>
            </div>
            <div className="field_block">
              <input 
                id="start_date" 
                type="date" 
                name="start_date_from" 
                placeholder="From" 
              />
            </div>
            <div className="field_block">
              <input 
                type="date" 
                name="start_date_to" 
                placeholder="To" 
              />
            </div>
          </div>
          
          <div className="field_row">
            <div className="field_name">
              <label htmlFor="end_date">End Date</label>
            </div>
            <div className="field_block">
              <input 
                id="end_date" 
                type="date" 
                name="end_date_from" 
                placeholder="From" 
              />
            </div>
            <div className="field_block">
              <input 
                type="date" 
                name="end_date_to" 
                placeholder="To" 
              />
            </div>
          </div>
          
          <Select
            label="Created by"
            name="created_by"
            options={createdByOptions}
            wrapperClassName="field_row"
          />
          
          <div className="field_row">
            <div className="field_name">
              <label htmlFor="wo_title">WO Title</label>
            </div>
            <div className="field_block">
              <input 
                id="wo_title" 
                type="text" 
                name="wo_title" 
                maxLength={50} 
                placeholder="Type her..." 
              />
            </div>
          </div>
          
          <Select
            label="WO Status"
            name="wo_status"
            options={statusOptions}
            wrapperClassName="field_row"
          />
          
          <div className="field_row">
            <div className="field_name">
              <label htmlFor="city">City</label>
            </div>
            <div className="field_block">
              <input 
                id="city" 
                type="text" 
                name="city" 
                maxLength={50} 
                placeholder="Type her..." 
              />
            </div>
          </div>
          
          <div className="field_row">
            <div className="field_name">
              <label htmlFor="state">State</label>
            </div>
            <div className="field_block">
              <input 
                id="state" 
                type="text" 
                name="state" 
                maxLength={50} 
                placeholder="Type her..." 
              />
            </div>
          </div>
          
          <div className="field_row">
            <div className="field_name">
              <label htmlFor="zip">Zip</label>
            </div>
            <div className="field_block">
              <input 
                id="zip" 
                type="text" 
                name="zip" 
                maxLength={8} 
                placeholder="Type her..." 
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="actions_block">
        <button 
          className="standard_btn dark_btn"
          onClick={onClose}
          aria-label="cancel"
          type="button"
        >
          Cancel
        </button>
        <button 
          className="standard_btn light_btn"
          onClick={onApply}
          aria-label="accept"
          type="button"
        >
          Accept
        </button>
      </div>
      
      <span className="filter_shadow bottom_shadow"></span>
    </div>
  );
};

export default FilterPanel; 