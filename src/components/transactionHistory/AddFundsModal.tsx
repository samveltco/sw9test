import React from 'react';

interface AddFundsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (payload: Record<string, string | boolean>) => void;
}

const AddFundsModal: React.FC<AddFundsModalProps> = ({ isOpen, onClose, onSave }) => {
  const popupRef = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    if (isOpen && popupRef.current) {
      requestAnimationFrame(() => popupRef.current && popupRef.current.classList.add('showed'));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="popup_block" ref={popupRef}>
      <div className="popup_container">
        <div className="popup_head">
          <div className="popup_title">Add Funding Source</div>
          <button className="close_btn icon_close" aria-label="close" onClick={onClose}></button>
        </div>
        <div className="popup_body">
          <div className="field_row">
            <div className="field_name">
              <label htmlFor="existingCard">Use Existing Card</label>
            </div>
            <div className="field_block">
              <select id="existingCard" name="existingCard">
                <option>Select</option>
                <option value="1">Value 1</option>
                <option value="2">Value 2</option>
                <option value="3">Value 3</option>
                <option value="4">Value 4</option>
                <option value="5">Value 5</option>
                <option value="6">Value 6</option>
              </select>
            </div>
          </div>
          <div className="separate">OR</div>
          <div className="field_row">
            <div className="field_name">
              <label>Enter New Card info</label>
            </div>
          </div>
          <div className="field_row">
            <div className="field_name">
              <label htmlFor="cardName">Name On Card</label>
            </div>
            <div className="field_block">
              <input id="cardName" type="text" name="cardName" maxLength={50} placeholder="Type here..." />
            </div>
          </div>
          <div className="field_row">
            <div className="field_name">
              <label htmlFor="cardNumber">Card Number</label>
            </div>
            <div className="field_block">
              <input id="cardNumber" type="text" name="cardNumber" maxLength={19} placeholder="Type here..." />
            </div>
          </div>
          <div className="field_row">
            <div className="field_name">
              <label htmlFor="cardDate">Date</label>
            </div>
            <div className="field_block">
              <input type="date" name="date_end" className="card_date" id="cardDate" maxLength={50} placeholder="Title" />
            </div>
          </div>
          <div className="field_row">
            <label className="check_btn">
              <input type="checkbox" name="saveCard" /> Save Card
            </label>
          </div>
          <div className="field_row">
            <div className="field_name">
              <label htmlFor="paymentAmount">Payment amount</label>
            </div>
            <div className="field_block">
              <input id="paymentAmount" type="text" name="paymentAmount" maxLength={12} placeholder="$0.00" />
            </div>
          </div>
          <div className="field_row">
            <div className="field_total">Service Processing fee</div>
            <div className="field_price">$0.00</div>
          </div>
          <div className="field_row">
            <label className="check_btn">
              <input type="checkbox" name="agreeFees" /> Click here to agree to processing fees
            </label>
          </div>
          <div className="status_day">FUNDS AVAILABILITY: 1-5 Business Days</div>
          <div className="field_row">
            <div className="field_total">Total</div>
            <div className="field_price">$0.00</div>
          </div>
          <div className="popup_footer">
            <button className="standard_btn dark_btn" aria-label="cancel" onClick={onClose}>Cancel</button>
            <button className="standard_btn light_btn" aria-label="save" onClick={() => onSave({})}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFundsModal; 