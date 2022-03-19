import { ImageGalleryItemContainer } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ webformatURL, tags, large, getUrlLarge }) => {
  return (
    <ImageGalleryItemContainer>
      <img
        src={webformatURL}
        alt={tags}
        name="image"
        large={large}
        onClickCapture={() => {
          getUrlLarge(large, tags);
        }}
        width="400px"
        height="300px"
      />
    </ImageGalleryItemContainer>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  large: PropTypes.string.isRequired,
  getUrlLarge: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
