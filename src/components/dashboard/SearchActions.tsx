import React from 'react';

interface SearchActionsProps {
  onImportClick: () => void;
  onCreateWorkOrder: () => void;
  onExport: () => void;
}

const SearchActions: React.FC<SearchActionsProps> = ({
  onImportClick,
  onCreateWorkOrder,
  onExport
}) => {
  return (
    <div className="search_actions">
      <form className="search_form">
        <div className="field_block">
          <input 
            type="text" 
            name="search" 
            maxLength={50} 
            aria-label="search" 
            placeholder="Search"
          />
        </div>
        <div className="field_block">
          <input 
            type="text" 
            name="zip_code" 
            maxLength={8} 
            aria-label="zip code" 
            placeholder="Zip code"
          />
        </div>
        <button className="search_btn icon_search" aria-label="search" type="submit"></button>
      </form>
      
      <div className="btns_block">
        <button 
          className="standard_btn icon_plus curry_btn"
          onClick={onCreateWorkOrder}
          aria-label="Create work order"
          type="button"
        >
          Create work order
        </button>
        <button 
          className="standard_btn icon_import orange_btn"
          onClick={onImportClick}
          aria-label="Import work order(s)"
          type="button"
        >
          Import work order(s)
        </button>
        <button 
          className="standard_btn icon_export green_btn"
          onClick={onExport}
          aria-label="Export EXCEL"
          type="button"
        >
          Export EXCEL
        </button>
      </div>
    </div>
  );
};

export default SearchActions; 