import { useState, useEffect } from 'react'

import { Routes, Route, useMatch } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

import { get_todays_weather_for_coordinate } from '../API/OPENWEATHER_API'
import WeatherDaily from './WeatherDaily'
import WeatherForecast from './WeatherForecast'
import { getBackgroundImage } from '../helpers/helpers'

import { ProgressBar } from 'react-loader-spinner'

import Simplert from 'react-simplert'

const UserWeatherView = () => {
    const [location, setLocation] = useState(null)
    const [api_result, set_api_result] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const [alert, setAlert] = useState({
        showAlert: false,
        typeAlert: 'Error',
        titleAlert: 'No permission',
        messageAlert: 'Location API is denied or not supported by your browser. In order to use your location to get the current weather data, please go to "Settings". Under "Privacy and Security", select "Site settings". Under "Permissions", select "Location". Thank you...'
    })

    const getLocation = () => {
        // setAlert({...alert, showAlert: true });
        if (!navigator.geolocation) {
          setError('Location API is denied or not supported by your browser')
          setAlert({...alert, showAlert: true });
          setLoading(false);
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
              setAlert({...alert, showAlert: true });
              setLoading(false);
            }
          )
        }
      }
    
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
          //console.log('User location retrieved, fetching data for coordinates: ', location);
          setLoading(true);
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
            <Simplert 
                showSimplert={ alert.showAlert }
                type={ alert.typeAlert }
                title={ alert.titleAlert }
                message={ alert.messageAlert }
            />
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
                     <WeatherDaily weather_object={api_result} city={null} />
                </div>
                {api_result ? (
                    <nav className='weather-nav-links'>
                        <NavLink className={({ isActive }) => (isActive ? "nav-link-active" : "nav-link")} to=''>Today</NavLink>
                        <NavLink className={({ isActive }) => (isActive ? "nav-link-active" : "nav-link")} to='forecast'>Week</NavLink>
                    </nav>
                ) :(<></>)}
            </div>
            <Routes className='weather-routes-container'>
                <Route path='' element={<WeatherForecast forecast={api_result?.hourly} city={null} />}></Route>
                <Route path='forecast' element={<WeatherForecast forecast={api_result?.daily} city={null} />}></Route> 
            </Routes>
        </div>
    </>;
};

export default UserWeatherView;