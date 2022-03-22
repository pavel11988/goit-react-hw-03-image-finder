import { Component } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';
import PixabayApiService from 'services/axios-api';
import ImageError from 'components/ImageError/ImageError';

import { ImageGalleryContainer } from './ImageGallery/ImageGallery.styled'; //в апп

import Loader from './Loader/Loader';

import { AppContainer, Idle } from './App.styled';

const imageApi = new PixabayApiService();

export default class App extends Component {
  state = {
    searchQuery: '',
    showModal: false,
    imagesArray: [],
    error: null,
    status: 'idle',
    largeImage: {
      largeUrl: '',
      alt: '',
    },
    page: 1,
  };

  handleSearchQuerySubmit = searchQuery => {
    this.setState({
      searchQuery: searchQuery,
      page: 1,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearchQuery = prevState.searchQuery;
    const nextSearchQuery = this.state.searchQuery;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevSearchQuery !== nextSearchQuery) {
      this.setState({
        imagesArray: [],
        error: null,
        status: 'pending',
        page: 1,
      });
      imageApi.setQuery(nextSearchQuery);
      imageApi.setPage(nextPage);

      this.fetchToApi();
    }

    if (nextPage !== 1 && prevPage !== nextPage) {
      imageApi.setPage(nextPage);
      this.fetchToApi();
    }
  }

  loadMore = e => {
    e.preventDefault();

    this.setState(prevState => ({
      page: prevState.page + 1,
      status: 'pending',
    }));
  };

  toggleModal = (largeUrl, alt) => {
    if (!this.state.showModal) {
      this.setState({
        largeImage: {
          largeUrl: largeUrl,
          alt: alt,
        },
        showModal: true,
      });
    }
    if (this.state.showModal) {
      this.setState({ showModal: false });
    }
  };

  fetchToApi() {
    const nextSearchQuery = this.state.searchQuery;
    imageApi
      .fetchOfQuery()
      .then(newImagesArray => {
        //Проверяем массив, который нам вернул API на пустоту:
        if (newImagesArray.length !== 0) {
          return this.setState(prevState => ({
            imagesArray: [...prevState.imagesArray, ...newImagesArray],
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
    const { showModal, status, imagesArray, error, largeImage } = this.state;
    let gallery;

    if (status === 'idle') {
      gallery = <Idle>Please, enter your request.</Idle>;
    }

    if (status === 'pending') {
      if (imagesArray.length !== 0) gallery = <Loader />;

      gallery = (
        <ImageGalleryContainer>
          <ImageGallery
            getUrlLarge={this.toggleModal}
            imagesArray={imagesArray}
          />
          <Loader />
        </ImageGalleryContainer>
      );
    }

    if (status === 'rejected') {
      gallery = <ImageError message={error.message} />;
    }

    if (status === 'resolved') {
      gallery = (
        <ImageGallery
          getUrlLarge={this.toggleModal}
          imagesArray={imagesArray}
        />
      );
    }

    return (
      <AppContainer>
        <Searchbar onSubmit={this.handleSearchQuerySubmit} />
        {gallery}
        {imageApi.notLastPage() && status === 'resolved' && (
          <Button loadMore={this.loadMore} />
        )}
        {showModal && (
          <Modal
            largeUrl={largeImage.largeUrl}
            alt={largeImage.alt}
            onClose={this.toggleModal}
          />
        )}
      </AppContainer>
    );
  }
}
