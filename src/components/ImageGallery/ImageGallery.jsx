import { Component } from 'react';
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

export default class ImageGallery extends Component {
  static propTypes = {
    getUrlLarge: PropTypes.func.isRequired,
    imagesArray: PropTypes.arrayOf(PropTypes.object).isRequired,
    status: PropTypes.string.isRequired,
    loadMore: PropTypes.func.isRequired,
    error: PropTypes.object,
  };

  render() {
    const { getUrlLarge, imagesArray, status, loadMore, error, notLastPage } =
      this.props;

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
                getUrlLarge={this.props.getUrlLarge}
              />
            ))}
          </ImageGalleryList>

          {notLastPage && <Button loadMore={loadMore} />}
        </ImageGalleryContainer>
      );
    }
  }
}
