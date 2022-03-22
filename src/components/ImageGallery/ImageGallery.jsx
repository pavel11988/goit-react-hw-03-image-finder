import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

import { ImageGalleryList, ImageGalleryContainer } from './ImageGallery.styled';
const ImageGallery = ({ getUrlLarge, imagesArray }) => {
  return (
    <ImageGalleryContainer>
      <ImageGalleryList className="gallery">
        {imagesArray.map(item => (
          <ImageGalleryItem
            key={item.id}
            webformatURL={item.webformatURL}
            large={item.largeImageURL}
            tags={item.tags}
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
