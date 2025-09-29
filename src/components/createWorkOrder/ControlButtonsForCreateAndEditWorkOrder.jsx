// ©2024 Austin App House. All rights reserved.
import React from 'react';
import { connect } from 'react-redux';
import { submit, change } from 'redux-form';

const ControlButtonsForCreateAndEditWorkOrder = ({
  editingWorkOrderStatus,
  history,
  submit,
  change,
}) => {
  const cancel = (event) => {
    event.preventDefault();
    history.goBack();
  };

  const handlerSave = async event => {
    event.preventDefault();
    await change(
      'createWorkOrderReduxForm',
      'status',
      editingWorkOrderStatus === 'assigned' ? 'assigned' : 'published',
    );
    submit('createWorkOrderReduxForm');
  };

  const handlerSaveAsDraft = async event => {
    event.preventDefault();
    await change(
      'createWorkOrderReduxForm',
      'status',
      'draft',
    );
    submit('createWorkOrderReduxForm');
  };

  return (
    <div className="create_actions">
      <button
        color="info"
        type="button"
        name={editingWorkOrderStatus === 'assigned' ? 'assigned' : 'published'}
        className="standard_btn lightest_btn"
        aria-label="save and publish"
        onClick={handlerSave}
      >
        Save
        {editingWorkOrderStatus === 'assigned' ? '' : ' And Publish'}
      </button>
      {
        editingWorkOrderStatus !== 'assigned'
          ? (
            <button
              color="info"
              type="submit"
              name="draft"
              aria-label="save as draft"
              className="standard_btn light_btn"
              onClick={handlerSaveAsDraft}
            >
              Save As Draft
            </button>
          )
          : <></>
      }
      <button color="deep-orange"  aria-label="cancel" type="button" className="standard_btn dark_btn" onClick={cancel}>Cancel</button>
    </div>
  );
};

const mapDispatchToProps = {
  submit,
  change,
};

export default connect(null, mapDispatchToProps)(ControlButtonsForCreateAndEditWorkOrder);
