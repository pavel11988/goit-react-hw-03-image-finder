import { Component } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';
import { AppContainer } from './App.styled';

export default class App extends Component {
  state = {
    searchQuery: '',
    showModal: false,
    image: {
      largeUrl: '',
      alt: '',
    },
  };

  handleSearchQuerySubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  toggleModal = (largeUrl, alt) => {
    if (!this.state.showModal) {
      this.setState({
        image: {
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

  render() {
    const { showModal } = this.state;
    return (
      <AppContainer>
        <Searchbar onSubmit={this.handleSearchQuerySubmit} />
        <ImageGallery
          searchQuery={this.state.searchQuery}
          getUrlLarge={this.toggleModal}
        />
        {showModal && (
          <Modal
            largeUrl={this.state.image.largeUrl}
            alt={this.state.image.alt}
            onClose={this.toggleModal}
          />
        )}
      </AppContainer>
    );
  }
}
