// components/WeatherWidget.tsx

import React, { useState } from 'react'
import { useFetchWeather } from '../hooks/useFetchWeather'

export default function WeatherWidget() {
  const weatherData = useFetchWeather()
  const [location, setLocation] = useState<string>('Auckland, NZ') // this is hardcoded in. could look at dynamic, but this is okay for now

  if (!weatherData) {
    return (
      <div className="mx-auto mt-6 max-w-md rounded-2xl bg-white/80 p-6 text-center shadow-md">
        <p className="text-gray-500">Loading weather...</p>
      </div>
    )
  }

  const { current, hourly } = weatherData

  return (
    <div className="mx-auto mt-6 max-w-md rounded-2xl bg-white/80 p-6 shadow-lg backdrop-blur-md">
      {/* --- Location --- */}
      <div className="mb-2 text-center text-lg font-medium text-gray-700">
        📍 {location}
      </div>
      {/* --- Current Weather --- */}
      <div className="mb-6 flex flex-col items-center text-center">
        <h2 className="mb-1 text-xl font-semibold text-gray-800">
          Current Weather
        </h2>
        <p className="text-5xl font-bold text-blue-600">
          {current.temperature_2m.toFixed(1)}°C
        </p>
        <p className="mt-1 text-gray-600">
          {current.is_day ? '☀️ Daytime' : '🌙 Nighttime'}
        </p>

        <div className="mt-4 flex justify-center gap-6 text-gray-700">
          <div className="text-center">
            <p className="font-semibold">💨 Wind</p>
            <p>{current.wind_speed_10m.toFixed(1)} km/h</p>
          </div>
          <div className="text-center">
            <p className="font-semibold">🌧️ Rain</p>
            <p>{current.precipitation.toFixed(1)} mm</p>
          </div>
        </div>
      </div>

      {/* --- Hourly Forecast --- */}
      <div>
        <h3 className="mb-3 text-center text-lg font-semibold text-gray-800">
          Hourly Forecast
        </h3>

        <div className="flex gap-3 overflow-x-auto pb-2">
          {hourly.time.slice(0, 8).map((t, i) => (
            <div
              key={i}
              className="min-w-[90px] flex-shrink-0 rounded-xl bg-blue-50 p-3 text-center shadow-sm transition hover:bg-blue-100"
            >
              <p className="text-sm text-gray-600">
                {t.toLocaleTimeString('en-NZ', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
              <p className="text-lg font-bold text-blue-700">
                {hourly.temperature_2m[i].toFixed(1)}°C
              </p>
              <p className="text-xs text-gray-500">
                💧{hourly.precipitation_probability[i]}%
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
