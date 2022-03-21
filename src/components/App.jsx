import { Component } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';
import PixabayApiService from 'services/axios-api';

import { AppContainer } from './App.styled';

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
    newSearch: true,
  };

  handleSearchQuerySubmit = searchQuery => {
    this.setState({ searchQuery: searchQuery, newSearch: true });
  };

  componentDidUpdate(prevState) {
    //В componentDidUpdate - все только через проверки.
    // const prevSearchQuery = prevState.searchQuery;
    const nextSearchQuery = this.state.searchQuery;

    // console.log(prevState.searchQuery);
    // console.log(this.state.searchQuery);

    if (this.state.newSearch === true) {
      this.setState({
        imagesArray: [],
        error: null,
        status: 'pending',
        newSearch: false,
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
        if (newImagesArray.hits.length !== 0) {
          return this.setState(prevState => ({
            imagesArray: [...prevState.imagesArray, ...newImagesArray.hits],
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

    return (
      <AppContainer>
        <Searchbar onSubmit={this.handleSearchQuerySubmit} />
        <ImageGallery
          getUrlLarge={this.toggleModal}
          imagesArray={imagesArray}
          status={status}
          loadMore={this.loadMore}
          error={error}
          notLastPage={imageApi.notLastPage()}
        />
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
