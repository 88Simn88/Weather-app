
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import WeatherCard from './components/WeatherCard'
import Loading from './components/Loading'

function App() {

  const [latlon, setLatlon] = useState()
  const [weather, setWeather] = useState()
  const [temperature, setTemperature] = useState()
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {

    const success = pos => {
      const obj = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }
      setLatlon(obj)
    }

    const error = () => { }
    navigator.geolocation.getCurrentPosition(success)

  }, [inputValue])

  useEffect(() => {
    if (!inputValue) {
      if (latlon) {
        const apikey = "6a93d0fc2ea0fe1e17d645b456124521"
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latlon.lat}&lon=${latlon.lon}&appid=${apikey}`

        axios.get(url)
          .then(res => {
            setWeather(res.data)
            const celsius = (res.data.main.temp - 273.15).toFixed(1)
            const farenheit = (celsius * 9 / 5 + 32).toFixed(1)
            setTemperature({ celsius, farenheit })
          })
          .catch(err => console.log(err))
      }

    } else {

      if (latlon) {
        const apikey = "6a93d0fc2ea0fe1e17d645b456124521"
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latlon.lat}&lon=${latlon.lon}&appid=${apikey}&q=${inputValue}`;
        axios
          .get(url)
          .then((res) => {
            const celsius = (res.data.main.temp - 273.15).toFixed(1);
            const farenheit = ((celsius * 9) / 5 + 32).toFixed(1);
            setTemperature({ celsius, farenheit });
            setWeather(res.data);
          })
          .catch((err) => {
            console.log(err)
            setError(true);
            setTimeout(() => {
              setError(false);
            }, 3000);
          });

      }
    }
  }, [latlon])

    const handleSubmit = e => {
    e.preventDefault()
    setInputValue(e.target.input.value.toLowerCase().trim())
    e.target.input.value = ''
  }


  return (
    <div className="App">
      {
        weather ?
          <div className='background'>
            <div className='container'>
              <h1 className='title'>Weather App</h1>
              <form className='form' onSubmit={handleSubmit} action="">
                <input id='input' className='input' type="text" />
                <button className='btn1'>Search</button>
              </form>
              <WeatherCard
                weatherInfo={weather}
                temperatureP={temperature}

              />
            </div>
          </div>
          :
          <Loading />
      }
      
    </div>
  )
}

export default App
