// ©2024 Austin App House. All rights reserved.
import React from 'react';
import { MDBCol } from 'mdbreact';
import { localCurrencySettings } from '../../../../../../utils/constans_old';
import ControlElement from '../../../../ControlElement';
import {calculateFundsRequiredSum} from "../../../../../../utils/calculateFundsRequiredSum";

const FundsInfoSection = ({
  profile,
  amount,
  bidAmountBase,
  quantity,
  basicType,
  variableAmount,
  variablePayAfter,
  maxQuantity,
  hideElements = {},
}) => (
  <MDBCol className="fundcol">
    <div className="funddiv">
      <div className="flex-box" style={{ justifyContent: 'center' }}>
        <h5 style={{ marginRight: '0.5rem' }}>Funds Required:</h5>
        <h6 className="font-weight-bold green-text" style={{ fontSize: '20px' }}>
          {
            calculateFundsRequiredSum({
              amount: amount || bidAmountBase,
              basicType,
              quantity,
              variableAmount,
              maxQuantity,
              variablePayAfter
            }).toLocaleString('en-US', localCurrencySettings)
          }
        </h6>
      </div>
      <ControlElement hide={hideElements?.balance}>
        <div className="flex-box" style={{ justifyContent: 'center' }}>
          <h5 style={{ marginRight: '0.5rem' }}>Funds Available:</h5>
          <h6 className="font-weight-bold green-text" style={{ fontSize: '20px' }}>
            {
              profile?.balance?.total_balance
                ? (
                  profile?.balance?.total_balance - (profile?.balance?.on_hold || 0)
                ).toLocaleString('en-US', localCurrencySettings)
                : '$0.00'
            }
          </h6>
        </div>
      </ControlElement>
    </div>
  </MDBCol>
);

export default FundsInfoSection;
