import errorImage from './not-found-image.jpg';
import {
  ImageErrorContainer,
  ImageErrorMessage,
  ErrorImage,
} from './ImageError.styled';
import PropTypes from 'prop-types';

export default function ImageError({ message }) {
  return (
    <ImageErrorContainer>
      <ImageErrorMessage>{message}</ImageErrorMessage>
      <ErrorImage src={errorImage} width="360" alt="not-found" />
    </ImageErrorContainer>
  );
}

ImageError.propTypes = {
  message: PropTypes.string.isRequired,
};
