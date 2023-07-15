import { useState, useEffect } from 'react'

import { Routes, Route, useMatch } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

import { get_todays_weather_for_coordinate } from '../API/OPENWEATHER_API'
import WeatherDaily from './WeatherDaily'
import WeatherForecast from './WeatherForecast'
import { getBackgroundImage } from '../helpers/helpers'

const UserWeatherView = () => {
    // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.
    const match = useMatch('/user');
    const url = '';
    const path = '';

    const [location, setLocation] = useState(null)
    const [api_result, set_api_result] = useState(null);
    const [error, setError] = useState(null);

    const getLocation = () => {
        if (!navigator.geolocation) {
          setError('Location API is not supported by your browser')
        } else {
          navigator.geolocation.getCurrentPosition((position) => {
              const userLocation = {
                lat: position.coords.latitude,
                lon: position.coords.longitude,
              }
              setLocation(userLocation)
            },
            () => {
              setError('Sorry, we cannot find your location')
            }
          )
        }
      }
    
      const weather_api_result_callback = (response_data) => {
        if (response_data) {
            console.log('weather_api_result_callback: ', response_data);  
            set_api_result(response_data);

            const weather = response_data.current.weather[0];
            const icon_code = weather.icon.slice(0, -1);
            let backgroundimage = getBackgroundImage(icon_code)
            console.log('weather_api_result_callback. background: ', backgroundimage);
            let body = document.getElementsByTagName('body')[0];
            console.log('body: ', body);
            body.style.backgroundImage = `url("${backgroundimage}")`;
        }
      }
    
      useEffect(() => {
        if (location) {
          console.log('user location: ', location);
          get_todays_weather_for_coordinate(location, weather_api_result_callback);
        }
      }, [location]);

      useEffect(() => {
        if (error) {
            console.log('Could not get user location');
        }
      }, [error]);
    
      useEffect(() => {
        getLocation();
      }, []);

    return <>
        <div className='weather-container'>
            <div className='weather-daily-container'>
                <div className='weather-daily-details-container'>
                     <WeatherDaily weather_object={api_result} city={null} />
                </div>
                <nav className='weather-nav-links'>
                    <NavLink className={({ isActive }) => (isActive ? "nav-link-active" : "nav-link")} to=''>Today</NavLink>
                    <NavLink className={({ isActive }) => (isActive ? "nav-link-active" : "nav-link")} to='forecast'>Week</NavLink>
                </nav>
            </div>
            <Routes className='weather-routes-container'>
                <Route path='' element={<WeatherForecast forecast={api_result?.hourly} city={null} />}></Route>
                <Route path='forecast' element={<WeatherForecast forecast={api_result?.daily} city={null} />}></Route> 
            </Routes>
        </div>
    </>;
};

export default UserWeatherView;