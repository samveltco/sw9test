import React from 'react';
import CreateOrAddCustomFieldToWorkOrder from './CreateOrAddCustomFieldToWorkOrder';
import PortalContainer from './Portal';
import EditCustomFieldModal from './EditCustomFieldModal';
import GenericModal from './GenericModal';
import CreateOrAddClientApprovalCodeToWorkOrder from './CreateOrAddClientApprovalCodeToWorkOrder';

const Modal = ({ mainContainer }) => (
  mainContainer
    ? (
      <>
        <PortalContainer parentContainer={mainContainer} modalName="createOrAddCustomFieldToWorkOrder">
          <CreateOrAddCustomFieldToWorkOrder mainContainer={mainContainer} />
        </PortalContainer>
        <PortalContainer parentContainer={mainContainer} modalName="editCustomFieldModal">
          <EditCustomFieldModal mainContainer={mainContainer} />
        </PortalContainer>
        {/* <PortalContainer parentContainer={mainContainer} modalName="loader">
          <GenericModal modalName="loader" />
        </PortalContainer> */}
        <PortalContainer parentContainer={mainContainer} modalName="confirmModal">
          <GenericModal modalName="confirmModal" />
        </PortalContainer>
        <PortalContainer parentContainer={mainContainer} modalName="viewDetailsWorkOrderModal">
          <GenericModal modalName="viewDetailsWorkOrderModal" />
        </PortalContainer>
        <PortalContainer parentContainer={mainContainer} modalName="contractorDetailsModal">
          <GenericModal modalName="contractorDetailsModal" />
        </PortalContainer>
        <PortalContainer parentContainer={mainContainer} modalName="createOrAddClientApprovalCodeToWorkOrder">
          <CreateOrAddClientApprovalCodeToWorkOrder mainContainer={mainContainer} />
        </PortalContainer>
        <PortalContainer parentContainer={mainContainer} modalName="messageRateModal">
          <GenericModal modalName="messageRateModal" />
        </PortalContainer>
      </>
    )
    : null
);

export default Modal;