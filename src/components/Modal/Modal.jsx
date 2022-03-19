import { Component } from 'react';
import { Overlay, ModalWindow } from './Modal.styled';
import PropTypes from 'prop-types';

export default class Modal extends Component {
  static propTypes = {
    largeUrl: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleEscapeDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscapeDown);
  }

  handleEscapeDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    const { largeUrl, alt } = this.props;
    return (
      <Overlay onClick={this.handleOverlayClick}>
        <ModalWindow>
          <img src={largeUrl} alt={alt} />
        </ModalWindow>
      </Overlay>
    );
  }
}
