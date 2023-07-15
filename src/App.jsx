import { Routes, Route, NavLink } from 'react-router-dom'

import UserWeatherView from './components/UserWeatherView'
import CityWeatherView from './components/CityWeatherView'

import { weekdays, months } from './constants/constants'

import './App.css'

function App() {

  var current_date = new Date();
  let day_index = current_date.getDay();
  let week_day_name = weekdays[day_index];
  let week_day_short = week_day_name.slice(0,3);
  console.log('WeatherDailyCard, weekday: ', week_day_short);
  let month_short = months[current_date.getMonth()];
  let day_of_month = current_date.getDate();

  return (
    <>
      <div className='app-container'>
        <nav className='app-nav-container'>
            <div className='date-view'>
              <h3>{week_day_short}</h3>
              <h3>{day_of_month} {month_short}</h3>
            </div>
            <div className='app-nav-links-container'>
              <NavLink className="nav-link" to="/">
                <img src='src/assets/icons/arrow.png' alt='User location'></img>
              </NavLink>
              <NavLink className="nav-link" to="/city">
                <img src='src/assets/icons/city.png' alt='Cities'></img>
              </NavLink>
            </div>
        </nav>
        <main className='app-routes-container'>
            <Routes>
                <Route path="/*" element={<UserWeatherView />}></Route>
                <Route path="/city/*" element={<CityWeatherView />}></Route>               
            </Routes>
        </main>
      </div>
    </>
  )
}

export default App
