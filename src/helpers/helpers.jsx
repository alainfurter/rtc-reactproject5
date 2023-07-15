const getWeatherIcon = (iconCode) => {
  let weatherStyle;
  switch (iconCode) {
    case "01": // clear sky
      weatherStyle = <i className="fas fa-sun"></i>;
      break;
    case "02": // few clouds
      weatherStyle = <i className="fas fa-cloud-sun"></i>;
      break;
    case "03": // scattered clouds
      weatherStyle = <i className="fas fa-cloud"></i>;
      break;
    case "04": // broken clouds
      weatherStyle = <i className="fas fa-cloud"></i>;
      break;
    case "09": // shower rain
      weatherStyle = <i className="fas fa-cloud-rain"></i>;
      break;
    case "10": // rain
      weatherStyle = <i className="fas fa-droplet"></i>;
      break;
    case "11": // thunderstorm
      weatherStyle = <i className="fas fa-bolt"></i>;
      break;
    case "13": // snow
      weatherStyle = <i className="fa-solid fa-snowflake"></i>;
      break;
    case "50": // mist
      weatherStyle = <i className="fa-solid fa-water"></i>;
      break;
    default:
      weatherStyle = <i className="fas fa-sun"></i>;
  }
  return weatherStyle;
};

const getBackgroundImage = (iconCode) => {
  let weatherStyle;
  switch (iconCode) {
    case "01": // clear sky
      weatherStyle = "src/assets/images/sunset.webp";
      break;
    case "02": // few clouds
      weatherStyle = "src/assets/images/thunderstorm.jpg";
      break;
    case "03": // scattered clouds
      weatherStyle = "src/assets/images/clouds.jpg";
      break;
    case "04": // broken clouds
      weatherStyle = "src/assets/images/clouds-strong.jpg";
      break;
    case "09": // shower rain
      weatherStyle = "src/assets/images/shower-rain.jpg";
      break;
    case "10": // rain
      weatherStyle = "src/assets/images/rain-sky.webp";
      break;
    case "11": // thunderstorm
      weatherStyle = "src/assets/images/thunderstorm.jpg";
      break;
    case "13": // snow
      weatherStyle = "src/assets/images/snowing.jpg";
      break;
    case "50": // mist
      weatherStyle = "src/assets/images/fog-trees1.webp";
      break;
    default:
      weatherStyle = "src/assets/images/sunset.webp";
  }
  return weatherStyle;
};

const convertToCelsius = (kelvin) => {
  // Quick fix as the parameter 'metric' in the API request now gets celsius right away

  //const celsius = kelvin - 273.15;
  //return (celsius.toFixed(0));

  const celsius = kelvin;
  return (celsius);
}

export { getWeatherIcon, convertToCelsius, getBackgroundImage };
