import { useState, useEffect } from 'react'
import { Routes, Route, NavLink, useNavigate, useLocation } from 'react-router-dom'

import { weekdays, months, cities } from './constants/constants'
import { get_todays_weather_for_coordinate } from './API/OPENWEATHER_API'
import WeatherDaily from './components/WeatherDaily'
import WeatherForecast from './components/WeatherForecast'
import { getBackgroundImage } from './helpers/helpers'

import { ProgressBar } from 'react-loader-spinner'

import Simplert from 'react-simplert'

import './App.css'

function App() {
  /* API Handling */
  const [ api_result, set_api_result ] = useState(null);
  const [ error, setError ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  
  /* Overall app state */
  const [ nav_state, set_nav_state ] = useState('user_location');
  const [ forecast, setForecast ] = useState('Today');
  /* Both views, user and city */
  const [ location, setLocation ] = useState(null)
  /* Only for city view */
  const [ city, setCity ] = useState('Zurich');
  const searchIndex = cities.findIndex((current_city) => current_city.name === 'Zurich');
  const [ city_index, set_city_index ] = useState(searchIndex);

  const navigate = useNavigate();
  const browser_location = useLocation();

  /* Split of date details */
  var current_date = new Date();
  let day_index = current_date.getDay();
  let week_day_name = weekdays[day_index];
  let week_day_short = week_day_name.slice(0,3);
  let month_short = months[current_date.getMonth()];
  let day_of_month = current_date.getDate();

  /* Alert: no permission for geolocation */
  const [alert, setAlert] = useState({
    showAlert: false,
    typeAlert: 'Error',
    titleAlert: 'No permission',
    messageAlert: 'Location API is denied or not supported by your browser. In order to use your location to get the current weather data, please go to "Settings". Under "Privacy and Security", select "Site settings". Under "Permissions", select "Location". Thank you...'
  })

  useEffect(() => {
    if (error) {
        console.log('Could not get user location');
    }
  }, [error]);
  
  /* User geolocation handling */
  const getLocation = () => {
    console.log('Getting user location...');
    setLoading(true);
    // setAlert({...alert, showAlert: true });
    if (!navigator.geolocation) {
      setError('Location API is denied or not supported by your browser')
      setLoading(false);
      set_nav_state ('city_location');
      setError(false);
      setAlert({...alert, showAlert: true });
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
          setLoading(false);
          set_nav_state ('city_location');
          setError(false);
          setAlert({...alert, showAlert: true });
        }
      )
    }
  }

  /* Weather API Handling */
  const weather_api_result_callback = (response_data) => {
    if (response_data) {
        console.log('weather_api_result_callback: ', response_data);  
        set_api_result(response_data);
        setLoading(false);

        if (forecast === 'Today' && nav_state === 'user_location') {
          navigate('/');
        } else if (forecast === 'Week' && nav_state === 'user_location') {
          navigate('/forecast');
        } else if (forecast === 'Today' && nav_state === 'city_location') {
          navigate('/city');
        } else if (forecast === 'Week' && nav_state === 'city_location') {
          navigate('/city/forecast');
        }

        const weather = response_data.current.weather[0];
        const icon_code = weather.icon.slice(0, -1);
        let backgroundimage = getBackgroundImage(icon_code)
        //console.log('weather_api_result_callback. background: ', backgroundimage);
        let html = document.getElementsByTagName('html')[0];
        //console.log('body: ', body);
        html.style.background = `url("${backgroundimage}")`;
    } else {
        setLoading(false);
    }
  }

  const handleCityUpdateChange = () => {
    const searchIndex = cities.findIndex((current_city) => current_city.name === city);
        const city_object = cities[searchIndex];
        //console.log('city object: ', city_object);
        const userLocation = {
            lat: city_object.lat,
            lon: city_object.lon,
        }
        setLocation(userLocation)

        const buttons = document.querySelectorAll('.city-button');
        //console.log('buttons', buttons);
        buttons.forEach((button) => {
            if (button.value === city) {
              button.classList.add('active');
            } else {
              button.classList.remove('active');
            }
        });
  };

  /* States handling */

  useEffect(() => {
      console.log('useLocation: ', browser_location);
  }, [browser_location]);


  useEffect(() => {
    const location_button = document.querySelector('#location-button');
    const city_button = document.querySelector('#city-button');

    if (nav_state === 'user_location') {
        // let body = document.getElementsByTagName('body')[0];
        // body.style.background = `url("/assets/textures/light-blue.webp")`;
        getLocation();
    } else {
      if (city) {
        handleCityUpdateChange();
      }
    }

    if (forecast === 'Today' && nav_state === 'user_location') {
        location_button.classList.add("selected");
        city_button.classList.remove("selected");
        navigate('/');
    } else if (forecast === 'Week' && nav_state === 'user_location') {
        location_button.classList.add("selected");
        city_button.classList.remove("selected");
        navigate('/forecast');
    } else if (forecast === 'Today' && nav_state === 'city_location') {
        location_button.classList.remove("selected");
        city_button.classList.add("selected");
        navigate('/city');
    } else if (forecast === 'Week' && nav_state === 'city_location') {
        location_button.classList.remove("selected");
        city_button.classList.add("selected");
        navigate('/city/forecast');
    }
  },[nav_state]);

  useEffect(() => {
    if (location) {
      console.log('Fetching data for coordinates: ', location);
      setLoading(true);
      get_todays_weather_for_coordinate(location, weather_api_result_callback);
    }
  }, [location]);

  useEffect(() => {
    if (city) {
        handleCityUpdateChange();
    }
  }, [city]);

  useEffect(() => {
    getLocation();
  }, []);

  /* User events handling */
  const handleNavigate = (event) => {
    //console.log('handleNavigate', event.target.name);
    setAlert({...alert, showAlert: false });
    if (event.target.name === 'location-button') {
      set_nav_state('user_location');
    } else {
      setError(false);
      set_nav_state('city_location');
    }
  };

  const handleNavLinkSelect = (event) => {
    console.log('Forecast houry, daily nav link selected: ', event.target.innerHTML);
    setAlert({...alert, showAlert: false });
    setForecast(event.target.innerHTML);
  }

  const handleSelectCity = (event) => {
    setAlert({...alert, showAlert: false });
    console.log('City selected: ', event.target.value);
    setCity(event.target.value);
    const searchIndex = cities.findIndex((current_city) => current_city.name === event.target.value);
    set_city_index(searchIndex);

    const buttons = document.querySelectorAll('.city-button');
    //console.log('buttons', buttons);
    buttons.forEach((button) => {
         if (button.value === event.target.value) {
            button.classList.add('active');
         } else {
            button.classList.remove('active');
         }
    })
  }

  return (
    <>
      <div className='app-container'>
        <nav className='app-nav-container'>
            <div className='date-view'>
              <h3>{week_day_short}</h3>
              <h3>{day_of_month} {month_short}</h3>
            </div>
            <div className='app-title-container'>
              <h1>Today Weather</h1>
            </div>
            <div className='app-nav-links-container'>
              <button 
                  className="nav-button selected" 
                  id="location-button" 
                  name="location-button" 
                  onClick={handleNavigate}
              >
                <img src='/assets/icons/arrow.png' 
                    alt='User location' 
                    draggable="false" 
                    name="location-button"
                ></img>
              </button>
              <button 
                    className="nav-button" 
                    id="city-button" 
                    name="city-button" 
                    onClick={handleNavigate}
              >
                <img src='/assets/icons/city.png' 
                    alt='Cities' 
                    draggable="false" 
                    name="city-button"
                ></img>
              </button>
            </div>
        </nav>
        {alert.showAlert ? (
            <Simplert 
                showSimplert={ alert.showAlert }
                type={ alert.typeAlert }
                title={ alert.titleAlert }
                message={ alert.messageAlert }
            />
            ) : (<></>)};
        <div className='weather-daily-container'>
            {loading ? (
                <ProgressBar
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
                  {!loading ?
                      <WeatherDaily weather_object={api_result} city={null} /> 
                  : <></>}
            </div>
            {(nav_state !== 'user_location') ? (
              <div className='side-bar'>
                  <div className='city-button-container'>
                      {cities.map((city_object, index) => (
                          <button 
                              className={ (index === city_index) ? "city-button active" : "city-button" }  
                              key={index} 
                              index={index}
                              id='city-button' 
                              onClick={handleSelectCity} 
                              value={city_object.name}
                          >
                              {city_object.name}
                          </button>
                      ))}
                  </div>
              </div>
                ) : (<></>) 
            }
        </div>
        <div className='forecast-nav-links-container'>
            {!loading ? (
                       <nav className='weather-nav-links'>
                          <NavLink 
                              className={ (forecast === 'Today') ? "nav-link-active" : "nav-link" } 
                              to="" 
                              onClick={handleNavLinkSelect} 
                          >
                              Today
                          </NavLink>
                          <NavLink 
                              className={ (forecast === 'Week') ? "nav-link-active" : "nav-link" } 
                              to="forecast" 
                              onClick={handleNavLinkSelect} 
                          >
                               Week
                          </NavLink>
                      </nav>
            ) :(<></>)}
        </div>
        <main className='app-routes-container'>
            <Routes>
                <Route 
                    path='/*' 
                    element={<WeatherForecast 
                    forecast={api_result?.hourly} 
                    city={null} />}>
                </Route>
                <Route 
                    path='/forecast/*' 
                    element={<WeatherForecast 
                    forecast={api_result?.daily} 
                    city={null} />}>
                </Route> 
                <Route 
                    path='/city/*' 
                    element={<WeatherForecast 
                    forecast={api_result?.hourly} 
                    city={city} />}>
                </Route>
                <Route 
                    path='/city/forecast/*' 
                    element={<WeatherForecast 
                    forecast={api_result?.daily} 
                    city={city} />}>
                </Route>                 
            </Routes>
        </main>
      </div>
    </>
  )
}

export default App
