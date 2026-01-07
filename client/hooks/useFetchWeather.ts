// hooks/useFetchWeather.ts

import { useEffect, useState } from 'react'
import { fetchWeatherApi } from 'openmeteo'
import { WeatherData } from '../../models/weather'

const params = {
  latitude: -42,
  longitude: 174,
  hourly: ['temperature_2m', 'precipitation', 'precipitation_probability'],
  current: ['temperature_2m', 'wind_speed_10m', 'is_day', 'precipitation'],
  timezone: 'Pacific/Auckland',
  forecast_days: 1,
}

const url = 'https://api.open-meteo.com/v1/forecast'

export function useFetchWeather(): WeatherData | null {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // fetchWeatherApi returns an array of responses
        const responses = await fetchWeatherApi(url, params)
        const response = responses[0]

        const utcOffsetSeconds = Number(response.utcOffsetSeconds())
        const current = response.current()!
        const hourly = response.hourly()!

        // --- Process current weather ---
        const processedCurrent = {
          time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
          temperature_2m: current.variables(0)!.value(),
          wind_speed_10m: current.variables(1)!.value(),
          is_day: current.variables(2)!.value(),
          precipitation: current.variables(3)!.value(),
        }

        // --- Process hourly weather ---
        const processedHourly = {
          time: Array.from(hourly.time()).map(
            (t) => new Date((Number(t) + utcOffsetSeconds) * 1000),
          ),
          temperature_2m: Array.from(hourly.variables(0)!.valuesArray()!),
          precipitation: Array.from(hourly.variables(1)!.valuesArray()!),
          precipitation_probability: Array.from(
            hourly.variables(2)!.valuesArray()!,
          ),
        }

        setWeatherData({
          current: processedCurrent,
          hourly: processedHourly,
        })
      } catch (error) {
        console.error('Failed to fetch weather data:', error)
      }
    }

    fetchWeather()
  }, [])

  return weatherData
}
