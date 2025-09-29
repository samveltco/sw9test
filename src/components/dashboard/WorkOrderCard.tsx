import React, { useMemo } from 'react';
import { calculateFundsRequiredSum } from '../../utils/calculateFundsRequiredSum';
import { localCurrencySettings, variableTypeShorts } from '../../utils/constants';
import { workOrderStatusControl } from '../../utils/workOrderStatusControl';
import { useNavigate } from 'react-router-dom';

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
  workOrder: any;
  onDuplicate: (id: string) => void;
  onViewDetails: (id: string) => void;
  onFindContractors: (id: string) => void;
  onViewApplicants: (id: string) => void;
  onCreateTemplate: (id: string) => void;
  userType: string;
  messagesCount: any;
}

const WorkOrderCard: React.FC<WorkOrderCardProps> = ({
  workOrder,
  messagesCount,
  userType,
  onDuplicate,
  onViewDetails,
  onFindContractors,
  onViewApplicants,
  onCreateTemplate
}) => {
  const workOrderControlByStatus = workOrderStatusControl(workOrder.status);
  const navigate = useNavigate();
  // const formatCalcInfo = (info: string) => {
  //   return info.split('\n').map((line, index, arr) => (
  //     <span key={index}>
  //       {line}
  //       {index < arr.length - 1 && <br />}
  //     </span>
  //   ));
  // };

  const onEdit = () => {
    console.log(workOrder);
    navigate(`/create-work-order/${workOrder._id}`);
  }

  const totalEstPaySum = useMemo(() => {
    const sum = calculateFundsRequiredSum({
      amount: workOrder.bidAmountBase || workOrder.amount,
      basicType: workOrder.basicType,
      quantity: workOrder.quantity,
      variableAmount: workOrder.variableAmount,
      maxQuantity: workOrder.maxQuantity,
      variablePayAfter: workOrder.variablePayAfter
    }).toLocaleString('en-US', localCurrencySettings);

    const sumNum = Number(sum.slice(1));
    if (
      workOrder.payBaseRateAsMinimum && sumNum < workOrder.amount) {
      return workOrder.potentialPay
    }
    return sum;
  }, [workOrder])


  const basePaySum = useMemo(() => {
    let hrs = workOrder.approvedHoursQty || workOrder.quantity;
    let pay;
    if (workOrder.approvedHoursQty > workOrder.quantity) {
      hrs = workOrder.quantity
    }
    if (workOrder.basicType === 'Site') {
      hrs = 1
    }
    if (workOrder.basicType === 'Device') {
      hrs = (workOrder.approvedDeviceQty || workOrder.qtyDevices) < workOrder.quantity ? workOrder.approvedDeviceQty || workOrder.qtyDevices : workOrder.quantity
    }
    if (workOrder.approvedHoursQty < workOrder.quantity && !workOrder.payBaseRateAsMinimum) {
      pay = (workOrder.bidAmountBase || workOrder.amount) * hrs;
    } else if (workOrder.payBaseRateAsMinimum && workOrder.approvedHoursQty < workOrder.quantity) {
      pay = (workOrder.bidAmountBase || workOrder.amount) * workOrder.quantity;
    } else {
      pay = (workOrder.bidAmountBase || workOrder.amount) * hrs;
    }
    return pay;
  }, [workOrder])

  const basePay = useMemo(() => {
    let hrs = workOrder.approvedHoursQty || workOrder.quantity;
    if (workOrder.approvedHoursQty > workOrder.quantity) {
      hrs = workOrder.quantity
    }

    if (workOrder.basicType === 'Device') {
      hrs += ' device(s)'
    } else {
      hrs += ' hr(s)'
    }
    return `${workOrder.bidAmountBase || workOrder.amount}/${variableTypeShorts[workOrder.basicType as keyof typeof variableTypeShorts]} for ${hrs} = ${basePaySum}`
  }, [workOrder]);


  const variablePaySum = useMemo(() => {

    return ((workOrder.bidAmountVariable || workOrder.variableAmount) * (workOrder.maxQuantity ? workOrder.maxQuantity - workOrder.variablePayAfter : 0)) || 0
  }, [workOrder])

  const varPay = useMemo(() => {
    if (workOrder.variableType === 'Hour') {
      return `
        ${workOrder.bidAmountVariable || workOrder.variableAmount}/hr after ${workOrder.variablePayAfter} for max ${workOrder.maxQuantity} hrs = ${variablePaySum}
      `
    }
    if (workOrder.variableType === 'Device') {
      return `
        ${workOrder.bidAmountVariable || workOrder.variableAmount}/dev after ${workOrder.variablePayAfter} for max ${workOrder.maxQuantity} devices = ${variablePaySum}
      `
    }
  }, [workOrder, variablePaySum])

  return (
    <div className="card_item">
      <div className="card_body">
        <div className="card_main">
          <div className="card_title">{workOrder.title}</div>
          <ul className="card_details">
            <li>
              <span className="detail_label">Created By:</span>
              {workOrder.clientInfo?.name || workOrder.companyNCR?.name}
            </li>
            <li>
              <span className="detail_label">WIN:</span>
              {workOrder.WIN}
            </li>
            <li>
              <span className="detail_label">Company WO ID:</span>
              {workOrder.customTagId}
            </li>
          </ul>
        </div>

        <div className="start_end">
          <ul className="card_details">
            <li>
              <span className="detail_label">Start:</span>
              {
                new Date(workOrder.startDate).toLocaleDateString(
                  'en-US', { timeZone: 'UTC' },
                )
              }
              {workOrder.startTime}
            </li>
            <li>
              <span className="detail_label">End:</span>
              {
                new Date(workOrder.endDate).toLocaleDateString(
                  'en-US', { timeZone: 'UTC' },
                )
              }
              {workOrder.endTime}
            </li>
          </ul>
        </div>

        <div className="assign_info">
          <div className="card_title">Assigned to :</div>
          <ul className="card_details">
            <li>
              <span className="detail_label">{workOrder.contractorInfo?.name}</span>
            </li>
            <li>
              <span className="detail_label">Phone:</span>
              {workOrder.contractorInfo?.phone}
            </li>
            <li>
              <span className="detail_label">Email:</span>
              {workOrder.contractorInfo?.email}
            </li>
          </ul>
        </div>

        <div className="price_info">
          <div className="price_size">
            <span>

              {
                (
                  (
                    workOrderControlByStatus.beforeAssigned
                      && !workOrderControlByStatus.canceled
                      ? workOrder.amount
                      : (workOrder.bidAmountBase || workOrder.amount)
                  )
                  * ((workOrder.payBaseRateAsMinimum && workOrder.basicType !== 'Site') ? workOrder.quantity : 1)
                ).toLocaleString('en-US', localCurrencySettings)
              }
            </span> &nbsp;
            {
              // eslint-disable-next-line no-nested-ternary
              workOrder.payBaseRateAsMinimum
                ? 'MIN'
                : workOrder.basicType && workOrder.basicType !== ''
                  ? `Per ${workOrder.basicType === 'Hours'
                    ? 'Hour'
                    : workOrder.basicType}`
                  : ''
            }

          </div>
          <div className="calc_info">
            Base: {basePay}
            {workOrder.bidAmountVariable && (
              <>
                <br />
                Variable: {varPay}
              </>
            )}
            <br />
            Total est value = {totalEstPaySum}
            {/* {formatCalcInfo(workOrder.calcInfo)} */}

          </div>
        </div>

        <div className="card_statuses">
          <span
            className={`status_block`}
          >
            {workOrder.status}
          </span>
          {/* {workOrder.status.map((status: any, i: any) => (
          ))} */}
        </div>

        <div className="check_block">
          <label className="check_btn">
            <input type="checkbox" name={`card[${workOrder._id}]`} />
          </label>
        </div>
      </div>

      <div className="card_footer">
        <div className="messages_location">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#" className="message_count">
            {
              messagesCount
                ? (
                  <div style={{ display: 'flex' }}>
                    <div>
                      {
                        messagesCount.unReadMessages[workOrder._id]?.all === 1
                          ? '1 message'
                          : `${messagesCount.unReadMessages[workOrder._id]?.all || 0} messages`
                      }
                    </div>
                    {messagesCount.unReadMessages[workOrder._id]?.unread
                      ? (
                        <div>
                          <sup style={{
                            color: 'white',
                            background: 'red',
                            padding: '0px 3px',
                            marginLeft: '5px',
                            borderRadius: '50px',
                          }}
                          >
                            {messagesCount.unReadMessages[workOrder._id]?.unread}
                          </sup>
                        </div>
                      )
                      : null}
                  </div>
                )
                : null
            } messages
          </a>
          <div className="location_info">{workOrder.location}</div>
        </div>
        <div className="card_actions">
          <button className="primary_btn icon_copy" aria-label="Duplicate" onClick={() => onDuplicate(workOrder.id)}>Duplicate</button>

          {userType === 'client' && workOrderControlByStatus.workUncompleted && !workOrderControlByStatus.canceled && (
            <button className="primary_btn icon_copy" aria-label="Edit" onClick={() => onEdit()}>Edit</button>
          )}

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