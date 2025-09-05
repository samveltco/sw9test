// ©2024 Austin App House. All rights reserved.
import { TOGGLE_MODAL } from './types';

export const toggleModal = (isOpen, modalName, savePrevOpenModal, type) => ({
  type: TOGGLE_MODAL,
  payload: {
    isOpen,
    modalName,
    savePrevOpenModal,
    type,
  },
});

export const toggleSecondModalClose = (modalName, savePrevOpenModal, type) => dispatch => {
  Promise.resolve(dispatch(toggleModal(false, modalName, savePrevOpenModal, type)))
    .then(() => savePrevOpenModal && document.body.classList.add('modal-open'));
};
