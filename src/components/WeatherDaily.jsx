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
            <h2>{weather.main}</h2>
            <div className='main-daily-weather'>
              <h1>{convertToCelsius(weather_object.current.temp).toFixed(0)} °C</h1>
              <div className="daily-weather-icon">
                {weather_icon && getWeatherIcon(weather_icon)}
              </div>
            </div>
            <br /><br />
            <h3>Max {convertToCelsius(day.temp.max).toFixed(0)} °C , Min {convertToCelsius(day.temp.min).toFixed(0)} °C</h3>
            <div className='user-weather-title-container'>
                {weather_object? (<h3 className='location_name'>Location {weather_object?.lat.toFixed(2)} Lat. , {' '}
                  {weather_object?.lon.toFixed(2)} Lon.</h3>) : (<></>)}
            </div>
            <h3>{weather.description}</h3>
        </div>
        <div className='daily-additional-info-container'>
          <div className='additional-info-container'>
            <div className='additional-info-text'>
              <h3>Humidity</h3>
            </div>
            <div className='additional-info-text'>
              <h3>{weather_object.current.humidity}%</h3>
            </div>
            <div className='additional-info-image'>
              <img src="src/assets/icons/humidity.png" alt="Humidity"></img>
            </div>
          </div>
          <div className='additional-info-container'>
            <div className='additional-info-text'>
              <h3>Pressure</h3>
            </div>
            <div className='additional-info-text'>
              <h3>{weather_object.current.pressure} hPa</h3>
            </div>
            <div className='additional-info-image'>
              <img src="src/assets/icons/pressure.png" alt="Pressure"></img>
            </div>
          </div>
          <div className='additional-info-container'>
            <div className='additional-info-text'>
              <h3>Wind speed</h3>
            </div>
            <div className='additional-info-text'>
              <h3>{weather_object.current.wind_speed} m/s</h3>
            </div>
            <div className='additional-info-image'>
              <img src="src/assets/icons/wind.png" alt="Wind speed"></img>
            </div>
          </div>
          <div className='additional-info-container'>
            <div className='additional-info-text'>
              <h3>Visibility</h3>
            </div>
            <div className='additional-info-text'>
              <h3>{weather_object.current.visibility} m</h3>
            </div>
            <div className='additional-info-image'>
              <img src="src/assets/icons/visibility.png" alt="Visibility"></img>
            </div>
          </div>
        </div>
      </div>
    )
  }
  export default WeatherDaily;