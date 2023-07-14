import { useState, useEffect } from 'react'

import { Routes, Route, useMatch } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

import { get_todays_weather_for_coordinate } from '../API/OPENWEATHER_API'
import WeatherDaily from './WeatherDaily'
import WeatherForecast from './WeatherForecast'

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
        <div className='user-weather-container'>
            <div className='user-weather-title-container'>
                <h1>Weather @ user location</h1>
            </div>
            <div className='user-weather-nav-container'>
                <nav className='user-weather-nav-links'>
                    <NavLink className="nav-link" to=''>Daily</NavLink>
                    <NavLink className="nav-link" to='forecast'>Forecast</NavLink>
                </nav>
            </div>
            <Routes className='user-weather-routes-container'>
                <Route path='' element={<WeatherDaily weather_object={api_result} city={null} />}></Route>
                <Route path='forecast' element={<WeatherForecast weather_object={api_result} city={null} />}></Route> 
            </Routes>
        </div>
    </>;
};

export default UserWeatherView;