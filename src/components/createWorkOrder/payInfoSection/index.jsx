// ©2024 Austin App House. All rights reserved.
import React from 'react';
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
              <input id="amount" name="amount" type="text" maxLength={10} placeholder="$0.00" />
            </div>
          </div>
          <div className="check_block">
            <label className="check_btn">
              <input type="checkbox" name="pay_base_rate_as_minimum" />
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
              <input id="qty" name="qty" type="text" maxLength={10} placeholder="$0.00" />
            </div>
          </div>
          <div className="check_block">
            <label className="check_btn">
              <input type="checkbox" name="pay_outside_of_app" />
              Pay Outside Of App
            </label>
          </div>
        </div>
        <div className="small_row">
          <div className="field_name">
            <label htmlFor="estpay">Est.Pay</label>
          </div>
          <div className="field_block">
            <input id="estpay" name="estpay" type="text" maxLength={10} placeholder="$0.00" disabled />
          </div>
        </div>
        <div className="small_row">
          <div className="field_name">
            <label htmlFor="per">Per*</label>
          </div>
          <div className="field_block">
            <input id="per" name="per" type="text" maxLength={10} placeholder="$0.00" />
            <span className="step_btns">
              <span className="icon_stepup"></span>
              <span className="icon_stepdown"></span>
            </span>
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
            <input id="soft_skills" name="soft_skills" type="text" maxLength={10} placeholder="$0.00" />
          </div>
        </div>
        <div className="small_row">
          <div className="field_name">
            <label htmlFor="work">Work*</label>
          </div>
          <div className="field_block">
            <input id="work" name="work" type="text" maxLength={10} placeholder="00" />
          </div>
        </div>
        <div className="small_row">
          <div className="field_name">
            <label htmlFor="deliverables">Deliverables*</label>
          </div>
          <div className="field_block">
            <input id="deliverables" name="deliverables" type="text" maxLength={10} placeholder="00" />
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
            <input id="amount2" name="amount2" type="text" maxLength={10} placeholder="$0.00" />
          </div>
        </div>
        <div className="small_row">
          <div className="field_name">
            <label htmlFor="per2">Per*</label>
          </div>
          <div className="field_block">
            <input id="per2" name="per2" type="text" maxLength={10} placeholder="$0.00" />
            <span className="step_btns">
              <span className="icon_stepup"></span>
              <span className="icon_stepdown"></span>
            </span>
          </div>
        </div>
        <div className="small_row">
          <div className="field_name">
            <label htmlFor="after">After</label>
          </div>
          <div className="field_block">
            <input id="after" name="after" type="text" maxLength={10} placeholder="00" />
          </div>
        </div>
        <div className="small_row">
          <div className="field_name">
            <label htmlFor="max_qty">Max Qty*</label>
          </div>
          <div className="field_block">
            <input id="max_qty" name="max_qty" type="text" maxLength={10} placeholder="00" />
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
