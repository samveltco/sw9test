import React from 'react';

export interface Contractor {
  id: string;
  name: string;
  code: string;
  address: string;
  phone: string;
  email: string;
  avatar: string; // path under /public/images
  badgeIcon?: string; // path under /public/images
  badges?: Array<{ label: string; date?: string }>;
}

interface ContractorCardProps {
  contractor: Contractor;
  onSelect?: (id: string) => void;
}

const ContractorCard: React.FC<ContractorCardProps> = ({ contractor, onSelect }) => {
  return (
    <div className="card_item">
      <div className="card_body">
        <div className="img_card">
          <img src={contractor.avatar} title="" alt="" width={78} height={78} />
          {contractor.badgeIcon && (
            <div className="small_img">
              <img src={contractor.badgeIcon} title="" alt="" width={20} height={20} />
              Preferred groups
            </div>
          )}
        </div>
        <div className="card_main">
          <div className="card_title">{contractor.name}</div>
          <ul className="card_details">
            <li>
              <span className="detail_label">{contractor.code}</span>
            </li>
            <li>{contractor.address}</li>
            <li>
              <span className="detail_label">Phone::</span>
              {contractor.phone}
            </li>
            <li>
              <span className="detail_label">Email:</span>
              {contractor.email}
            </li>
          </ul>
        </div>
        <div className="check_info">
          <ul className="card_details">
            {(contractor.badges || []).map((b, idx) => (
              <li key={idx}>
                <span className="detail_label icon_checkbox">{b.label}</span>
                {b.date}
              </li>
            ))}
          </ul>
        </div>
        <div className="check_block">
          <label className="check_btn">
            <input type="checkbox" onChange={() => onSelect && onSelect(contractor.id)} />
          </label>
        </div>
      </div>
    </div>
  );
};

export default ContractorCard; 