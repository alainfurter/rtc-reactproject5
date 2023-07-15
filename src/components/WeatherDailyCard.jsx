import { getWeatherIcon, convertToCelsius } from "../helpers/helpers";
import { weekdays } from "../constants/constants"; 
import { object } from "prop-types";

const WeatherDailyCard = ({ item, index }) => {
  if (!item || !index) return <></>;

  const unitShorthard = "°C";
  const weather = item.weather[0];
  const icon_code = weather.icon.slice(0, -1);
  console.log('icon code: ', icon_code);

  let temp_string = '';
  let item_name = '';
  var forecast_date = new Date(item.dt * 1000);

  if (typeof item.temp === 'object') {
    let min_temp = convertToCelsius(item.temp.min).toFixed(0);
    let max_temp = convertToCelsius(item.temp.max).toFixed(0);
    temp_string = `${max_temp} °C max ${min_temp} °C min`;

    let day_index = forecast_date.getDay();
    item_name = weekdays[day_index];
    console.log('WeatherDailyCard, weekday: ', item_name);
  } else {
    let temp = convertToCelsius(item.temp).toFixed(0);
    temp_string = `${temp} °C`;
    let hour = forecast_date.getHours();
    item_name = `${hour}:00`;
  }

  return (
    <div className="weather-card-container">
      <h3>{index === 0 ? "Today" : item_name}</h3>
      <div className="icon-container">{getWeatherIcon(icon_code)}</div>
      <div>
        <p>{weather.main}</p>
      </div>
      <div>
        <p>
          {temp_string}
        </p>
      </div>
      <div className="weather-summary">
        <p>{item.summary}</p>
      </div>
    </div>
  );
};

export default WeatherDailyCard;
