import React from 'react';
import { connect } from 'react-redux';
import { toggleModal } from '../../store/actions/modalsActions';

const GenericModal = ({ modal, modalName, toggleModal }) => {
  if (!modal) return null;

  const close = () => toggleModal(false, modalName);

  const onConfirm = () => {
    if (modal.type && typeof modal.type.onAccept === 'function') {
      modal.type.onAccept();
    }
    close();
  };

  const isLoader = modalName === 'loader';
  const isConfirm = modalName === 'confirmModal';

  return (
    <div className={isLoader ? 'modal_block loader showed' : 'modal_block showed'}>
      <div className="modal_container">
        <div className="modal_head">
          <div className="modal_title">{modal.type?.header || 'Modal'}</div>
          {!isLoader && (
            <button className="close_btn icon_close" aria-label="close" onClick={close}></button>
          )}
        </div>
        <div className="modal_body">
          {isLoader ? (
            <div className="flex-box flex-center" style={{ padding: 16 }}>
              <div>Loading...</div>
            </div>
          ) : (
            <pre style={{ whiteSpace: 'pre-wrap' }}>{modal?.type?.message || ''}</pre>
          )}
        </div>
        {!isLoader && (
          <div className="modal_footer">
            {isConfirm ? (
              <>
                <button className="standard_btn dark_btn" onClick={close}>
                  {modal?.type?.buttonLabels?.reject || 'Cancel'}
                </button>
                <button className="standard_btn light_btn" onClick={onConfirm}>
                  {modal?.type?.buttonLabels?.confirm || 'OK'}
                </button>
              </>
            ) : (
              <button className="standard_btn dark_btn" onClick={close}>Close</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  modal: state.modalState[ownProps.modalName],
});

export default connect(mapStateToProps, { toggleModal })(GenericModal); 