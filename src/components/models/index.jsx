import React from 'react';
import CreateOrAddCustomFieldToWorkOrder from './CreateOrAddCustomFieldToWorkOrder';
import PortalContainer from './Portal';

const Modal = ({ mainContainer }) => (
  console.log('mainContainer', mainContainer),
  mainContainer
    ? (
      <>
        <PortalContainer parentContainer={mainContainer} modalName="createOrAddCustomFieldToWorkOrder">
          <CreateOrAddCustomFieldToWorkOrder mainContainer={mainContainer} />
        </PortalContainer>
      </>
    )
    : null
);

export default Modal;