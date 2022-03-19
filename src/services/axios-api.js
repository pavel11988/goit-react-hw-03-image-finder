export default class PixabayApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.pages = 0;
  }

  async fetchOfQuery() {
    const axios = require('axios').default;

    const options = {
      method: 'get',
      url: 'https://pixabay.com/api/',
      params: {
        key: '25183091-c830d5bb3408c075d70b274d4',
        q: this.searchQuery,
        image_type: 'photo',
        per_page: 12,
        page: this.page,
        orientation: 'horizontal',
      },
    };

    const serchResult = await axios(options);
    this.pages = Math.ceil(
      serchResult.data.totalHits / options.params.per_page
    );
    return serchResult.data;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  getPages() {
    return this.pages;
  }

  getPage() {
    return this.page;
  }

  notLastPage() {
    return this.getPages() !== this.getPage();
  }

  setQuery(newQuery) {
    this.searchQuery = newQuery;
  }
}
