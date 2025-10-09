# Countries Carousel 🌍

An interactive web application that displays information about countries and their neighbors in a visually appealing carousel layout. Built with vanilla JavaScript using MVC architecture.

## 🔴 Live Demo

Check out the live application: [Countries Carousel](https://countries-carousel-project.netlify.app/)

## ✨ Features

- **Search Countries**: Type any country name to display its information
- **Interactive Neighbors**: View neighboring countries arranged in a circular pattern
- **Dynamic Navigation**: Click on any neighbor to make it the main country
- **Smooth Animations**: Enjoy fluid transitions between country displays
- **Responsive Design**: Works seamlessly on different screen sizes
- **Draggable Interface**: Move the carousel around for better viewing

## 🛠️ Technologies

- Vanilla JavaScript (ES6+)
- HTML5
- CSS3
- REST Countries API
- Geocoding API
- Parcel Bundler

## 🏗️ Architecture

The project follows the MVC (Model-View-Controller) pattern:

```
src/
├── js/
│   ├── app.js         # Application entry point
│   ├── model.js       # Data handling and API calls
│   ├── view.js        # UI rendering and DOM manipulation
│   ├── controller.js  # Business logic and event handling
│   ├── config.js      # Configuration and constants
│   └── utils.js       # Helper functions
```

## 🚀 Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/j-kkwski/countries-carousel-project.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start development server:

   ```bash
   npm start
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## 🎯 Usage

1. Type a country name in the search box
2. Press "Show Country" or Enter to display the country
3. The main country will appear in the center
4. Neighboring countries will be displayed in a circle around it
5. Click any neighbor to make it the new main country
6. Drag the carousel to adjust the view

## 📱 Responsive Design

The application is fully responsive and works on:

- Desktop computers
- Tablets
- Mobile devices

## 🔄 API Integration

- Uses [REST Countries API](https://restcountries.com/) for country data
- Implements [BigDataCloud Reverse Geocoding](https://www.bigdatacloud.com/) for coordinates to country conversion

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/j-kkwski/countries-carousel-project/issues).

## 👤 Author

**Jakub Kraskowski**

## 📝 License

This project is [ISC](LICENSE) licensed.
