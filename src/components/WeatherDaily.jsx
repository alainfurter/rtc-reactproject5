import '@fortawesome/fontawesome-free/js/all.js'
import { convertToCelsius, getWeatherIcon } from '../helpers/helpers'
import { weekdays } from '../constants/constants';

const WeatherDaily = ({ weather_object, city}) => {
    console.log('TodayDisplay: ', weather_object);
    if (!weather_object) return <></>;

    const weather = weather_object.current.weather[0];
    const weather_icon = weather.icon;

    var current_date = new Date(weather_object.current.dt * 1000);
    let day_index = current_date.getDay();
    let week_day_name = weekdays[day_index];
    console.log('WeatherDailyCard, weekday: ', week_day_name);

    let day = weather_object.daily[0];

    return (
      <div className="daily-container">
        <div className="daily-info-container">
          <h1>Today's weather</h1>
          {city ? (
              <h2>
                  {city}
              </h2>
              ):(
              <h3>
                  Location: lng {weather_object?.lon.toFixed(2)} and lat{' '}
                  {weather_object?.lat.toFixed(2)}
              </h3>)}
          <h3>{week_day_name}</h3>
        </div>
        <div className="daily-info-container">
          {weather_icon && getWeatherIcon(weather_icon)}
        </div>
        <p>{weather.main}</p>
        <p>{weather.description}</p>
        <p>{convertToCelsius(day.temp.max)} °C max</p>
        <p>{convertToCelsius(day.temp.min)} °C min</p>
      </div>
    )
  }
  export default WeatherDaily;