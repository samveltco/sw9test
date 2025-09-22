// ©2024 Austin App House. All rights reserved.
import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { toggleModal } from '../../store/actions/modalsActions';

class PortalContainer extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
    this.el.classList.add(props.className || 'portal-element');
  }

  componentDidMount() {
    this.props.parentContainer.appendChild(this.el);
  }

  componentWillUnmount() {
    if (this.props.modalState[this.props.modalName].isOpen) {
      this.props.toggleModal(false, this.props.modalName);
    }
    this.props.parentContainer.removeChild(this.el);
    this.props.closeModal && this.props.closeModal();
  }

  render() {
    const children = this.props.modalState[this.props.modalName].isOpen
      ? this.props.children
      : <></>;
    return ReactDOM.createPortal(
      children,
      this.el,
    );
  }
}

const mapStateToProps = state => ({
  modalState: state.modalState,
});

export default connect(mapStateToProps, { toggleModal })(PortalContainer);
