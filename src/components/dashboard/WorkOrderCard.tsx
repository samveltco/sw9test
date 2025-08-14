import React from 'react';

export interface WorkOrder {
  id: string;
  title: string;
  createdBy: string;
  win: string;
  companyWOID: string;
  startDate: string;
  endDate: string;
  assignedTo: string;
  phone: string;
  email: string;
  price: string;
  calcInfo: string;
  status: string[]; // e.g., ['UNCONFIRMED', 'ON HOLD']
  messages: number;
  location: string;
}

interface WorkOrderCardProps {
  workOrder: WorkOrder;
  onDuplicate: (id: string) => void;
  onViewDetails: (id: string) => void;
  onFindContractors: (id: string) => void;
  onViewApplicants: (id: string) => void;
  onCreateTemplate: (id: string) => void;
}

const WorkOrderCard: React.FC<WorkOrderCardProps> = ({
  workOrder,
  onDuplicate,
  onViewDetails,
  onFindContractors,
  onViewApplicants,
  onCreateTemplate
}) => {
  const formatCalcInfo = (info: string) => {
    return info.split('\n').map((line, index, arr) => (
      <span key={index}>
        {line}
        {index < arr.length - 1 && <br />}
      </span>
    ));
  };

  return (
    <div className="card_item">
      <div className="card_body">
        <div className="card_main">
          <div className="card_title">{workOrder.title}</div>
          <ul className="card_details">
            <li>
              <span className="detail_label">Created By:</span>
              {workOrder.createdBy}
            </li>
            <li>
              <span className="detail_label">WIN:</span>
              {workOrder.win}
            </li>
            <li>
              <span className="detail_label">Company WO ID:</span>
              {workOrder.companyWOID}
            </li>
          </ul>
        </div>

        <div className="start_end">
          <ul className="card_details">
            <li>
              <span className="detail_label">Start:</span>
              {workOrder.startDate}
            </li>
            <li>
              <span className="detail_label">End:</span>
              {workOrder.endDate}
            </li>
          </ul>
        </div>

        <div className="assign_info">
          <div className="card_title">Assigned to :</div>
          <ul className="card_details">
            <li>
              <span className="detail_label">{workOrder.assignedTo}</span>
            </li>
            <li>
              <span className="detail_label">Phone:</span>
              {workOrder.phone}
            </li>
            <li>
              <span className="detail_label">Email:</span>
              {workOrder.email}
            </li>
          </ul>
        </div>

        <div className="price_info">
          <div className="price_size">
            <span>{workOrder.price}</span>
            min
          </div>
          <div className="calc_info">{formatCalcInfo(workOrder.calcInfo)}</div>
        </div>

        <div className="card_statuses">
          {workOrder.status.map((status, i) => (
            <span
              key={i}
              className={`status_block ${status === 'UNCONFIRMED' ? 'uncomfirmed' : status === 'ON HOLD' ? 'on_hold' : status.toLowerCase().replace(/\s+/g, '_')}`}
            >
              {status}
            </span>
          ))}
        </div>

        <div className="check_block">
          <label className="check_btn">
            <input type="checkbox" name={`card[${workOrder.id}]`} />
          </label>
        </div>
      </div>

      <div className="card_footer">
        <div className="messages_location">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#" className="message_count">{workOrder.messages} messages</a>
          <div className="location_info">{workOrder.location}</div>
        </div>
        <div className="card_actions">
          <button className="primary_btn icon_copy" aria-label="Duplicate" onClick={() => onDuplicate(workOrder.id)}>Duplicate</button>
          <button className="primary_btn icon_dots" aria-label="Details" onClick={() => onViewDetails(workOrder.id)}>Details</button>
          <button className="primary_btn icon_assept" aria-label="Contractors Near-by" onClick={() => onFindContractors(workOrder.id)}>Contractors Near-by</button>
          <button className="primary_btn icon_eye" aria-label="View Applicants" onClick={() => onViewApplicants(workOrder.id)}>View Applicants</button>
          <button className="primary_btn icon_plus" aria-label="Create template" onClick={() => onCreateTemplate(workOrder.id)}>Create template</button>
        </div>
      </div>
    </div>
  );
};

export default WorkOrderCard; 