import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

import { ImageGalleryList, ImageGalleryContainer } from './ImageGallery.styled';
const ImageGallery = ({ getUrlLarge, imagesArray }) => {
  return (
    <ImageGalleryContainer>
      <ImageGalleryList className="gallery">
        {imagesArray.map(({ id, webformatURL, largeImageURL, tags }) => (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            large={largeImageURL}
            tags={tags}
            getUrlLarge={getUrlLarge}
          />
        ))}
      </ImageGalleryList>
    </ImageGalleryContainer>
  );
};

ImageGallery.propTypes = {
  getUrlLarge: PropTypes.func.isRequired,
  imagesArray: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ImageGallery;
