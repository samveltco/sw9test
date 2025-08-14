import React from 'react';

interface RangeSearchActionsProps {
  distance: number;
  onDistanceChange: (val: number) => void;
}

const RangeSearchActions: React.FC<RangeSearchActionsProps> = ({ distance, onDistanceChange }) => {
  return (
    <div className="search_actions">
      <form className="search_form">
        <div className="field_block">
          <input type="text" name="search" maxLength={50} aria-label="search" placeholder="Search" />
        </div>
        <div className="field_block">
          <input type="text" name="zip_code" maxLength={8} aria-label="zip code" placeholder="Zip code" />
        </div>
        <div className="field_block range_block">
          <label htmlFor="distance_range" className="range_label">
            <span>{distance}</span> miles
          </label>
          <input
            type="range"
            id="distance_range"
            name="distance"
            min={0}
            max={100}
            value={distance}
            onChange={(e) => onDistanceChange(Number(e.target.value))}
          />
        </div>
        <button className="search_btn icon_search" aria-label="search" type="submit"></button>
      </form>
    </div>
  );
};

export default RangeSearchActions; 