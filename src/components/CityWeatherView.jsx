import { useState, useEffect } from 'react'

import { Routes, Route } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

import { get_todays_weather_for_coordinate } from '../API/OPENWEATHER_API'
import { cities } from '../constants/constants'
import { getBackgroundImage } from '../helpers/helpers'
import WeatherDaily from './WeatherDaily'
import WeatherForecast from './WeatherForecast'

import { ProgressBar } from 'react-loader-spinner'

const CityWeatherView = ({global_city, set_global_city}) => {
    const [location, setLocation] = useState(null)
    const [api_result, set_api_result] = useState(null);
    const [city, setCity] = useState(global_city);
    const [loading, setLoading] = useState(true);

    const searchIndex = cities.findIndex((current_city) => current_city.name === global_city);
    const [city_index, set_city_index] = useState(searchIndex);

    const weather_api_result_callback = (response_data) => {
        if (response_data) {
            //console.log('weather_api_result_callback: ', response_data);  
            set_api_result(response_data);
            setLoading(false);

            const weather = response_data.current.weather[0];
            const icon_code = weather.icon.slice(0, -1);
            let backgroundimage = getBackgroundImage(icon_code)
            //console.log('weather_api_result_callback. background: ', backgroundimage);
            let body = document.getElementsByTagName('body')[0];
            //console.log('body: ', body);
            body.style.background = `url("${backgroundimage}")`;
        }
    }
    
    useEffect(() => {
        if (location) {
            //console.log('user location: ', location);
            setLoading(true);
            get_todays_weather_for_coordinate(location, weather_api_result_callback);
        }
    }, [location]);

    useEffect(() => {
        if (city) {
            const searchIndex = cities.findIndex((current_city) => current_city.name === city);
            const city_object = cities[searchIndex];
            //console.log('city object: ', city_object);
            const userLocation = {
                lat: city_object.lat,
                lon: city_object.lon,
            }
            setLocation(userLocation)
        }
    }, [city]);

    const handleSelectCity = (event) => {
        //console.log('City selected: ', event.target.value);
        setCity(event.target.value);
        set_global_city(event.target.value);
        const searchIndex = cities.findIndex((current_city) => current_city.name === event.target.value);
        set_city_index(searchIndex);
        if (event.target.matches('button')) {
            event.target.focus()
        }
    }

    return <>
        <div className='weather-container'>
            <div className='weather-daily-container'>
                {loading ? (<ProgressBar
                    className = "spinner"
                    height="200"
                    width="200"
                    ariaLabel="progress-bar-loading"
                    wrapperStyle={{}}
                    wrapperClass="progress-bar-wrapper"
                    borderColor = 'white'
                    barColor = 'white'
                    />
                  ):(
                  <></>
                )}
                <div className='weather-daily-details-container'>
                     <WeatherDaily weather_object={api_result} city={city} />
                </div>
                <div className='side-bar'>
                    <div className='city-button-container'>
                        {cities.map((city_object, index) => (
                            <button className='city-button' autoFocus={index === city_index}  key={index} index={index} onClick={handleSelectCity} value={city_object.name}>{city_object.name}</button>
                        ))}
                    </div>
                    {!loading ? (
                        <nav className='weather-nav-links'>
                            <NavLink className={({ isActive }) => (isActive ? "nav-link-active" : "nav-link")} to="" >Today</NavLink>
                            <NavLink className={({ isActive }) => (isActive ? "nav-link-active" : "nav-link")} to="forecast">Week</NavLink>
                        </nav>
                    ) :(<></>)}
                </div>
            </div>
            <Routes className='weather-routes-container'>
                <Route path='' element={<WeatherForecast forecast={api_result?.hourly} city={city} />}></Route>
                <Route path='forecast' element={<WeatherForecast forecast={api_result?.daily} city={city} />}></Route>             
            </Routes>
        </div>
    </>;
};

export default CityWeatherView;