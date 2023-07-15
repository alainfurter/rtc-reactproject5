import { faHourglass2 } from "@fortawesome/free-solid-svg-icons";
import WeatherDailyCard from "./WeatherDailyCard.jsx";
 
const WeatherForecast = ({forecast, city}) => {
    if (!forecast) return <></>;
    console.log('WeatherForecast: ', forecast);
    const array_with_five_items = forecast.slice(0, 8);
    return (
        <div className="forecast-container">
            <div className="daily-cards-container">
                {array_with_five_items.map((item, index) => (
                    <WeatherDailyCard key={index} item={item} index={index} />
                ))}
            </div>
        </div>
        );
};

export default WeatherForecast;