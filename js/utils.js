'use strict';

// DOM helper functions
export const $ = selector => document.querySelector(selector);
export const $$ = selector => document.querySelectorAll(selector);

// Async helper functions
export const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

export const fetchJSON = async (url, errorMsg = 'Something went wrong') => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  } catch (error) {
    throw new Error(`${errorMsg}: ${error.message}`);
  }
};

// Data transformation helpers
export const formatPopulation = population =>
  `${(population / 1_000_000).toFixed(1)}M people`;

export const getFirstItem = array =>
  Array.isArray(array) && array.length > 0 ? array[0] : '';

// Animation and layout helpers
export const calculateRadius = (viewportSize, totalItems, config) => {
  const baseRadius = viewportSize * config.LAYOUT.BASE_RADIUS;
  const spacing = Math.max(config.LAYOUT.MIN_SPACING, baseRadius * 0.1);
  return (
    baseRadius +
    spacing * Math.min(totalItems, config.LAYOUT.MAX_NEIGHBORS_VISIBLE)
  );
};

export const calculatePosition = (angle, radius, center) => {
  const rad = (angle * Math.PI) / 180;
  return {
    x: center.x + radius * Math.cos(rad),
    y: center.y + radius * Math.sin(rad),
  };
};

// Debounce utility for performance optimization
export const debounce = (fn, ms = 300) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(null, args), ms);
  };
};

// Error handling helpers
export const createErrorMessage = (error, customMessage = '') => {
  const message = customMessage || error.message;
  return `💥 ${message}. Please try again!`;
};

// URL helpers
export const createApiUrl = (baseUrl, path, params = {}) => {
  const url = new URL(`${baseUrl}${path}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value);
    }
  });
  return url.toString();
};
