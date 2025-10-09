'use strict';

class CountryModel {
  constructor() {
    this.currentCountry = null;
    this.neighbors = [];
  }

  async fetchCountryByCoords(lat, lng) {
    try {
      const geocodeUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`;
      const locationData = await this.fetchJSON(
        geocodeUrl,
        'Geocoding API error'
      );
      return this.fetchCountryByName(locationData.countryName);
    } catch (err) {
      throw new Error(`Could not fetch country by coordinates: ${err.message}`);
    }
  }

  async fetchCountryByName(name) {
    try {
      const response = await this.fetchJSON(
        `https://restcountries.com/v2/name/${encodeURIComponent(name)}`,
        'Country API error'
      );

      this.currentCountry = this.mapCountry(response[0]);
      if (!this.currentCountry) throw new Error('Country data missing');

      // Fetch neighbors
      this.neighbors = await this.fetchNeighbors(this.currentCountry.borders);

      return {
        main: this.currentCountry,
        neighbors: this.neighbors,
      };
    } catch (err) {
      throw new Error(`Could not fetch country by name: ${err.message}`);
    }
  }

  async fetchNeighbors(borderCodes) {
    if (!borderCodes || !borderCodes.length) return [];

    try {
      const promises = borderCodes.map(code =>
        this.fetchJSON(
          `https://restcountries.com/v2/alpha/${encodeURIComponent(code)}`,
          'Neighbor country not found'
        )
      );

      const results = await Promise.all(promises);
      return results.map(this.mapCountry).filter(Boolean);
    } catch (err) {
      throw new Error(`Could not fetch neighbors: ${err.message}`);
    }
  }

  async fetchJSON(url, errorMsg = 'Something went wrong') {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  }

  mapCountry(country) {
    if (!country) return null;

    const languages = Array.isArray(country.languages)
      ? country.languages.map(l => l.name || l)
      : [];
    const currencies = Array.isArray(country.currencies)
      ? country.currencies.map(c => c.name || c)
      : [];

    return {
      flag: country.flag,
      name: country.name,
      region: country.region,
      population: country.population,
      languages,
      currencies,
      borders: country.borders || [],
      latlng: country.latlng || [0, 0],
    };
  }
}

export default new CountryModel();
