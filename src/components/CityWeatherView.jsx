import { useState, useEffect } from 'react'

import { Routes, Route } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

import { get_todays_weather_for_coordinate } from '../API/OPENWEATHER_API'
import { cities } from '../constants/constants'
import WeatherDaily from './WeatherDaily'
import WeatherForecast from './WeatherForecast'


const CityWeatherView = () => {
    const [location, setLocation] = useState(null)
    const [city, setCity] = useState('Zurich');
    const [api_result, set_api_result] = useState(null);

    
    const weather_api_result_callback = (response_data) => {
        if (response_data) {
            console.log('weather_api_result_callback: ', response_data);  
            set_api_result(response_data);
        }
    }
    
    useEffect(() => {
        if (location) {
            console.log('user location: ', location);
            get_todays_weather_for_coordinate(location, weather_api_result_callback);
        }
    }, [location]);

    useEffect(() => {
        if (city) {
            const searchIndex = cities.findIndex((current_city) => current_city.name === city);
            const city_object = cities[searchIndex];
            console.log('city object: ', city_object);
            const userLocation = {
                lat: city_object.lat,
                lon: city_object.lon,
            }
            setLocation(userLocation)
        }
    }, [city]);

    const handleSelectCity = (event) => {
        console.log('City selected: ', event.target.value);
        setCity(event.target.value);
        if (event.target.matches('button')) {
            event.target.focus()
        }
    }

    return <>
        <div>
            <div>
                <h1>Weather @ city location</h1>
            </div>
            <div>
                {cities.map((city_object, index) => (
                    <button className='city-button' autoFocus={index === 0}  key={index} index={index} onClick={handleSelectCity} value={city_object.name}>{city_object.name}</button>
                ))}
            </div>
            <div>
                <nav>
                    <NavLink className="nav-link" to="">Daily</NavLink>
                    <NavLink className="nav-link" to="forecast">Forecast</NavLink>
                </nav>
            </div>
            <Routes>
                <Route path="" element={<WeatherDaily weather_object={api_result} city={city} />}></Route>
                <Route path="forecast" element={<WeatherForecast weather_object={api_result} city={city} />}></Route>                
            </Routes>
        </div>
    </>;
};

export default CityWeatherView;