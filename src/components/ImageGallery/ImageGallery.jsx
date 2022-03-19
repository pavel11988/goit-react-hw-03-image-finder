import { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button/Button';
import ImageError from 'components/ImageError/ImageError';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import PixabayApiService from 'services/axios-api';

import {
  ImageGalleryContainer,
  ImageGalleryList,
  Idle,
} from './ImageGallery.styled';

const imageApi = new PixabayApiService();

export default class ImageGallery extends Component {
  state = {
    imagesArray: [],
    error: null,
    status: 'idle',
    newSearch: true,
  };

  componentDidUpdate(prevProps) {
    //В componentDidUpdate - все только через проверки.

    const prevSearchQuery = prevProps.searchQuery;
    const nextSearchQuery = this.props.searchQuery;

    if (prevSearchQuery !== nextSearchQuery) {
      this.setState({
        imagesArray: [],
        error: null,
        page: 1,
        pages: 0,
        status: 'pending',
        newSearch: true,
      });
      imageApi.resetPage();
      imageApi.setQuery(nextSearchQuery);
      this.fetchToApi();
    }
  }

  loadMore = e => {
    e.preventDefault();
    imageApi.incrementPage();
    this.setState({
      newSearch: false,
      status: 'pending',
    });
    this.fetchToApi();
  };

  fetchToApi() {
    const nextSearchQuery = this.props.searchQuery;
    imageApi
      .fetchOfQuery()
      .then(imagesArray => {
        //Проверяем массив, который нам вернул API на пустоту:
        if (imagesArray.hits.length !== 0) {
          return this.setState(prevState => ({
            imagesArray: [...prevState.imagesArray, ...imagesArray.hits],
            status: 'resolved',
          }));
        }
        //Если API вернул пустой массив - делаем ошибку:
        return Promise.reject(
          new Error(
            `No images found for your query "${nextSearchQuery.trim()}"`
          )
        );
      })
      .catch(error => this.setState({ error, status: 'rejected' }));
  }

  render() {
    const { imagesArray, error, status, newSearch } = this.state;

    if (status === 'idle') {
      return <Idle>Please, enter your request.</Idle>;
    }

    if (status === 'pending') {
      if (newSearch === false) {
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
            <Loader />
          </ImageGalleryContainer>
        );
      }
      if (newSearch === true) return <Loader />;
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

          {imageApi.notLastPage && <Button loadMore={this.loadMore} />}
        </ImageGalleryContainer>
      );
    }
  }
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  getUrlLarge: PropTypes.func.isRequired,
};
