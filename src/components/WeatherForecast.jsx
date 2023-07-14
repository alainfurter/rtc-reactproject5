import { faHourglass2 } from "@fortawesome/free-solid-svg-icons";
import WeatherDailyCard from "./WeatherDailyCard.jsx";
 
const WeatherForecast = ({weather_object, city}) => {
    if (!weather_object) return <></>;
    console.log('WeatherForecast: ', weather_object);
    const days_array = weather_object.daily;
    return (
        <div className="forecast-container">
            <h1>Weather forecast</h1>
            {city ? (
                <h2>
                    {city}
                </h2>
                ):(
                <h3>
                    Location: lng {weather_object?.lon.toFixed(2)} and lat{' '}
                    {weather_object?.lat.toFixed(2)}
                </h3>)
            }
            <div className="daily-cards-container">
                {days_array.map((day, index) => (
                    <WeatherDailyCard key={index} day={day} index={index} />
                ))}
            </div>

            
        </div>
        );
};

export default WeatherForecast;