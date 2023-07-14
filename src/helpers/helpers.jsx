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

const convertToCelsius = (kelvin) => {
  const celsius = kelvin - 273.15;
  return (celsius.toFixed(1));
}

export { getWeatherIcon, convertToCelsius };
