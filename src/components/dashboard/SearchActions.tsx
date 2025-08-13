import React from 'react';
import Button from '../forms/Button';

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
        <Button 
          variant="curry" 
          icon="icon_plus" 
          onClick={onCreateWorkOrder}
          aria-label="Create work order"
        >
          Create work order
        </Button>
        <Button 
          variant="orange" 
          icon="icon_import" 
          onClick={onImportClick}
          aria-label="Import work order(s)"
        >
          Import work order(s)
        </Button>
        <Button 
          variant="green" 
          icon="icon_export" 
          onClick={onExport}
          aria-label="Export EXCEL"
        >
          Export EXCEL
        </Button>
      </div>
    </div>
  );
};

export default SearchActions; 