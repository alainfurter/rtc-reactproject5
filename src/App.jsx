import { Routes, Route, NavLink } from 'react-router-dom'

import UserWeatherView from './components/UserWeatherView'
import CityWeatherView from './components/CityWeatherView'

import './App.css'

function App() {

  return (
    <>
      <div className='app-container'>
        <nav className='app-nav-container'>
            <NavLink className="nav-link" to="/">User</NavLink>
            <NavLink className="nav-link" to="/city">City</NavLink>
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
