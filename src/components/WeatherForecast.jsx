import WeatherForecastCard from "./WeatherForecastCard.jsx";
 
const WeatherForecast = ({data}) => {
    if (!data) return <></>;
    //console.log('WeatherForecast: ', data);
    const array_with_five_items = data.slice(0, 8);
    return (
        <div className="forecast-container">
            <div className="daily-cards-container">
                {array_with_five_items.map((item, index) => (
                    <WeatherForecastCard key={index} item={item} />
                ))}
            </div>
        </div>
        );
};

export default WeatherForecast;