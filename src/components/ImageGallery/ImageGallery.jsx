import PropTypes from 'prop-types';
import Button from 'components/Button/Button';
import ImageError from 'components/ImageError/ImageError';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';

import {
  ImageGalleryContainer,
  ImageGalleryList,
  Idle,
} from './ImageGallery.styled';

const ImageGallery = ({
  getUrlLarge,
  imagesArray,
  status,
  loadMore,
  error,
  notLastPage,
}) => {
  if (status === 'idle') {
    return <Idle>Please, enter your request.</Idle>;
  }

  if (status === 'pending') {
    if (imagesArray.length !== 0) {
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
          <Loader />
        </ImageGalleryContainer>
      );
    }
    if (imagesArray.length === 0) return <Loader />;
  }

  if (status === 'rejected') {
    return <ImageError message={error.message} />;
  }

  if (status === 'resolved') {
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

        {notLastPage && <Button loadMore={loadMore} />}
      </ImageGalleryContainer>
    );
  }
};

ImageGallery.propTypes = {
  getUrlLarge: PropTypes.func.isRequired,
  imagesArray: PropTypes.arrayOf(PropTypes.object).isRequired,
  status: PropTypes.string.isRequired,
  loadMore: PropTypes.func.isRequired,
  error: PropTypes.object,
};

export default ImageGallery;
