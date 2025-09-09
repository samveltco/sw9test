// ©2024 Austin App House. All rights reserved.
import React from 'react';
import InputField from '../../layout/reduxForm/customFields/InputField';
import { Field } from 'redux-form';
import CheckboxField from '../../layout/reduxForm/customFields/CheckboxField';
import SelectField from '../../layout/reduxForm/customFields/SelectField';
// import BasePaySection from './BasePaySection';
// import DividedPaySection from './DividedPaySection';
// import VariablePaySection from './VariablePaySection';
// import FundsInfoSection from './FundsInfoSection';

const PayInfoSection = ({ isWorkOrderAssigned }) => (
  // <MDBCol>
  //   <MDBContainer fluid className="font-size-08">
  //     <MDBRow className="justify-content-between">
  //       <BasePaySection isWorkOrderAssigned={isWorkOrderAssigned} />
  //       <DividedPaySection />
  //     </MDBRow>
  //     <MDBRow className="justify-content-between">
  //       <VariablePaySection isWorkOrderAssigned={isWorkOrderAssigned} />
  //       <FundsInfoSection />
  //     </MDBRow>
  //   </MDBContainer>
  // </MDBCol>
  <>

    <div className="fields_group">
      <div className="group_col">
        <div className="group_name">Base Pay</div>
        <div className="combo_field">
          <div className="small_row">
            <div className="field_name">
              <label htmlFor="amount">Amount*</label>
            </div>
            <div className="field_block">
              <Field 
                component={InputField}
                id="amount"
                name="amount"
                type="text"
                maxLength={10}
                placeholder="$0.00"
              />
            </div>
          </div>
          <div className="check_block">
            <label className="check_btn">
              <Field 
                component={CheckboxField}
                type="checkbox"
                name="payBaseRateAsMinimum"
              />
              Pay Base Rate As Minimum
            </label>
          </div>
        </div>
        <div className="combo_field">
          <div className="small_row">
            <div className="field_name">
              <label htmlFor="qty">Qty*</label>
            </div>
            <div className="field_block">
              <Field 
                component={InputField}
                id="qty"
                name="quantity"
                type="text"
                maxLength={10}
                placeholder="$0.00"
              />
            </div>
          </div>
          <div className="check_block">
            <label className="check_btn">
              <Field 
                component={CheckboxField}
                type="checkbox"
                name="payOutsideOfApp"
              />
              Pay Outside Of App
            </label>
          </div>
        </div>
        <div className="small_row">
          <div className="field_name">
            <label htmlFor="estpay">Est.Pay</label>
          </div>
          <div className="field_block">
            <Field 
              component={InputField}
              id="estpay"
              name="estpay"
              type="text"
              maxLength={10}
              placeholder="$0.00"
              disabled
            />
            
          </div>
        </div>
        <div className="small_row">
          <div className="field_name">
            <label htmlFor="per">Per*</label>
          </div>
          <div className="field_block">
            <Field 
              component={SelectField}
              id="per"
              name="basicType"
              options={[
                {
                  value: 'Hour',
                  label: 'Hour',
                },
                {
                  value: 'Device',
                  label: 'Device',
                },
                {
                  value: 'Site',
                  label: 'Site / Flat',
                },
              ]}
            />
           
          </div>
        </div>
      </div>
      <div className="group_col">
        <div className="group_name">How Pay is Divided</div>
        <div className="small_row">
          <div className="field_name">
            <label htmlFor="soft_skills">Soft Skills*</label>
          </div>
          <div className="field_block">
            <Field 
              component={InputField}
              id="soft_skills"
              name="percentCommunication"
              type="text"
              maxLength={10}
              placeholder="$0.00"
            />
          </div>
        </div>
        <div className="small_row">
          <div className="field_name">
            <label htmlFor="work">Work*</label>
          </div>
          <div className="field_block">
            <Field 
              component={InputField}
              id="work"
              name="percentWork"
              type="text"
              maxLength={10}
              placeholder="00"
            />
          </div>
        </div>
        <div className="small_row">
          <div className="field_name">
            <label htmlFor="deliverables">Deliverables*</label>
          </div>
          <div className="field_block">
            <Field 
              component={InputField}
              id="deliverables"
              name="percentDeliverables"
              type="text"
              maxLength={10}
              placeholder="00"
            />
          </div>
        </div>
      </div>
      <div className="group_col has_bg">
        <div className="group_name">Variable Pay (Optional)</div>
        <div className="small_row">
          <div className="field_name">
            <label htmlFor="amount2">Amount*</label>
          </div>
          <div className="field_block">
            <Field 
              component={InputField}
              id="amount2"
              name="variableAmount"
              type="text"
              maxLength={10}
              placeholder="$0.00"
            />
          </div>
        </div>
        <div className="small_row">
          <div className="field_name">
            <label htmlFor="per2">Per*</label>
          </div>
          <div className="field_block">
            <Field 
              component={SelectField}
              id="per2"
              options={[
                {
                  value: 'Hour',
                  label: 'Hour',
                },
                {
                  value: 'Device',
                  label: 'Device',
                },
              ]}
              name="variableType"
            />
            {/* <span className="step_btns">
              <span className="icon_stepup"></span>
              <span className="icon_stepdown"></span>
            </span> */}
          </div>
        </div>
        <div className="small_row">
          <div className="field_name">
            <label htmlFor="after">After</label>
          </div>
          <div className="field_block">
            <Field 
              component={InputField}
              id="after"
              name="variablePayAfter"
              type="text"
              maxLength={10}
              placeholder="00"
            />
          </div>
        </div>
        <div className="small_row">
          <div className="field_name">
            <label htmlFor="max_qty">Max Qty*</label>
          </div>
          <div className="field_block">
            <Field 
              component={InputField}
              id="max_qty"
              name="maxQuantity"
              type="text"
              maxLength={10}
              placeholder="00"
            />
          </div>
        </div>
      </div>
    </div>

    <div className="funds_info">
      <div className="info_row">
        <div className="fund_type">Funds Required</div>
        <div className="fund_size">$0.00</div>
      </div>
      <div className="info_row">
        <div className="fund_type">Funds Available</div>
        <div className="fund_size">$1,268.22</div>
      </div>
    </div>
  </>
);

export default PayInfoSection;
