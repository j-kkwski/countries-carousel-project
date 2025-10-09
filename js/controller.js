'use strict';

import model from './model.js';
import view from './view.js';

class CountryController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    // Bind event handlers
    this.view.bindSearchSubmit(this.handleSearch.bind(this));
    this.view.bindNeighborClick(this.handleNeighborClick.bind(this));
  }

  async init(lat = 52.237049, lng = 21.017532) {
    try {
      const { main, neighbors } = await this.model.fetchCountryByCoords(
        lat,
        lng
      );
      this.renderCountries(main, neighbors);
    } catch (err) {
      console.error(`Error: ${err.message} 💥`);
      this.view.renderError(
        `Something went wrong 💥 ${err.message}. Try again!`
      );
    }
  }

  async handleSearch(countryName) {
    try {
      this.view.startTransition();
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for fade out

      this.view.clearCountries();
      const { main, neighbors } = await this.model.fetchCountryByName(
        countryName
      );
      this.renderCountries(main, neighbors);
    } catch (err) {
      console.error('Error:', err);
      this.view.renderError(`Could not find the country. Please try again.`);
    } finally {
      this.view.endTransition();
    }
  }

  async handleNeighborClick(countryName) {
    await this.handleSearch(countryName);
  }

  renderCountries(main, neighbors) {
    this.view.renderCountry(main);
    neighbors.forEach((neighbor, i) =>
      this.view.renderCountry(neighbor, 'neighbour', i, neighbors.length)
    );
  }
}

export default new CountryController(model, view);
