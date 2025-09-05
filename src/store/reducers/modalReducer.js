// ©2024 Austin App House. All rights reserved.
import { TOGGLE_MODAL } from '../actions/types';

const initialState = {
  viewDetailsWorkOrderModal: {
    isOpen: false,
    modalName: 'viewDetailsWorkOrderModal',
  },
  applyModal: {
    isOpen: false,
    modalName: 'applyModal',
  },
  importWorkOrderModal: {
    isOpen: false,
    modalName: 'importWorkOrderModal',
  },
  importRecruitsModal: {
    isOpen: false,
    modalName: 'importRecruitsModal',
  },
  viewAllApplicantsForWorkOrderModal: {
    isOpen: false,
    modalName: 'viewAllApplicantsForWorkOrderModal',
  },
  unAssignModal: {
    isOpen: false,
    modalName: 'unAssignModal',
  },
  contractorDetailsModal: {
    isOpen: false,
    modalName: 'contractorDetailsModal',
  },
  nearByContractorModal: {
    isOpen: false,
    modalName: 'nearByContractorModal',
  },
  copyWorkOrderModal: {
    isOpen: false,
    modalName: 'copyWorkOrderModal',
  },
  profile: {
    isOpen: false,
    modalName: 'profile',
  },
  googleMapsModal: {
    isOpen: false,
    modalName: 'googleMapsModal',
  },
  imageViewModal: {
    isOpen: false,
    modalName: 'imageViewModal',
  },
  explanationInputModal: {
    isOpen: false,
    modalName: 'explanationInputModal',
  },
  explanationDeactivationModal: {
    isOpen: false,
    modalName: 'explanationDeactivationModal',
  },
  blockModal: {
    isOpen: false,
    modalName: 'blockModal',
  },
  messageRateModal: {
    isOpen: false,
    modalName: 'messageRateModal',
  },
  addFunds: {
    isOpen: false,
    modalName: 'addFunds',
  },
  addOrEditPaymentMethod: {
    isOpen: false,
    modalName: 'addOrEditPaymentMethod',
  },
  resetPassword: {
    isOpen: false,
    modalName: 'resetPassword',
  },
  unsubscribeFromNotifications: {
    isOpen: false,
    modalName: 'unsubscribeFromNotifications',
  },
  workOrderMessageSystemModal: {
    isOpen: false,
    modalName: 'workOrderMessageSystemModal',
  },
  contractorInviteSelectWorkOrder: {
    isOpen: false,
    modalName: 'contractorInviteSelectWorkOrder',
  },
  errorModal: {
    isOpen: false,
    modalName: 'errorModal',
  },
  confirmModal: {
    isOpen: false,
    modalName: 'confirmModal',
  },
  bulkMessageModal: {
    isOpen: false,
    modalName: 'bulkMessageModal',
  },
  bulkEditWorkOrders: {
    isOpen: false,
    modalName: 'bulkEditWorkOrders',
  },
  bulkWorkOrderApproveModal: {
    isOpen: false,
    modalName: 'bulkWorkOrderApproveModal',
  },
  loader: {
    isOpen: false,
    modalName: 'loader',
  },
  bulkWorkOrderRouteContractorModal: {
    isOpen: false,
    modalName: 'bulkWorkOrderRouteContractorModal',
  },
  bulkWorkOrderAssignContractorModal: {
    isOpen: false,
    modalName: 'bulkWorkOrderAssignContractorModal',
  },
  contactUsModal: {
    isOpen: false,
    modalName: 'contactUsModal',
  },
  projectAndCompanyControlModal: {
    isOpen: false,
    modalName: 'projectAndCompanyControlModal',
    type: {},
  },
  editCustomFieldModal: {
    isOpen: false,
    modalName: 'editCustomFieldModal',
    type: {},
  },
  editClientApprovalCodeModal: {
    isOpen: false,
    modalName: 'editClientApprovalCodeModal',
    type: {},
  },
  acceptAgreements: {
    isOpen: false,
    modalName: 'acceptAgreements',
  },
  addBankInfoForContractor: {
    isOpen: false,
    modalName: 'addBankInfoForContractor',
  },
  setUpBankInfoForContractor: {
    isOpen: false,
    modalName: 'setUpBankInfoForContractor',
  },
  filtersModal: {
    isOpen: false,
    modalName: 'filtersModal',
  },
  contractorTaxInformationModal: {
    isOpen: false,
    modalName: 'contractorTaxInformationModal',
  },
  bulkWorkOrderPay: {
    isOpen: false,
    modalName: 'bulkWorkOrderPay',
  },
  editCompanyBySuperAdmin: {
    isOpen: false,
    modalName: 'editCompanyBySuperAdmin',
  },
  addFundsToDwollaBalance: {
    isOpen: false,
    modalName: 'addFundsToDwollaBalance',
  },
  addFundingSourceToDwollaBySuperAdmin: {
    isOpen: false,
    modalName: 'addFundingSourceToDwollaBySuperAdmin',
  },
  verifyFundingSource: {
    isOpen: false,
    modalName: 'verifyFundingSource',
  },
  deleteClientFromCompany: {
    isOpen: false,
    modalName: 'deleteClientFromCompany',
  },
  newApiVersion: {
    isOpen: false,
    modalName: 'newApiVersion',
  },
  createOrAddCustomFieldToWorkOrder: {
    isOpen: false,
    modalName: 'createOrAddCustomFieldToWorkOrder',
  },
  createOrAddClientApprovalCodeToWorkOrder: {
    isOpen: false,
    modalName: 'createOrAddClientApprovalCodeToWorkOrder',
  },
  purchaseCertificate: {
    isOpen: false,
    modalName: 'purchaseCertificate',
  },
  addOrEditTeams: {
    isOpen: false,
    modalName: 'addOrEditTeams',
  },
  addOrEditGroups: {
    isOpen: false,
    modalName: 'addOrEditGroups',
  },
  addOrEditUsersForManagement: {
    isOpen: false,
    modalName: 'addOrEditUsersForManagement',
  },
  addOrEditCustomFields: {
    isOpen: false,
    modalName: 'addOrEditCustomFields',
  },
  loginModal: {
    isOpen: false,
    modalName: 'loginModal',
  },
  forgotPasswordModal: {
    isOpen: false,
    modalName: 'forgotPasswordModal',
  },
  verifyAccountModal: {
    isOpen: false,
    modalName: 'verifyAccountModal',
  },
  signUpModal: {
    isOpen: false,
    modalName: 'signUpModal',
  },
  testFailed: {
    isOpen: false,
    modalName: 'testFailed',
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_MODAL: {
      const newState = action.payload.savePrevOpenModal
        ? state
        : initialState;
      const type = action.payload.type
        ? { type: action.payload.type } : { type: false };
      return {
        ...newState,
        [action.payload.modalName]: {
          ...state[action.payload.modalName],
          isOpen: action.payload.isOpen,
          ...type,
        },
      };
    }
    default:
      return state;
  }
}
