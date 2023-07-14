import { getWeatherIcon, convertToCelsius } from "../helpers/helpers";
import { weekdays } from "../constants/constants"; 

const WeatherDailyCard = ({ day, index }) => {
  if (!day || !index) return <></>;

  var forecast_date = new Date(day.dt * 1000);
  let day_index = forecast_date.getDay();
  let week_day_name = weekdays[day_index];
  console.log('WeatherDailyCard, weekday: ', week_day_name);

  const unitShorthard = "°C";
  const weather = day.weather[0];
  const icon_code = weather.icon.slice(0, -1);
  console.log('icon code: ', icon_code);

  return (
    <div className="weather-card-container">
      <h3>{index === 0 ? "Today" : week_day_name}</h3>
      <div className="icon-container">{getWeatherIcon(icon_code)}</div>
      <div>
        <p>{weather.main}</p>
      </div>
      <div>
        <p>
          {convertToCelsius(day.temp.max)} °C max
        </p>
        <p>
          {convertToCelsius(day.temp.min)} °C min
        </p>
      </div>
      <div className="weather-summary">
        <p>{day.summary}</p>
      </div>
    </div>
  );
};

export default WeatherDailyCard;
