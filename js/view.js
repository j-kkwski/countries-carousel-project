'use strict';

class CountryView {
  constructor() {
    this.elements = {
      countriesContainer: document.querySelector('.countries'),
      wrapper: document.querySelector('.countries-wrapper'),
      searchForm: document.querySelector('#search-form'),
      searchInput: document.querySelector('#search-input'),
    };

    // Initialize drag support
    this.initializeDragSupport();
  }

  renderCountry(data, className = '', index = 0, totalNeighbors = 0) {
    const html = `
      <article class="country ${className}" 
               data-index="${index}"
               data-total="${totalNeighbors}">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
          <h3 class="country__name">${data.name}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            data.population / 1_000_000
          ).toFixed(1)}M people</p>
          <p class="country__row"><span>🗣️</span>${
            data.languages?.[0] || ''
          }</p>
          <p class="country__row"><span>💰</span>${
            data.currencies?.[0] || ''
          }</p>
        </div>
      </article>
    `;

    this.elements.countriesContainer.insertAdjacentHTML('beforeend', html);
    this.elements.countriesContainer.style.opacity = 1;

    if (className === 'neighbour') {
      this.positionNeighbor(index, totalNeighbors);
    }
  }

  renderError(msg) {
    this.elements.countriesContainer.insertAdjacentText('beforeend', msg);
    this.elements.countriesContainer.style.opacity = 1;
  }

  clearCountries() {
    this.elements.countriesContainer.innerHTML = '';
    this.elements.countriesContainer.style.opacity = 0;
  }

  startTransition() {
    this.elements.countriesContainer.classList.add('transitioning');
    this.elements.countriesContainer.style.opacity = 0;
  }

  endTransition() {
    this.elements.countriesContainer.classList.remove('transitioning');
  }

  positionNeighbor(index, totalNeighbors) {
    const el = this.elements.countriesContainer.lastElementChild;
    const mainCountry = this.elements.countriesContainer.querySelector(
      '.country:not(.neighbour)'
    );
    if (!mainCountry) return;

    const mainRect = mainCountry.getBoundingClientRect();
    const centerX = mainRect.left + mainRect.width / 2;
    const centerY = mainRect.top + mainRect.height / 2;
    const { innerWidth: vw, innerHeight: vh } = window;

    const rect = el.getBoundingClientRect();
    const radiusX = Math.min(centerX, vw - centerX) - rect.width / 2 - 20;
    const radiusY = Math.min(centerY, vh - centerY) - rect.height / 2 - 20;
    const radius = Math.min(radiusX, radiusY) * 0.75;

    const angle = totalNeighbors > 0 ? (360 / totalNeighbors) * index : 0;
    const rad = (angle * Math.PI) / 180;

    const x = centerX + radius * Math.cos(rad) - rect.width / 2;
    const y = centerY + radius * Math.sin(rad) - rect.height / 2;

    Object.assign(el.style, {
      position: 'absolute',
      left: `${x}px`,
      top: `${y}px`,
      transform: 'scale(0.7)',
    });
  }

  initializeDragSupport() {
    let isDragging = false;
    let startX = 0,
      startY = 0,
      currentX = 0,
      currentY = 0;

    const onMouseMove = e => {
      if (!isDragging) return;
      currentX = e.clientX - startX;
      currentY = e.clientY - startY;
      this.elements.wrapper.style.transform = `translate(${currentX}px, ${currentY}px)`;
    };

    const onMouseUp = () => {
      isDragging = false;
      this.elements.wrapper.classList.remove('dragging');
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    this.elements.wrapper.addEventListener('mousedown', e => {
      e.preventDefault();
      isDragging = true;
      this.elements.wrapper.classList.add('dragging');
      startX = e.clientX - currentX;
      startY = e.clientY - currentY;

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    });
  }

  bindSearchSubmit(handler) {
    this.elements.searchForm?.addEventListener('submit', e => {
      e.preventDefault();
      const countryName = this.elements.searchInput?.value.trim();
      if (countryName) {
        handler(countryName);
        this.elements.searchInput.value = '';
        this.elements.searchInput.blur();
      }
    });
  }

  bindNeighborClick(handler) {
    this.elements.countriesContainer.addEventListener('click', e => {
      const neighborEl = e.target.closest('.country.neighbour');
      if (
        !neighborEl ||
        this.elements.countriesContainer.classList.contains('transitioning')
      )
        return;

      const countryName =
        neighborEl.querySelector('.country__name').textContent;
      handler(countryName);
    });
  }
}

export default new CountryView();
