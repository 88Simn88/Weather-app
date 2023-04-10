import React, { useState } from 'react'

const WeatherCard = ({ weatherInfo, temperatureP }) => {

  const [isCelsius, setIsCelsius] = useState(true)

  const handleChangeTemperature = () => setIsCelsius(!isCelsius)



  return (
    <div className='appInfo'>

      <article >

        <h2 className='subtitle'>{weatherInfo?.name}, {weatherInfo?.sys.country}</h2>
        <section className='iconInfo'>
          <header>
            <img className='icon' src={`https://openweathermap.org/img/wn/${weatherInfo?.weather[0].icon}@4x.png`} alt="" />
          </header>
          <article>
            <h3>"{weatherInfo?.weather[0].description}"</h3>
            <ul>
              <li><span className='wind'>Wind Speed </span>{weatherInfo?.wind.speed}m/s</li>
              <li><span className='clouds'>Clouds </span>{weatherInfo?.clouds.all}%</li>
              <li><span className='pressure'>Pressure </span>{weatherInfo?.main.pressure}hPa</li>
            </ul>
          </article>
        </section>
        
        <footer>
          <h2 className='temperature'>
            {
              isCelsius
                ? `${temperatureP?.celsius} ºC`
                : `${temperatureP?.farenheit} ºF`
            }
          </h2>
          <button className='btn2' onClick={handleChangeTemperature}>Change to {isCelsius
            ? 'ºF' : 'ºC'}</button>
        </footer>
      </article>
    </div>
  )
}

export default WeatherCard