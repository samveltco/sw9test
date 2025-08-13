import React from 'react';
import Button from '../forms/Button';

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
  status: string[];
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
    return info.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        {index < info.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  const getStatusClassName = (status: string) => {
    return status.toLowerCase().replace(' ', '_');
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
          {workOrder.status.map((status, index) => (
            <span key={index} className={`status_block ${getStatusClassName(status)}`}>
              {status}
            </span>
          ))}
        </div>
        
        <div className="check_block">
          <label className="check_btn">
            <input type="checkbox" name={`card[${workOrder.id}]`}/>
          </label>
        </div>
      </div>
      
      <div className="card_footer">
        <div className="messages_location">
          <button className="message_count" onClick={() => onViewDetails(workOrder.id)}>
            {workOrder.messages} messages
          </button>
          <div className="location_info">{workOrder.location}</div>
        </div>
        
        <div className="card_actions">
          <Button 
            variant="primary" 
            icon="icon_copy" 
            onClick={() => onDuplicate(workOrder.id)}
            aria-label="Duplicate"
          >
            Duplicate
          </Button>
          <Button 
            variant="primary" 
            icon="icon_dots" 
            onClick={() => onViewDetails(workOrder.id)}
            aria-label="Details"
          >
            Details
          </Button>
          <Button 
            variant="primary" 
            icon="icon_assept" 
            onClick={() => onFindContractors(workOrder.id)}
            aria-label="Contractors Near-by"
          >
            Contractors Near-by
          </Button>
          <Button 
            variant="primary" 
            icon="icon_eye" 
            onClick={() => onViewApplicants(workOrder.id)}
            aria-label="View Applicants"
          >
            View Applicants
          </Button>
          <Button 
            variant="primary" 
            icon="icon_plus" 
            onClick={() => onCreateTemplate(workOrder.id)}
            aria-label="Create template"
          >
            Create template
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WorkOrderCard; 