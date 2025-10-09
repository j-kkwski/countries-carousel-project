'use strict';

export const config = {
  // API endpoints
  API: {
    GEOCODING: 'https://api.bigdatacloud.net/data/reverse-geocode-client',
    COUNTRIES: 'https://restcountries.com/v2',
  },

  // Animation durations (in ms)
  ANIMATION: {
    FADE_DURATION: 1000,
    TRANSITION_DURATION: 500,
  },

  // Layout configuration
  LAYOUT: {
    BASE_RADIUS: 0.25, // 25% of viewport
    MIN_SPACING: 30, // minimum pixels between neighbors
    NEIGHBOR_SCALE: 0.7,
    MAX_NEIGHBORS_VISIBLE: 8,
  },

  // Error messages
  ERRORS: {
    GEOCODING: 'Geocoding API error',
    COUNTRY_API: 'Country API error',
    NEIGHBOR_API: 'Neighbor country not found',
    COUNTRY_MISSING: 'Country data missing',
    GENERIC: 'Something went wrong',
  },

  // Default coordinates (Warsaw, Poland)
  DEFAULT_LOCATION: {
    LAT: 52.237049,
    LNG: 21.017532,
  },
};
