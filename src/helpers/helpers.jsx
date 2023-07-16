const getWeatherIcon = (iconCode) => {
  let weatherStyle;
  switch (iconCode) {
    case "01": // clear sky
      weatherStyle = "/assets/icons/sun.png";
      break;
    case "02": // few clouds
      weatherStyle = "/assets/icons/suncloud.png";
      break;
    case "03": // scattered clouds
      weatherStyle = "/assets/icons/twoclouds.png";
      break;
    case "04": // broken clouds
      weatherStyle = "/assets/icons/clouds.png";
      break;
    case "09": // shower rain
      weatherStyle = "/assets/icons/sunrain.png";
      break;
    case "10": // rain
      weatherStyle = "/assets/icons/raindrops.png";
      break;
    case "11": // thunderstorm
      weatherStyle = "/assets/icons/bolt.png";
      break;
    case "13": // snow
      weatherStyle = "/assets/icons/snowflake.png";
      break;
    case "50": // mist
      weatherStyle = "/assets/icons/cloudmist.png";
      break;
    default:
      weatherStyle = "/assets/icons/sun.png";
  }
  return weatherStyle;
};

const getAnimatedWeatherIcon = (iconCode) => {
  let weatherStyle;
  switch (iconCode) {
    case "01": // clear sky
      weatherStyle = <div className="weathericon sunny">
                          <div className="sun">
                              <div className="rays"></div>
                          </div>
                      </div>;
      break;
    case "02": // few clouds
      weatherStyle = <div className="weathericon cloudy">
                          <div className="cloud"></div>
                          <div className="cloud"></div>
                      </div>;
      break;
    case "03": // scattered clouds
      weatherStyle = weatherStyle = <div className="weathericon cloudy">
                                        <div className="cloud"></div>
                                        <div className="cloud"></div>
                                    </div>;
      break;
    case "04": // broken clouds
      weatherStyle = weatherStyle = <div className="weathericon cloudy">
                                        <div className="cloud"></div>
                                        <div className="cloud"></div>
                                    </div>;
      break;
    case "09": // shower rain
      weatherStyle = <div className="weathericon sun-shower">
                          <div className="cloud"></div>
                          <div className="sun">
                              <div className="rays"></div>
                          </div>
                          <div className="rain"></div>
                      </div>;
      break;
    case "10": // rain
      weatherStyle = <div className="weathericon rainy">
                          <div className="cloud"></div>
                          <div className="rain"></div>
                      </div>
    ;
      break;
    case "11": // thunderstorm
      weatherStyle = <div className="weathericon thunder-storm">
                          <div className="cloud"></div>
                          <div className="lightning">
                              <div className="bolt"></div>
                              <div className="bolt"></div>
                          </div>
                      </div>;
      break;
    case "13": // snow
      weatherStyle = <div className="weathericon flurries">
                          <div className="cloud"></div>
                          <div className="snow">
                            <div className="flake"></div>
                            <div className="flake"></div>
                        </div>
    </div>;
      break;
    case "50": // mist
      weatherStyle = <div className="weathericon cloudy">
                          <div className="cloud"></div>
                          <div className="cloud"></div>
                      </div>;
      break;
    default:
      weatherStyle = <div className="weathericon sunny">
                          <div className="sun">
                              <div className="rays"></div>
                          </div>
                      </div>;
  }
  return weatherStyle;
};

const getBackgroundImage = (iconCode) => {
  let weatherStyle;
  switch (iconCode) {
    case "01": // clear sky
      weatherStyle = "/assets/images/sunset.webp";
      break;
    case "02": // few clouds
      weatherStyle = "/assets/images/clouds.jpg";
      break;
    case "03": // scattered clouds
      weatherStyle = "/assets/images/clouds.jpg";
      break;
    case "04": // broken clouds
      weatherStyle = "/assets/images/clouds-strong.jpg";
      break;
    case "09": // shower rain
      weatherStyle = "/assets/images/rain-sky.webp";
      break;
    case "10": // rain
      weatherStyle = "/assets/images/rain-sky.webp";
      break;
    case "11": // thunderstorm
      weatherStyle = "/assets/images/thunderstorm.jpg";
      break;
    case "13": // snow
      weatherStyle = "/assets/images/snowing.jpg";
      break;
    case "50": // mist
      weatherStyle = "/assets/images/fog-trees1.webp";
      break;
    default:
      weatherStyle = "/assets/images/sunset.webp";
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

export { getWeatherIcon, getAnimatedWeatherIcon, convertToCelsius, getBackgroundImage };
