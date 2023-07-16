import { useState, useEffect } from 'react'
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom'

import UserWeatherView from './components/UserWeatherView'
import CityWeatherView from './components/CityWeatherView'

import { weekdays, months } from './constants/constants'

import './App.css'

function App() {

  const [ nav_state, set_nav_state ] = useState('user_location');
  const [ global_city, set_global_city ] = useState('Zurich');
  const navigate = useNavigate();

  var current_date = new Date();
  let day_index = current_date.getDay();
  let week_day_name = weekdays[day_index];
  let week_day_short = week_day_name.slice(0,3);
  let month_short = months[current_date.getMonth()];
  let day_of_month = current_date.getDate();

  useEffect(() => {
    const location_button = document.querySelector('#location-button');
    const city_button = document.querySelector('#city-button');
    if (nav_state === 'user_location') {
      location_button.classList.add("selected");
      city_button.classList.remove("selected");
      navigate("/");
    } else {
      location_button.classList.remove("selected");
      city_button.classList.add("selected");
      navigate("/city");
    }
  },[nav_state]);

  // useEffect(()=>{
  //   console.log('global city: ', global_city);
  // }, [global_city]);

  const handleNavigate = (event) => {
    //console.log(event.target.name);
    if (event.target.name === 'location-button') {
      set_nav_state('user_location');
    } else {
      set_nav_state('city_location');
    }
  };

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
              <button className="nav-button selected" id="location-button" name="location-button" onClick={handleNavigate}>
                <img src='src/assets/icons/arrow.png' alt='User location' draggable="false" name="location-button"></img>
              </button>
              <button className="nav-button" id="city-button" name="city-button" onClick={handleNavigate}>
                <img src='src/assets/icons/city.png' alt='Cities' draggable="false" name="city-button"></img>
              </button>
            </div>
        </nav>
        <main className='app-routes-container'>
            <Routes>
                <Route path="/*" element={<UserWeatherView />}></Route>
                <Route path="/city/*" element={<CityWeatherView global_city={global_city} set_global_city={set_global_city} />}></Route>               
            </Routes>
        </main>
      </div>
    </>
  )
}

export default App
